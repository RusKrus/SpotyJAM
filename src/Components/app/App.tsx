
import React from "react";
import SearchBar from "../searchbar/SearchBar";
import SearchResults from "../searchresults/SearchResults";
import Playlist from "../playlist/Playlist";
import styles from './app.module.css';

/*function App() {

  return (
    <div>
      <header className={styles.header}>
        <h1>JAMMMING</h1>
      </header>
      <main >  
        <SearchBar />
        <div className={styles.lists}>
          <SearchResults />
          <Playlist />
        </div>
      </main>
    </div>

  );
}*/

class App extends React.Component {

  render(){
    return (
      <div>
        <header className={styles.header}>
          <h1>JAMMMING</h1>
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


