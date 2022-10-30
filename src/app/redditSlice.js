import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  comments: [],
  status: "idle",
  commentsStatus: "idle",
  commentsId: "",
  subreddit: "top",
  searchTerm: "",
};

export const fetchReddit = createAsyncThunk(
  "reddit/fetchPosts",
  async (subreddit = "home") => {
    const response = await fetch(`https://www.reddit.com/${subreddit}.json`);
    const json = await response.json();
    const posts = json.data.children.map((child) => child.data);
    return posts;
  }
);

export const fetchComments = createAsyncThunk(
  "reddit/fetchComments",
  async (permalink) => {
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
    const json = await response.json();
    const comments = json[1].data.children.map((child) => child.data);
    return comments;
  }
);

export const redditSlice = createSlice({
  name: "reddit",
  initialState,
  reducers: {
    setCommentsId: (state, action) => {
        state.commentsId = action.payload;
        },
    setSubreddit: (state, action) => {
      state.subreddit = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: {
    [fetchReddit.pending]: (state) => {
      state.status = "loading";
      state.searchTerm = "";
    },
    [fetchReddit.fulfilled]: (state, action) => {
      state.status = "idle";
      state.posts = action.payload;
    },
    [fetchReddit.rejected]: (state, action) => {
      state.status = "rejected";
      state.posts = [];
    },
    [fetchComments.pending]: (state) => {
      state.commentsStatus = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.commentsStatus = "idle";
      state.comments = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.commentsStatus = "rejected";
      state.comments = [];
    },
  },
});

export const selectRedditStatus = (state) => state.reddit.status;
export const selectRedditResults = (state) => state.reddit.posts;
export const selectComments = (state) => state.reddit.comments;
export const selectCommentsId = (state) => state.reddit.commentsId;
export const selectCommentsStatus = (state) => state.reddit.commentsStatus;
export const selectSubreddit = (state) => state.reddit.subreddit;
export const selectSearchTerm = (state) => state.reddit.searchTerm;

export default redditSlice.reducer;
export const { setCommentsId, setSubreddit, setSearchTerm } = redditSlice.actions;
