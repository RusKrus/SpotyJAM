import React from "react";
import Track from "./Track";


function TrackList({finalUserInput, userInput, playListTracks, setPlayListTracks,musicArray}){
    userInput=userInput.toLowerCase();
    return(
        
        userInput&&musicArray.map(song=>{
            
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