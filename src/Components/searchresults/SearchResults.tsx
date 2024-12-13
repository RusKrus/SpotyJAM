import React from "react";
import Track from "../track/Track";
import styles from "./searchResults.module.css";
import { RootState } from "../app/store";
import { connect, ConnectedProps } from 'react-redux';
/*import { useSelector } from 'react-redux';

function SearchResults(){
    const userInput = useSelector(state=>state.searchBarState.userInput);
    const songsList = useSelector(state=>state.searchBarState.songs);
    const lowerCaseUserInput = userInput.toLowerCase();
    return(
        <div className={styles.box}>
            <h2 className={styles.h2}>Results</h2>
            <hr></hr>
            {lowerCaseUserInput&&songsList.map(songData=>{
            const { artist, name, album, id } = songData;
            return (
                name.toLowerCase().includes(lowerCaseUserInput)||artist.toLowerCase().includes(lowerCaseUserInput)||album.toLowerCase().includes(lowerCaseUserInput))?
                <Track 
                    songData = {songData}
                    key = {id} 
                    containerType = "Search results"
                    setSavedPlaylistTracksData={setSavedPlaylistTracksData} />
                :null})}  
        </div>
    )
}*/
const mapStateToProps = (state: RootState) => {
    return {
        userInput: state.searchBarState.userInput, 
        songsList: state.searchBarState.songs
    }
}
const connected = connect(mapStateToProps);
type ReduxPropsForSearchResults = ConnectedProps<typeof connected>

class SearchResultsPresentational extends React.Component<ReduxPropsForSearchResults>{
    
    render(){
        const {userInput, songsList} = this.props;
        const lowerCaseUserInput: string = userInput.toLowerCase();
        return(
            <div className={styles.box}>
                <h2 className={styles.h2}>Results</h2>
                <hr></hr>
                {lowerCaseUserInput&&songsList.map(songData=>{
                const { artist, name, album, id } = songData;
                return (
                    name.toLowerCase().includes(lowerCaseUserInput)||artist.toLowerCase().includes(lowerCaseUserInput)||album.toLowerCase().includes(lowerCaseUserInput))?
                    <Track 
                        songData = {songData}
                        key = {id} 
                        containerType = "Search results" />
                    :null})}  
            </div>
        )
    }

}

const SearchResultsContainer = connected(SearchResultsPresentational);

export default SearchResultsContainer;