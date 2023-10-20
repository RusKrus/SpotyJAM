import React from "react";
import styles from "./Styling/SearchBar.module.css"

function SearchBar({userInput, setUserInput, token, setMusicArray}){
    let input ;
    const handleChange=(e)=>{
        input = e.target.value;
        setUserInput(input);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const answer = await token.getMusic(userInput);
        setMusicArray(answer);
    }

    return(
        <div className={styles.searchbar}>
            <form onSubmit={handleSubmit}>  
                <input  autoComplete = 'off'  className = {styles.input} type="text" id="search" onChange={handleChange} value={userInput} placeholder="Find your song..."/>
                <br/>
                <button type="submit" className={styles.button}>Search</button>
            </form>
            
        </div>
    )
}

export default SearchBar;