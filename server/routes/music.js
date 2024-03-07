import express from 'express';
import { getHome, getTopArtists, getPlaylistInfo, getArtistInfo } from '../controllers/music.js';

const router = express.Router();

router.get('/home', getHome);
router.get('/topArtists', getTopArtists);
router.get('/getPlaylistInfo/:playlistId', getPlaylistInfo);
router.get('/getArtistInfo/:channelId', getArtistInfo);

export default router;