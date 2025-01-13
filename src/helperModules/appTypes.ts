//SLICES TYPES
//general types
export type TrackDataForApp = {
    artistName: string, 
    songName: string, 
    songImage: string,
    albumName: string, 
    spotifyUrl: string,
    uri: string
}
//playlist slice

export type PlaylistState = {
    playlistName: string,
    playlistSongsData: TrackDataForApp[],
    status: 'idle' | 'loading' | 'loaded' | 'rejected'
} 

export type DataForCreatingPlaylist = {
    playlistName: string, 
    playlistUris: string[]
}

//searchBar slice
export type SearchResults = TrackDataForApp[];

export type ParsedTracksServerDataForApp = {
    songsData: SearchResults,
    totalFound: number,
    next: string,
    previous: string | null
}

export type SearchBarState = {
    userInput: string,
    parsedServerData: ParsedTracksServerDataForApp,
    status: 'idle' | 'loading' | 'loaded' | 'rejected'
} 

//COMPONENTS PROPS TYPES
//track component
export type TrackProps = {
    songData: TrackDataForApp, 
    containerType: 'Playlist' | 'Search results'
}

//searchResults component
export type StateForSearchResults = { 
    songsList: SearchResults,
    parsedServerData: ParsedTracksServerDataForApp
}

export type ModalWindowProps = {
    isModalOpened: boolean,
    text: string,
    closerFunction: () => void
}
//SERVER REQUEST TYPES
//request general types
export type BasicRequestPayload = {
    headers: {
        Authorization: string;
    }
};

export type PostRequestPayload = {
    method: 'POST',
    headers: {
        Authorization?: string;
        'Content-Type': string
    }
    body: string
}

export type GetAccessKeyURLParams = {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    code_challenge_method: string;
    code_challenge: string;
    scope: string;
    state: string;
}

export type GetTokenURLParams = {
    client_id: string,
    grant_type: string,
    code: string,
    redirect_uri: string,
    code_verifier: string
}

export type RefreshTokenURLParams = {
    grant_type: string,
    refresh_token: string,
    client_id: string
}

export type ServerResponseWithToken = {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    token_type: string,
    scope: string
}

//request song types
export type TrackDataFromServer = {
    album: {
        images: {
            height: number,
            width: number,
            url: string
        }[],
        name: string,
        [key: string]: any
    },
    artists: {
        name: string,
        [key: string]: any
    }[],
    avaliable_markets: string[],
    duration_ms: number, 
    exterb_urls: {
        spotify: string
    },
    name: string,
    uri: string,
    [key: string]: any
    
}

export type MusicResponse = {
    tracks: {
        items: TrackDataFromServer[],
        next: string, 
        previous: string | null,
        total: 117,
        [key: string]: any
    }
};

//user id request types
export type UserData = {
    id: string,
    [key: string]: any
}

//creating playlist request types
export type CreatePlaylistRequestBody = {
    name: string,
    public: boolean,
    description: string
}

//adding songs to playlist request types
export type AddTracksRequestBody = {
    uris: string[]
}
