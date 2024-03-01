import express from 'express';
import { getHome, getTopArtists, getPlaylistInfo } from '../controllers/music.js';

const router = express.Router();

router.get('/home', getHome);
router.get('/topArtists', getTopArtists);
router.get('/:playlistId', getPlaylistInfo);

export default router;