import SpotifyAuth from './SpotifyAuth';
import { BasicRequestPayload, MusicResponse, UserData, CreatePlaylistRequestBody, PostRequestPayload, AddTracksRequestBody } from '../helperModules/appTypes';

class SpotifyAPI {
    static addMusicToPlaylist = async (name: string, tracksUris: string[]): Promise <string> => {
        if(tracksUris.length===0){
            throw new Error('Playlist can not be empty!');
        }
        const playlistId: string = await SpotifyAPI.createPlaylist(name);
        const token: string = await SpotifyAPI.token(); 
        const url: string = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const requestBody: AddTracksRequestBody = {
                uris: tracksUris
        };
        const payload: PostRequestPayload = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }
        try{
            const response: Response = await fetch(url, payload);
            if (!response.ok){
                console.error(`Response status: ${response.status}`);
                console.error(`Response text: ${response.statusText}`);
                throw new Error('Response is not ok, playtlist is not created');
            }
            const serverAnswer = await response.json();
            return serverAnswer;
            
        }
        catch(error){
            console.error(error);
            throw new Error('Playlist is not created!');
        }
    }

    static getMusic = async (keyword: string): Promise<MusicResponse['tracks']> => {
        const token: string = await SpotifyAPI.token();
        const url: string = `https://api.spotify.com/v1/search?q=${keyword}&type=track`;
        const payload: BasicRequestPayload = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try{
            const response: Response = await fetch(url, payload);
            if (!response.ok){
                console.error(`Response status: ${response.status}`);
                console.error(`Response text: ${response.statusText}`);
                if(keyword){
                    alert('Токен истек, но не обновился. Возможна проблема в функции refreshToken. refreshToken будет запущен после закрытия этого сообщения');
                    SpotifyAuth.refreshToken();
                }
                throw new Error('Response is not ok, music is not requested');
            }
            const dataFromServer: MusicResponse = await response.json();
            return dataFromServer.tracks;
        }
        catch(error){
            console.error(error);
            throw new Error('Invalid request!');
        }
    }

    private static token = async (): Promise<string> => {
        let token: string|null;
        if (!localStorage.getItem('access_token')){
            await SpotifyAuth.auntificate();
        }
        token = localStorage.getItem('access_token');
        if(!token){
            throw new Error ('Not possible to get or refresh token. Please contact administartor');
        }
        return token as string;
    }

    private static userId = async(): Promise<string> =>{
        const token: string = await SpotifyAPI.token();
        const url: string = `https://api.spotify.com/v1/me`;
        const payload: BasicRequestPayload = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try{
            const response: Response = await fetch(url, payload);
            if (!response.ok){
                console.error(`Response status: ${response.status}`);
                console.error(`Response text: ${response.statusText}`);
                throw new Error('User id response is not ok');
            }
            const userData: UserData = await response.json();
            return userData.id;
        }
        catch(error){
            console.error(error);
            throw new Error('Invalid user id request!');
        }
    }

    private static createPlaylist = async (name: string): Promise<string> =>{
        const userId: string = await SpotifyAPI.userId();
        const token: string = await SpotifyAPI.token();
        const url: string = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const requestBody: CreatePlaylistRequestBody = {
            name: name?`${name}`:'New playlist from Jamming',
            description: 'Playlist, created with Jamming! Join us for better music research!',
            public: false
        }
        const payload: PostRequestPayload = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }
        try{
            const response: Response = await fetch(url, payload);
            if (!response.ok){
                console.error(`Response status: ${response.status}`);
                console.error(`Response text: ${response.statusText}`);
                throw new Error('Response is not ok, playtlist is not created');
            }
            const serverAnswer = await response.json();
            const playlistId = serverAnswer.id;
            return playlistId;

        }
        catch(error){
            console.error(error);
            throw new Error('Playlist is not created!');

        }
    }

}


export default SpotifyAPI;


