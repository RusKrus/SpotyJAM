import spotifyRequests from '../../Spotify/APIreq';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const getSongs = createAsyncThunk(
    'searchBar/getSongs',
    async (keyword) => {
        const request = await spotifyRequests.getMusic(keyword);
        return request;
    }
);




const initialState = {
    userInput: '',
    songs: [], 
    status: 'idle'
};

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState, 
    reducers: {
        setUserInput(state, action){
            state.userInput = action.payload;
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getSongs.pending, state => {
                state.status = 'loading';
            })
            .addCase(getSongs.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.songs = action.payload;
            })
            .addCase(getSongs.rejected, state => {
                state.status = 'rejected';
            })
    }
});


export { getSongs };
export const { setUserInput } = searchBarSlice.actions;
export default searchBarSlice.reducer;
