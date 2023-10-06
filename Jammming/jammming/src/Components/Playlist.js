import React from "react";

function PlayList(){
    return(
        <div>
            <form id="name" onSubmit={(e)=>{e.preventDefault()}}>
                <input type="text" name="Playlist's name"  placeholder="Type name of your playlist here..."/>
            </form>
            <div>
                <span>Something</span>
            </div>
            <button form="name" >Submit to Spotify</button>
        </div>

    )
}

export default PlayList;