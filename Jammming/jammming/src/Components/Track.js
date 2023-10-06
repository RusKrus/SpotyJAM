import React from "react";

function Track(props){
    const songTitle = `${props.artist} - ${props.name}` 
    const album = props.album;
    return(
        <div>
            <p>{songTitle}</p>
            <p>{album}</p>
            <button>+</button>
        </div>
    )
}


export default Track;