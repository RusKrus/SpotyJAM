
import React,{useState} from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

import './App.css';


function App() {
  const [userInput, setUserInput] = useState("");
  const[playListName, setPlayListName] = useState("");
  const [playListTracks, setPlayListTracks] = useState([]);

  return (
    <div>
      
      <SearchBar userInput={userInput} setUserInput={setUserInput}/>
      <div>
        <SearchResults userInput={userInput} playListTracks={playListTracks} setPlayListTracks={setPlayListTracks}/>
        <Playlist playListName={playListName} setPlayListName={setPlayListName} playListTracks={playListTracks} setPlayListTracks={setPlayListTracks}/>
        
      </div>
    </div>

  );
}

export default App;
