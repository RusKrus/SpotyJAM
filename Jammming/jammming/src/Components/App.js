
import React,{useState, useEffect} from "react";
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
  const [savedPlaylistTracksData, setSavedPlaylistTracksData] = useState(window.sessionStorage.getItem("tracks")?JSON.parse(window.sessionStorage.getItem("tracks")):[])
    


  useEffect(()=>{
    window.sessionStorage.setItem("tracks", JSON.stringify(savedPlaylistTracksData));
    
  }, [savedPlaylistTracksData])
  

  
  return (
    <div>
      <header className={styles.header}>
        <h1>Jammming</h1>
      </header>
      <main >  
          <SearchBar  userInput={userInput} 
                      setUserInput={setUserInput} 
                      token={token} 
                      setMusicArray={setMusicArray}/>
        <div className={styles.lists}>
          <SearchResults  setSavedPlaylistTracksData={setSavedPlaylistTracksData} 
                          userInput={userInput} 
                          playListTracks={playListTracks} 
                          setPlayListTracks={setPlayListTracks} 
                          musicArray={musicArray}/>
          <Playlist   playListName={playListName} 
                      setPlayListName={setPlayListName} 
                      playListTracks={playListTracks} 
                      token={token} 
                      setPlayListTracks={setPlayListTracks}
                      savedPlaylistTracksData={savedPlaylistTracksData}
                      setSavedPlaylistTracksData={setSavedPlaylistTracksData}/>
        </div>
      </main>
    </div>

  );
}

export default App;
