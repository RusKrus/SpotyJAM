import React, {useState} from "react";
import styles from "./Styling/SearchBar.module.css"

function SearchBar({userInput, setUserInput, token, setMusicArray}){
    const [input, setInput] = useState(userInput);

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setUserInput(input);
        const answer = await token.getMusic(input);
        setMusicArray(answer);
    }

    return(
        <div className={styles.searchbar}>
            <form onSubmit={handleSubmit}>  
                <input  autoComplete = 'off'  className = {styles.input} type="text" id="search" onChange={handleChange} value={input} placeholder="Find your song..."/>
                <br/>
                <button type="submit" className={styles.button}>Search</button>
            </form>
            
        </div>
    )
}

export default SearchBar;