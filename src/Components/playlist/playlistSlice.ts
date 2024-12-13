import spotifyRequests from '../../Spotify/APIreq';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SongsData, PlaylistState, DataForCreatingPlaylist } from '../../helperModules//appTypes';


const createPlaylist = createAsyncThunk(
    'playlist/sendSongs', 
    async (playListData: DataForCreatingPlaylist): Promise <void> =>{
        const { playlistName, playlistSongsData } = playListData;
        spotifyRequests.addMusicToPlaylist(playlistName, playlistSongsData);
    }
)


const initialState: PlaylistState = {
    playlistName: '',
    playlistSongsData: [],
    status: 'idle'
};


const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlaylistName(state, action: PayloadAction<string>){
            state.playlistName = action.payload;
        },
        setPlaylistSongsData(state, action: PayloadAction<SongsData>){
            state.playlistSongsData.push(action.payload);
        },
        removePlayListSongsData(state, action: PayloadAction<string>){
            state.playlistSongsData = state.playlistSongsData.filter(songData=>songData.id!==action.payload);
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
            })
    }
});

export { createPlaylist };
export const { setPlaylistName, setPlaylistSongsData, removePlayListSongsData } = playlistSlice.actions;
export default playlistSlice.reducer;