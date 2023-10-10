import React from "react";
import TrackList from "./Tracklist";

function SearchResults({userInput, playListTracks, setPlayListTracks}){
    return(
        <div>
            <h2>Results</h2>
            <TrackList userInput={userInput} playListTracks={playListTracks} setPlayListTracks={setPlayListTracks}/>
        </div>
    )
}

export default SearchResults;