import express from 'express';
import { getHome, getTopArtists, getPlaylistInfo, getArtistInfo, getMusicInfo, getNextMusicInfo, getMusicLyrics } from '../controllers/music.js';

const router = express.Router();

router.get('/home', getHome);
router.get('/topArtists', getTopArtists);
router.get('/getPlaylistInfo/:playlistId', getPlaylistInfo);
router.get('/getArtistInfo/:channelId', getArtistInfo);
router.get('/getMusicInfo/:songId', getMusicInfo);
router.get('/getNextMusicInfo/:songId', getNextMusicInfo);
router.get('/getMusicLyrics/:songId', getMusicLyrics);

export default router;