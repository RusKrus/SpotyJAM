        //getting auth url
const clientId = 'fb265b11d74f4e9393a68881a31d6c94';
const redirectUri = 'http://localhost:3000/';
const scope = 'playlist-modify-public';
let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + clientId;
url += '&scope=' + scope;
url += '&redirect_uri=' + redirectUri;

let accessToken;

const token={
    adress:url,
    getToken(){
        //dealing with token
        if(accessToken){
            return accessToken;
        }
        const params= new URLSearchParams(window.location.hash.substring(1))
        
        if(params.get("access_token")){
            accessToken=params.get("access_token");
            const expireTime=Number(params.get("expires_in"));
            setTimeout(()=>{accessToken=""}, expireTime*1000);
            window.history.pushState("token", null, "/")
            
            return accessToken;
        }
        else{
            window.location=this.adress;
        }
    },

    async getMusic(request){
        this.getToken();
        try{
            let spotifyURL = `https://api.spotify.com/v1/search?q=${request}&type=track`;
            console.log(spotifyURL)
            const response = await fetch(spotifyURL,{
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            );
            if(response.ok){
                const responseJson = await response.json();
                console.log(responseJson);
            }
            else{ 
                throw new Error("Request failed!");
            }
        }
        catch(error){
            console.log(error);
        }
    }


}

export default token;