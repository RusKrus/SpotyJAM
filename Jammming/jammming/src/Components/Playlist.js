import React from "react";

function PlayList({playListName, setPlayListName, playListTracks, setPlayListTracks}){

    const handleSubmit=(e)=>{
        e.preventDefault(); 
        setPlayListName(e.target.elements[`Playlist's name`].value);
    }

    return(
        <div>
        
        <form id="name" onSubmit={handleSubmit}>
                <input type="text" name="Playlist's name"  placeholder="Type name of your playlist here..."/>
            </form>
            <div>
                {playListTracks}
            </div>
            <button form="name" type="submit">Submit to Spotify</button>
        </div>

    )
}

export default PlayList;