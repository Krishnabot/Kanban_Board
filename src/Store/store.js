import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './kanbanReducers';

const store = configureStore({
  reducer: kanbanReducer,
});

export default store;