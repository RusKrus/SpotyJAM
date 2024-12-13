//SLICES TYPES
//general types
export type SongsData = {
    artist: string, 
    name: string, 
    album: string, 
    id: string
}
//playlist slice
type PlaylistSongsData = SongsData[];

export type PlaylistState = {
    playlistName: string,
    playlistSongsData: PlaylistSongsData,
    status: 'idle' | 'loading' | 'loaded' | 'rejected'
} 

export type DataForCreatingPlaylist = {
    playlistName: string, 
    playlistSongsData: PlaylistSongsData
}

//searchBar slice
export type SearchResults = SongsData[];

export type SearchBarState = {
    userInput: string,
    songs: SearchResults,
    status: 'idle' | 'loading' | 'loaded' | 'rejected'
} 

//COMPONENTS PROPS TYPES
export type TrackProps = {
    songData: SongsData, 
    containerType: 'Playlist' | 'Search results'
}