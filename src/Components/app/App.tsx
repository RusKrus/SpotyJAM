import React from "react";
import SearchBar from "../searchbar/SearchBar";
import SearchResults from "../searchresults/SearchResults";
import Playlist from "../playlist/Playlist";
import styles from './app.module.css';
import SpotifyAuth from "../../Spotify/SpotifyAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Импорт стилей


class App extends React.Component {

  componentDidMount(){
    SpotifyAuth.setTimerToRefreshToken();
  }

  render(){
    return (
      <div>
        <ToastContainer 
          theme='colored'
          closeOnClick={true}
        />
        <header className={styles.header}>
          <h1 className = {styles.siteName}>SpotyJAM</h1>
        </header>
        <main >  
          <SearchBar />
          <div className={styles.lists}>
            <SearchResults />
            <Playlist />
          </div>
        </main>
      </div> 
    )}
}

export default App;


