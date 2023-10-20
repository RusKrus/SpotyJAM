import React from "react";
import styles from "./Styling/Track.module.css"

function Track({artist, name, album, id, playListTracks, setPlayListTracks}){

    const handlePlusClick = () => {
        const handleMinusClick = () =>{
            setPlayListTracks(prev=>prev.filter(track=>track.props.id!==id));
        }
        const playListTrack = (
            <div className={styles.container} key={id} id = {id} >
                <p className={styles.p1}><strong>{artist}</strong> - {name}</p>
                <p className={styles.p2}>{album}</p>
                <button className={styles.button} onClick={handleMinusClick} >-</button>
            </div>
        )
        const isAdded = playListTracks.some(track=>track.props.id===playListTrack.props.id);
        if(!isAdded){
            setPlayListTracks(prev=>[...prev, playListTrack]);
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