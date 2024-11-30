import React from "react";
import styles from "./Styling/Track.module.css"

function Track({setSavedPlaylistTracksData, artist, name, album, id, playListTracks, setPlayListTracks}){

    const handlePlusClick = () => {
        
        const handleMinusClick = () =>{
            console.log(playListTracks)
            setPlayListTracks(prev=>prev.filter(track=>track.props.id!==id));
            setSavedPlaylistTracksData(prev=>prev.filter(track=>track.id!==id));
        }
        const playListTrack = ( 
            <div className={styles.container} key={id} id = {id} >
                <p className={styles.p1}><strong>{artist}</strong> - {name}</p>
                <p className={styles.p2}>{album}</p>
                <button className={styles.button} onClick={handleMinusClick} >-</button>
            </div>
        )
        console.log(playListTracks)
        const isAdded = playListTracks.some(track=>track.props.id===playListTrack.props.id);
        if(!isAdded){
            setPlayListTracks(prev=>[...prev, playListTrack]);
            setSavedPlaylistTracksData(prev=>[...prev, {artist, name, album, id}])
        }
        
    }  
    return(
        <div className={styles.container}>
            <p className={styles.p1}><strong>{artist}</strong> - {name}</p>
            <p className={styles.p2}>{album}</p>
            <button className={styles.button} onClick={handlePlusClick}>+</button>
        </div>
    )
}


export default Track;