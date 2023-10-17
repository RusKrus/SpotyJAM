import React from "react";

function SearchBar({userInput, setUserInput, token, setMusicArray}){
    const handleChange=(e)=>{
        setUserInput(e.target.value)
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const answer = await token.getMusic(userInput);
        setMusicArray(answer);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Input your song name</label>
                <br/>
                <input type="text" id="search" onChange={handleChange} value={userInput}/>
                <br/>
                <button type="submit">Search</button>
            </form>
            
        </div>
    )
}

export default SearchBar;