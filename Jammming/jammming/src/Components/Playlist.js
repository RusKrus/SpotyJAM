import React from "react";

function PlayList({playListName, setPlayListName, playListTracks, token}){

    const handleChange=(e)=>{
        setPlayListName(e.target.value);
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        await token.addMusicToPlaylist(playListName, playListTracks);
        setPlayListName([]);
    }

    return(
        <div>
        
        <form id="name" onSubmit={handleSubmit}>
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