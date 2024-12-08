import React from "react";
import styles from "./track.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylistSongsData } from "../playlist/playlistSlice";


function Track({ songData, setSavedPlaylistTracksData }){
    const dispatch = useDispatch();
    const playlistSongsData = useSelector(state=>state.playlistState.playlistSongsData)
    const { artist, name, album, id } = songData;
    
    /*
    const handleMinusClick = () =>{
        setPlayListTracks(prev=>prev.filter(track=>track.props.id!==id));
        setSavedPlaylistTracksData(prev=>prev.filter(track=>track.id!==id));
    }
        */

    const handlePlusClick = () => {
        /*const playListTrack = ( 
            <div className={styles.container} key={id} id = {id} >
                <p className={styles.p1}><strong>{artist}</strong> - {name}</p>
                <p className={styles.p2}>{album}</p>
                <button className={styles.button} onClick={handleMinusClick} >-</button>
            </div>
        )*/
        const isAdded = playlistSongsData.some(songData=>songData.id===id);
        if(!isAdded){
            dispatch(setPlaylistSongsData(songData));
            setSavedPlaylistTracksData(prev=>[...prev, {artist, name, album, id}])
        } 
    }  
    console.log(playlistSongsData)

    return(
        <div className={styles.container}>
            <p className={styles.p1}><strong>{artist}</strong> - {name}</p>
            <p className={styles.p2}>{album}</p>
            <button className={styles.button} onClick={handlePlusClick}>+</button>
        </div>
    )
}


export default Track;