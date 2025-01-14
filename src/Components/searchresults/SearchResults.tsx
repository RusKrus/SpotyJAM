import React from "react";
import Track from "../track/Track";
import styles from "./searchResults.module.css";
import { restoreSavedSongs, clearAllSongs} from "../searchbar/searchBarSlice";
import { RootState, AppDispatch } from "../app/store";
import { StateForSearchResults, ParsedTracksServerDataForApp } from "../../helperModules/appTypes";
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState): StateForSearchResults => {
    return {
        songsList: state.searchBarState.parsedServerData.songsData,
        parsedServerData: state.searchBarState.parsedServerData
    }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        restoreSavedSongs: (parsedServerData: ParsedTracksServerDataForApp) => dispatch(restoreSavedSongs(parsedServerData)),
        clearAllSongs: () => dispatch(clearAllSongs())
    }
};


const connected = connect(mapStateToProps, mapDispatchToProps);
type ReduxPropsForSearchResults = ConnectedProps<typeof connected>

class SearchResultsPresentational extends React.Component<ReduxPropsForSearchResults>{
    
    handleUnloadToSaveTracks = (): void => {
        if(this.props.songsList.length>0){
            const savedSongsData: string = JSON.stringify(this.props.parsedServerData);
            window.sessionStorage.setItem('songData', savedSongsData);
        }
    };

    handleLoadToRestoreSongs = (savedSongsData: string): void => {
        const parsedSavedSongsArray: ParsedTracksServerDataForApp = JSON.parse(savedSongsData);
        this.props.restoreSavedSongs(parsedSavedSongsArray);
    };

    handleClearClick = (): void => {
        window.sessionStorage.removeItem('songData');
        this.props.clearAllSongs();
    }

    componentDidMount(): void {
        window.addEventListener('beforeunload', this.handleUnloadToSaveTracks);
        const savedSongsData: string | null = window.sessionStorage.getItem('songData');
        if(savedSongsData){
            this.handleLoadToRestoreSongs(savedSongsData);
        };
    };
    
    componentWillUnmount(): void {
        window.removeEventListener('beforeunload', this.handleUnloadToSaveTracks);
    };

    render(){
        const { songsList } = this.props;
        return(
            <div className={styles.resultsWithMusicBox}>
                <div className={styles.headerBox}>
                    <h2 className={styles.resultBoxHeader}>
                        Results 
                        <br/>
                        <span style={{visibility: this.props.songsList.length>0?'visible':'hidden'}} onClick = {this.handleClearClick} className = {styles.clearResultsButton}>CLEAR SONGS</span>
                    </h2>
                    
                </div>
                <hr ></hr>
                <div className = {styles.musicBox}>
                    {songsList.map((songData, index)=>{
                        return (
                            <Track 
                                songData = {songData}
                                key = {index} 
                                containerType = "Search results" />
                            )}
                        )
                    }  
                </div>
                <hr></hr>
            </div>
        )
    }

}

const SearchResultsContainer = connected(SearchResultsPresentational);

export default SearchResultsContainer;