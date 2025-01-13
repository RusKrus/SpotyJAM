import SpotifyAPI from '../../Spotify/SpotifyAPI';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResults, SearchBarState, MusicResponse, TrackDataFromServer, TrackDataForApp, ParsedTracksServerDataForApp } from '../../helperModules//appTypes';


const getSongs = createAsyncThunk(
    'searchBar/getSongs',
    async (keyword: string): Promise<ParsedTracksServerDataForApp> => {
        const serverAnswer: MusicResponse['tracks'] = await SpotifyAPI.getMusic(keyword);
        const songsData: SearchResults = serverAnswer.items.map((songData: TrackDataFromServer): TrackDataForApp => ({
            artistName: songData.artists[0].name,
            songName: songData.name,
            songImage: songData.album.images.at(-1)?.url??'',
            albumName: songData.album.name,
            spotifyUrl: songData.external_urls.spotify,
            uri: songData.uri
        }))
        return {
            songsData,
            totalFound: serverAnswer.total,
            next: serverAnswer.next,
            previous: serverAnswer.previous
        }
    }
);




const initialState: SearchBarState = {
    userInput: '',
    parsedServerData: {
        songsData: [],
        totalFound: 0,
        next: '',
        previous: ''
    }, 
    status: 'idle'
};

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState, 
    reducers: {
        setUserInput(state, action: PayloadAction<string>){
            state.userInput = action.payload;
        },
        restoreSavedSongs(state, action: PayloadAction<ParsedTracksServerDataForApp>){
            state.parsedServerData = action.payload;
        },
        clearAllSongs(state){
            state.parsedServerData = 
            {
                songsData: [],
                totalFound: 0,
                next: '',
                previous: ''
            }
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getSongs.pending, state => {
                state.status = 'loading';
            })
            .addCase(getSongs.fulfilled, (state, action: PayloadAction<ParsedTracksServerDataForApp>) => {
                state.status = 'loaded';
                state.parsedServerData = action.payload;
            })
            .addCase(getSongs.rejected, (state, action) => {
                state.status = 'rejected';
                console.log(action);
                console.log('gay')
            })
    }
});


export { getSongs };
export const { setUserInput, restoreSavedSongs, clearAllSongs } = searchBarSlice.actions;
export default searchBarSlice.reducer;
