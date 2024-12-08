import React, {useEffect} from "react";
import styles from "./playlist.module.css";
import Track from '../track/Track'
import { useSelector, useDispatch } from "react-redux";
import { setPlaylistName, setPlaylistSongs, createPlaylist } from "./playlistSlice";


function PlayList({ savedPlaylistTracksData, setSavedPlaylistTracksData }){
    const dispatch = useDispatch();
    const playlistName = useSelector(state=>state.playlistState.playlistName);
    const playlistSongsData = useSelector(state=>state.playlistState.playlistSongsData)

    const handleChange=(e)=>{
        dispatch(setPlaylistName(e.target.value));
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();
        dispatch(createPlaylist({playlistName, playlistSongsData}));
        setPlaylistName("");
    };

    //Часть логики session storage. Пока что не работает, потому что приходится посылать в redux хранилище элементы React 
    /* 
    useEffect(()=>{
        if (savedPlaylistTracksData){
            const savedPlayList = [];
            for (const TrackData of savedPlaylistTracksData){
                const {artist, name, album, id} = TrackData;
                const handleMinusClick = () =>{
                    dispatch(setPlaylistSongs(prev=>prev.filter(track=>track.props.id!==id)));
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
            setPlaylistSongs(savedPlayList);     
        }// eslint-disable-next-line 
    }, [])
    */



    return(
        <div className={styles.box}>
        <form id="name" onSubmit={handleSubmit}>
                <input className={styles.input} autoComplete="off" onChange={handleChange} type="text" name="Playlist's name"  placeholder="Playlist's name..." value={playlistName}/>
            </form>
            <hr></hr>
            {playlistSongsData.map(songData => <Track songData = {songData} key={songData.id} />)}
            <button form="name" type="submit" className={styles.button}>Submit to Spotify</button>
        </div>

    )
}

export default PlayList;