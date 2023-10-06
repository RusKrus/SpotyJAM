import React, {useState} from "react";

function SearchBar(){
    const [userInput, setUserInput] = useState("");
    const handleChange =(e)=>{
        setUserInput(e.target.value);
    }

    return(
        <div>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <label htmlFor="search">Input your song name</label>
                <br/>
                <input type="text" value={userInput} id="search" />
                <br/>
                <button type="submit">Search</button>
            </form>
            
        </div>
    )
}

export default SearchBar;