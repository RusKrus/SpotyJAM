import React from "react";
import Track from "./Track";
import songs from "./Example";

function TrackList({userInput}){
    return(
        userInput&&songs.map(song=>{
            return (song.name.includes(userInput)||song.artist.includes(userInput)||song.album.includes(userInput))?<Track artist={song.artist} name={song.name} album={song.album} id={song.id}/>:null})      
    )
}


export default TrackList;