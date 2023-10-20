
import React,{useState} from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

import token from "../Spotify/APIreq"
import styles from './Styling/App.module.css';


function App() {
  const [userInput, setUserInput] = useState("");
  const[playListName, setPlayListName] = useState("");
  const [playListTracks, setPlayListTracks] = useState([]);
  const [musicArray, setMusicArray] = useState([]);
  
  
  return (
    <div>
      <header className={styles.header}>
        <h1>Jammming</h1>
      </header>
      <main >  
          
          <SearchBar  userInput={userInput} setUserInput={setUserInput} token={token} setMusicArray={setMusicArray}/>
        <div className={styles.lists}>
          <SearchResults  userInput={userInput} playListTracks={playListTracks} setPlayListTracks={setPlayListTracks} musicArray={musicArray}/>
          <Playlist playListName={playListName} setPlayListName={setPlayListName} playListTracks={playListTracks} token={token} setPlayListTracks={setPlayListTracks}/>
        </div>
      </main>
    </div>

  );
}

export default App;
