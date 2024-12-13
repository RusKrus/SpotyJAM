import spotifyRequests from '../../Spotify/APIreq';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResults, SearchBarState } from '../../helperModules//appTypes';


const getSongs = createAsyncThunk(
    'searchBar/getSongs',
    async (keyword: string): Promise<SearchResults> => {
        const request: SearchResults = await spotifyRequests.getMusic(keyword);
        return request;
    }
);




const initialState: SearchBarState = {
    userInput: '',
    songs: [], 
    status: 'idle'
};

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState, 
    reducers: {
        setUserInput(state, action: PayloadAction<string>){
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
