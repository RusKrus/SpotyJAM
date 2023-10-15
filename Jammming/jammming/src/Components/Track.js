import React from "react";


function Track({artist, name, album, id, playListTracks, setPlayListTracks}){

    const songTitle = `${artist} - ${name}`;
    const handlePlusClick = (e) => {
        const handleMinusClick = () =>{
            setPlayListTracks(prev=>prev.filter(track=>track.props.id!==id));
        }
        const playListTrack = (
            <div key={id} id = {id}>
                <p>{songTitle}</p>
                <p>{album}</p>
                <button onClick={handleMinusClick}>-</button>
            </div>
        )
        const isAdded = playListTracks.some(track=>track.props.id===playListTrack.props.id);
        if(!isAdded){
            setPlayListTracks(prev=>[...prev, playListTrack]);
        }
        
    }  
    return(
        <div >
            <p>{songTitle}</p>
            <p>{album}</p>
            <button onClick={handlePlusClick}>+</button>
        </div>
    )
}


export default Track;