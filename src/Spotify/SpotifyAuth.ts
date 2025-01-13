import { GetAccessKeyURLParams, ServerResponseWithToken, GetTokenURLParams, PostRequestPayload, RefreshTokenURLParams  } from '../helperModules/appTypes';
import { toast } from 'react-toastify';

class SpotifyAuth {
    private static clientId: string ='fb265b11d74f4e9393a68881a31d6c94';
    private static redirectUri: string  = 'https://spotyjam.netlify.app/redirect';
    private static scope: string  = 'playlist-modify-public user-read-private user-read-email playlist-modify-private playlist-read-collaborative';
    private static state: string  = `userNumber${Math.floor(Math.random()*1000000)}`;
    private static urlForToken: URL = new URL('https://accounts.spotify.com/api/token');

    static setTimerToRefreshToken = (): void  => {
        const expires_at: string | null = window.localStorage.getItem('expires_at');
        const refresh_token: string | null = window.localStorage.getItem('refresh_token');
        if(refresh_token&&expires_at){
            const timeToRefresh = Number(expires_at) - Date.now();
            const refreshTokenHandler = async () => {
                try{
                    await SpotifyAuth.refreshToken();
                }
                catch(error){
                    if(error instanceof Error){
                        toast.error(error.message);
                    }
                    else{
                        toast.error('Unknow error');
                    }
                }
            }
            setTimeout(refreshTokenHandler, timeToRefresh);
        }
    }   

    static refreshToken = async (): Promise<void> => {
        const refreshToken: string | null = window.localStorage.getItem('refresh_token');
        if(!refreshToken){
            throw new Error('Refresh token not found during refreshing token')
        }
        const url: URL = SpotifyAuth.urlForToken;
        const params: RefreshTokenURLParams  = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: SpotifyAuth.clientId
        };
        const payload: PostRequestPayload = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(params).toString()
        }
        try{
            const dataFromServer: Response = await fetch(url, payload);
            if (!dataFromServer.ok){
                console.error(`Response status: ${dataFromServer.status}`);
                console.error(`Response text: ${dataFromServer.statusText}`);
                window.localStorage.clear();
                console.log('Old token data is removed, try to auth again')
                throw new Error('Response is not ok when token was refreshed');
            }
            const response: ServerResponseWithToken = await dataFromServer.json();
            SpotifyAuth.saveTokenFromServer(response);
            SpotifyAuth.setTimerToRefreshToken();
        }
        catch(error){
            console.error(error);
            throw new Error('Unable to refresh token');
        }
        
        
    }
    
    static getToken = async (): Promise<void> => {
        const code: string = SpotifyAuth.checkStateAndGetKey();
        const codeVerifier: string | null = window.localStorage.getItem('codeVerifier');
        if(!codeVerifier){
            throw new Error('Code verifier not found during getToken request');
        }
        const url: URL = SpotifyAuth.urlForToken;
        const params: GetTokenURLParams = {
            client_id: SpotifyAuth.clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: SpotifyAuth.redirectUri,
            code_verifier: codeVerifier
        };
        const payload: PostRequestPayload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(params).toString()
        }
        try{
            const dataFromServer: Response = await fetch(url, payload);
            if (!dataFromServer.ok){
                console.error(`Response status: ${dataFromServer.status}`);
                console.error(`Response text: ${dataFromServer.statusText}`);
                throw new Error('Response is not ok');
            }
            const response: ServerResponseWithToken = await dataFromServer.json();
            SpotifyAuth.saveTokenFromServer(response);
        }
        catch(error){
            console.error(error);
            throw new Error('Unable to get token');
        }
    }

    private static saveTokenFromServer = async (serverResponse: ServerResponseWithToken): Promise<void> => {
        const expires_at: number = Date.now() + (serverResponse.expires_in - 60) * 1000;
        Object.keys(window.localStorage).map(key => window.localStorage.removeItem(key));
        // I did not find any possibly way to make typecheck of keys easier
        (Object.keys(serverResponse) as (keyof ServerResponseWithToken)[]).map(key => key!=="expires_in"?window.localStorage.setItem(key, serverResponse[key]):null);
        window.localStorage.setItem('expires_at', expires_at.toString());
        if(window.location.pathname!=='/'){
            window.location.replace('/');
        }
    }

    private static checkStateAndGetKey = (): string => {
        const params: URLSearchParams = new URLSearchParams(window.location.search);
        const state: string | null = params.get('state');
        const savedState: string | null = localStorage.getItem('state');
        if(!savedState){
            throw new Error('Initial state is not saved');
        }
        if (state === savedState){
            const code: string | null = params.get('code'); 
            if(!code){
                throw new Error('Code was not provided in URL');
            };
            return code;
        }
        else{
            throw new Error('Invalid state');
        }
    }

    static auntificate = async (): Promise<void> => {
        window.localStorage.setItem('state', SpotifyAuth.state);
        SpotifyAuth.codeVerifierGenerator();
        await SpotifyAuth.codeChallengeGenerator();
        const url: string = SpotifyAuth.createURLForAcessKey();
        window.location.href = url;
    }

    private static createURLForAcessKey = (): string => {
        const authUrl: URL = new URL("https://accounts.spotify.com/authorize");
        const codeChallenge: string | null = window.localStorage.getItem('codeChallenge');
        if(!codeChallenge){
            throw new Error('Code challenge is not generated');
        }
        const params: GetAccessKeyURLParams = {
            response_type: 'code',
            client_id: SpotifyAuth.clientId,
            redirect_uri: SpotifyAuth.redirectUri,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            scope: SpotifyAuth.scope,
            state: SpotifyAuth.state
        }
        authUrl.search = new URLSearchParams(params).toString();
        return authUrl.toString();
    }

    private static codeChallengeGenerator = async (): Promise<void> => {
        const codeVerifier: string | null = window.localStorage.getItem('codeVerifier');
        let hashed: ArrayBuffer;
        if(codeVerifier){
            hashed = await SpotifyAuth.sha256(codeVerifier);
        }
        else{
            throw new Error('Code verifier is not generated');
        }
        const codeChallenge: string = btoa(String.fromCharCode(...new Uint8Array(hashed)))
          .replace(/=/g, '')
          .replace(/\+/g, '-')
          .replace(/\//g, '_');
        window.localStorage.setItem('codeChallenge', codeChallenge);
    }

    
    private static sha256 = async (plain: string): Promise<ArrayBuffer> => {
        const encoder: TextEncoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }

    private static codeVerifierGenerator = (): void => {
        const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values: Uint8Array = crypto.getRandomValues(new Uint8Array(128));
        const codeVerifier: string = values.reduce((acc: string, x: number) => acc + possible[x % possible.length], "");
        window.localStorage.setItem('codeVerifier', codeVerifier);
    }
}

export default SpotifyAuth;