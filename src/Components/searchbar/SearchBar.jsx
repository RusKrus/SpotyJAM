import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInput, getSongs } from "./searchBarSlice";
import styles from "./searchBar.module.css";

function SearchBar(){
    const dispatch = useDispatch();
    const userInput = useSelector(state=>state.searchBarState.userInput);
/*
    const [input, setInput] = useState(window.sessionStorage.getItem("input"));
    useEffect(()=>{
        if (!input){
            setInput("")
        }
    }, [input]);

    useEffect(()=>{
        window.sessionStorage.setItem("input", input);
    }, [input]);
    */

    const handleChange = (e) => {
        dispatch(setUserInput(e.target.value))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch(getSongs(userInput));
    }

    return(
        <div className={styles.searchbar}>
            <form onSubmit={handleSubmit}>  
                <input  autoComplete='off' className={styles.input} type="text" id="search" onChange={handleChange} value={userInput} placeholder="Find your song..."/>
                <br/>
                <button type="submit" className={styles.button}>Search</button>
            </form>
            
        </div>
    )
}

export default SearchBar;