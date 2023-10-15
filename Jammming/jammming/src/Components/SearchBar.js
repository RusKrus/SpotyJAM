import React from "react";

function SearchBar({userInput, setUserInput, token}){
    const handleChange=(e)=>{
        setUserInput(e.target.value)
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        
        
        token.getMusic(userInput);
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