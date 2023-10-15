
import React,{useState} from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

import token from "../Spotify/APIreq"
import './App.css';


function App() {
  const [userInput, setUserInput] = useState("");
  const[playListName, setPlayListName] = useState("");
  const [playListTracks, setPlayListTracks] = useState([]);

  return (
    <div>
      <span>{userInput}</span>
      <SearchBar userInput={userInput} setUserInput={setUserInput} token={token}/>
      <div>
        <SearchResults userInput={userInput} playListTracks={playListTracks} setPlayListTracks={setPlayListTracks}/>
        <Playlist playListName={playListName} setPlayListName={setPlayListName} playListTracks={playListTracks} token={token}/>
        
      </div>
    </div>

  );
}

export default App;
