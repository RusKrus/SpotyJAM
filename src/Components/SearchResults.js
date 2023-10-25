import React from "react";
import TrackList from "./Tracklist";
import styles from "./Styling/SearchResults.module.css"

function SearchResults({setSavedPlaylistTracksData, userInput, playListTracks, setPlayListTracks, musicArray}){
    return(
        <div className={styles.box}>
            
            <h2 className={styles.h2}>Results</h2>
            <hr></hr>
            <TrackList  setSavedPlaylistTracksData={setSavedPlaylistTracksData} 
                        userInput={userInput} 
                        playListTracks={playListTracks} 
                        setPlayListTracks={setPlayListTracks} 
                        musicArray={musicArray}/>
        </div>
    )
}

export default SearchResults;