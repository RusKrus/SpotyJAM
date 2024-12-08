import React from "react";
import Track from "../track/Track";
import styles from "./searchResults.module.css";
import { useSelector } from 'react-redux';

function SearchResults({setSavedPlaylistTracksData}){
    const userInput = useSelector(state=>state.searchBarState.userInput);
    const songsList = useSelector(state=>state.searchBarState.songs);
    const lowerCaseUserInput = userInput.toLowerCase();
    return(
        <div className={styles.box}>
            <h2 className={styles.h2}>Results</h2>
            <hr></hr>
            {lowerCaseUserInput&&songsList.map(songData=>{
            const { artist, name, album, id } = songData;
            return (
                name.toLowerCase().includes(lowerCaseUserInput)||artist.toLowerCase().includes(lowerCaseUserInput)||album.toLowerCase().includes(lowerCaseUserInput))?
                <Track 
                    songData = {songData}
                    key={id} 
                    setSavedPlaylistTracksData={setSavedPlaylistTracksData} />
                :null})}  
        </div>
    )
}

export default SearchResults;