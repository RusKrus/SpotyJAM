import spotifyRequests from '../../Spotify/APIreq';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



const createPlaylist = createAsyncThunk(
    'playlist/sendSongs', 
    async (playListData) =>{
        const { playlistName, playlistSongsData } = playListData;
        spotifyRequests.addMusicToPlaylist(playlistName, playlistSongsData);
    }
)


const initialState = {
    playlistName: '',
    playlistSongsData: [],
    status: 'idle'
};


const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlaylistName(state, action){
            state.playlistName = action.payload;
        },
        setPlaylistSongsData(state, action){
            state.playlistSongsData.push(action.payload);
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(createPlaylist.pending, state => {
                state.status = 'loading';
            })
            .addCase(createPlaylist.fulfilled, state => {
                state.status = 'loaded';
            })
            .addCase(createPlaylist.rejected, state => {
                state.status = 'rejected';
                console.log("gay")
            })
    }
});

export { createPlaylist };
export const { setPlaylistName, setPlaylistSongsData } = playlistSlice.actions;
export default playlistSlice.reducer;