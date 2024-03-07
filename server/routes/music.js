import express from 'express';
import { getHome, getTopArtists, getPlaylistInfo, getArtistInfo, getMusicInfo } from '../controllers/music.js';

const router = express.Router();

router.get('/home', getHome);
router.get('/topArtists', getTopArtists);
router.get('/getPlaylistInfo/:playlistId', getPlaylistInfo);
router.get('/getArtistInfo/:channelId', getArtistInfo);
router.get('/getMusicInfo/:songId', getMusicInfo);

export default router;