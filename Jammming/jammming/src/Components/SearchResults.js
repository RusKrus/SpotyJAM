import React from "react";
import TrackList from "./Tracklist";

function SearchResults({userInput, playListTracks, setPlayListTracks, musicArray}){
    return(
        <div>
            <h2>Results</h2>
            <TrackList userInput={userInput} playListTracks={playListTracks} setPlayListTracks={setPlayListTracks} musicArray={musicArray}/>
        </div>
    )
}

export default SearchResults;