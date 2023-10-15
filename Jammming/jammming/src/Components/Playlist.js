import React from "react";

function PlayList({playListName, setPlayListName, playListTracks, token}){

    const handleChange=(e)=>{
        setPlayListName(e.target.value);
    }

    return(
        <div>
        
        <form id="name" onSubmit={e=>{e.preventDefault()}}>
                <input onChange={handleChange} type="text" name="Playlist's name"  placeholder="Type name of your playlist here..." value={playListName}/>
            </form>
            <div>
                {playListTracks}
            </div>
            <button form="name" type="submit">Submit to Spotify</button>
        </div>

    )
}

export default PlayList;