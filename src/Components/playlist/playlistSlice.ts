import SpotifyAPI from '../../Spotify/SpotifyAPI';
import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackDataForApp, PlaylistState, DataForCreatingPlaylist } from '../../helperModules//appTypes';


const createPlaylist = createAsyncThunk(
    'playlist/sendSongs', 
    async (playListData: DataForCreatingPlaylist): Promise <void> =>{
        const { playlistName, playlistUris } = playListData;
        await SpotifyAPI.addMusicToPlaylist(playlistName, playlistUris);
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
        setPlaylistSongsData(state, action: PayloadAction<TrackDataForApp>){
            state.playlistSongsData.push(action.payload);
        },
        removePlayListSongsData(state, action: PayloadAction<string>){
            state.playlistSongsData = state.playlistSongsData.filter(songData=>songData.uri!==action.payload);
        },
        clearPlaylistSongsData(state){
            state.playlistSongsData = [];
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(createPlaylist.pending, state => {
                state.status = 'loading';
            })
            .addCase(createPlaylist.fulfilled, state => {
                state.status = 'loaded';
                toast.success('Playlist is created!')
            })
            .addCase(createPlaylist.rejected, (state, action) => {
                state.status = 'rejected';
                toast.error(action.error.message??'Error occured, try again');
            })
    }
});

export { createPlaylist };
export const { setPlaylistName, setPlaylistSongsData, removePlayListSongsData, clearPlaylistSongsData } = playlistSlice.actions;
export default playlistSlice.reducer;