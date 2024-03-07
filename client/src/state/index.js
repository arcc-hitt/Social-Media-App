import { createSlice } from "@reduxjs/toolkit";

const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState = {
  mode: isDarkModePreferred ? "dark" : "light",
  user: null,
  token: null,
  posts: [],
  stories: [],
  tracks: [],
  playlistId: null,
  channelId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setStories: (state, action) => {
      state.stories = action.payload.stories;
    },
    setStory: (state, action) => {
      const updatedStory = state.stories.map((story) => {
        if (story._id === action.payload.story._id) return action.payload.story;
        return story;
      });
      state.stories = updatedStory;
    },
    setTracks: (state, action) => {
      state.tracks = action.payload.tracks;
    },
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    setChannelId: (state, action) => {
      state.channelId = action.payload;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setStories,
  setStory,
  setTracks,
  setPlaylistId,
  setChannelId,
} = authSlice.actions;

export default authSlice.reducer;
