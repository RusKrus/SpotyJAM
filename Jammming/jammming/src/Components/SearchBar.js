import React from "react";

function SearchBar({userInput, setUserInput}){
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        setUserInput(e.target.elements.search.value);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Input your song name</label>
                <br/>
                <input type="text" id="search" />
                <br/>
                <button type="submit">Search</button>
            </form>
            
        </div>
    )
}

export default SearchBar;