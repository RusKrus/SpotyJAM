import React from "react";
import styles from "./Styling/Playlist.module.css"

function PlayList({playListName, setPlayListName, playListTracks, token, setPlayListTracks}){

    const handleChange=(e)=>{
        setPlayListName(e.target.value);
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        await token.addMusicToPlaylist(playListName, playListTracks);
        if(playListName!==""){
            setPlayListTracks(prev=>[]);
        }
        setPlayListName("");
       
    }

    return(
        <div className={styles.box}>
        <form id="name" onSubmit={handleSubmit}>
                <input className={styles.input} autoComplete="off" onChange={handleChange} type="text" name="Playlist's name"  placeholder="Playlist's name..." value={playListName}/>
            </form>
            <hr></hr>
                {playListTracks}
            <button form="name" type="submit" className={styles.button}>Submit to Spotify</button>
        </div>

    )
}

export default PlayList;