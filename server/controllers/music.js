import axios from 'axios';

export const getHome = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://youtube-music-api3.p.rapidapi.com/home',
        params: { gl: 'GB' },
        headers: {
            'X-RapidAPI-Key': '9e0941911amsh5537bd8bff0a4f6p1facc2jsn61fb54f8b474',
            'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch music data' });
    }
};

export const getPlaylistInfo = async (req, res) => {
    const { playlistId } = req.params;
    const options = {
        method: 'GET',
        url: 'https://youtube-music-api3.p.rapidapi.com/getAlbum',
        params: {
            id: playlistId
        },
        headers: {
            'X-RapidAPI-Key': '9e0941911amsh5537bd8bff0a4f6p1facc2jsn61fb54f8b474',
            'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch music data' });
    }
};

export const getArtistInfo = async (req, res) => {
    const { channelId } = req.params;
    const options = {
        method: 'GET',
        url: 'https://youtube-music-api3.p.rapidapi.com/getArtists',
        params: {
            id: channelId
        },
        headers: {
            'X-RapidAPI-Key': '9e0941911amsh5537bd8bff0a4f6p1facc2jsn61fb54f8b474',
            'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch music data' });
    }
};

export const getMusicInfo = async (req, res) => {
    const { songId } = req.params;
    const options = {
        method: 'GET',
        url: 'https://youtube-music-api3.p.rapidapi.com/music/info',
        params: {
            id: songId
        },
        headers: {
            'X-RapidAPI-Key': '9e0941911amsh5537bd8bff0a4f6p1facc2jsn61fb54f8b474',
            'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch music data' });
    }
};
export const getTopArtists = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://musicdata-api.p.rapidapi.com/spotify/topartist',
        headers: {
            'X-RapidAPI-Key': '9e0941911amsh5537bd8bff0a4f6p1facc2jsn61fb54f8b474',
            'X-RapidAPI-Host': 'musicdata-api.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch music data' });
    }
};