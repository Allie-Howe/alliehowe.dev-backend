import express from 'express';
import { configDotenv } from 'dotenv';

const app = express();
const port = process.env.PORT || 4321;

configDotenv();
const lastFmUser = 'HoweIsAllie';

app.get('/', async (_, res) => {
  const lfmRes = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastFmUser}&api_key=${process.env.LASTFM_CLIENT}&format=json`)
  if (!lfmRes.ok) throw new Error(lfmRes.statusText);

  const data = JSON.parse(await lfmRes.text());

  const rawMostRecentTrack = data.recenttracks.track[0];

  const mostRecentTrack = mapRawTrackToTrack(rawMostRecentTrack)

  res.json(mostRecentTrack);
});

app.listen(port, () => {
  return console.log(`Express is listening on port ${port}`);
});

const mapRawTrackToTrack = (rawTrack: any) => {
  const rawDate = rawTrack.date?.['#text']
  return {
    name: rawTrack.name,
    artist: rawTrack.artist['#text'],
    album: rawTrack.album['#text'],
    image: rawTrack.image[3]['#text'],
    url: rawTrack.url,
    date: rawDate ? new Date(rawDate) : undefined,
    nowPlaying: !!rawTrack['@attr']?.nowplaying,
  }
}
