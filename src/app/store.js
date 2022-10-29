import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';

export const store = configureStore({
  reducer: {
    reddit: redditReducer,
  },
});
