import React, {useEffect} from "react";
import styles from "./Styling/Playlist.module.css"
import stylesTr from "./Styling/Track.module.css"

function PlayList({playListName, setPlayListName, playListTracks, token, setPlayListTracks, savedPlaylistTracksData, setSavedPlaylistTracksData}){
    
    const handleChange=(e)=>{
        setPlayListName(e.target.value);
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        await token.addMusicToPlaylist(playListName, playListTracks);
        if(playListName!==""){
            setPlayListTracks([]);
        }
        setPlayListName("");
    }
    
    useEffect(()=>{
        if (savedPlaylistTracksData){
            const savedPlayList = [];
            for (const TrackData of savedPlaylistTracksData){
                const {artist, name, album, id} = TrackData;
                const handleMinusClick = () =>{
                    setPlayListTracks(prev=>prev.filter(track=>track.props.id!==id));
                    setSavedPlaylistTracksData(prev=>prev.filter(track=>track.id!==id));
                }
                const playListTrack = ( 
                    <div className={stylesTr.container} key={id} id = {id} >
                        <p className={stylesTr.p1}><strong>{artist}</strong> - {name}</p>
                        <p className={stylesTr.p2}>{album}</p>
                        <button className={stylesTr.button} onClick={handleMinusClick} >-</button>
                    </div>
                )
                savedPlayList.push(playListTrack)
            }
            setPlayListTracks(savedPlayList);     
        }// eslint-disable-next-line 
    }, [])
    


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