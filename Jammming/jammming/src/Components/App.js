
import React,{useState} from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

import './App.css';


function App() {
  const [userInput, setUserInput] = useState("");
  return (
    <div>
      <SearchBar userInput={userInput} setUserInput={setUserInput}/>
      <div>
        <SearchResults userInput={userInput}/>
        <Playlist/>
        <span></span>
      </div>
    </div>

  );
}

export default App;
