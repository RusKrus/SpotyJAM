import React from "react";
import TrackList from "./Tracklist";

function SearchResults({userInput}){
    return(
        <div>
            <h2>Results</h2>
            <TrackList userInput={userInput}/>
        </div>
    )
}

export default SearchResults;