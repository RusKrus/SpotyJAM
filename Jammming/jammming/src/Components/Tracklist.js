import React from "react";
import Track from "./Track";
import songs from "./Example";

function TrackList({userInput, playListTracks, setPlayListTracks}){
    userInput=userInput.toLowerCase();
    return(
        
        userInput&&songs.map(song=>{
            return (
                song.name.toLowerCase().includes(userInput)||song.artist.toLowerCase().includes(userInput)||song.album.toLowerCase().includes(userInput))?
                <Track 
                artist={song.artist} 
                name={song.name} 
                album={song.album} 
                key={song.id} 
                id={song.id} 
                playListTracks={playListTracks} 
                setPlayListTracks={setPlayListTracks}/>
                :null})      
    )
}


export default TrackList;