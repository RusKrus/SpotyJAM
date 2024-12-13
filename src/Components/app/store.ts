import { configureStore } from '@reduxjs/toolkit';
import searchBarReducer from '../searchbar/searchBarSlice';
import playlistSliceReducer from '../playlist/playlistSlice';

const store = configureStore({
    reducer: {
        searchBarState: searchBarReducer,
        playlistState: playlistSliceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


