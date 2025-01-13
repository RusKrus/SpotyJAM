import React from "react";
import styles from "./playlist.module.css";
import Track from '../track/Track'
import LoadingWheel from "../loadingwheel/LoadingWheel";
import { setPlaylistName, createPlaylist, setPlaylistSongsData, clearPlaylistSongsData } from "./playlistSlice";
import { RootState, AppDispatch } from "../app/store";
import { DataForCreatingPlaylist, TrackDataForApp } from "../../helperModules/appTypes";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => {
    return {
        playlistName: state.playlistState.playlistName,
        playlistSongsData: state.playlistState.playlistSongsData,
        status: state.playlistState.status
    }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        setPlaylistName: (userInput: string) =>  dispatch(setPlaylistName(userInput)), 
        createPlaylist: ({playlistName, playlistUris}: DataForCreatingPlaylist) => dispatch(createPlaylist({playlistName, playlistUris})),
        setPlaylistSongsData: (songData: TrackDataForApp) => dispatch(setPlaylistSongsData(songData)),
        clearPlaylistSongsData: () => dispatch(clearPlaylistSongsData())
    }
};

const connected = connect(mapStateToProps, mapDispatchToProps);
type ReduxPropsForPlaylist = ConnectedProps<typeof connected>
type PlaylistState = {
    isModalOpened: boolean
}


class PlaylistRepresentational extends React.Component<ReduxPropsForPlaylist, PlaylistState>{
    constructor(props: ReduxPropsForPlaylist){
        super(props);
        this.state = {
            isModalOpened: false
        };
    }

    handleChange=(e: React.FormEvent<HTMLInputElement>): void => {
        this.props.setPlaylistName(e.currentTarget.value);
    };

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const { playlistName, playlistSongsData } = this.props;
        const playlistUris: string[] = playlistSongsData.map(songData => songData.uri);
        await this.props.createPlaylist({playlistName, playlistUris});
        if(this.props.status==='loaded'){
            this.props.setPlaylistName("");
            this.props.clearPlaylistSongsData();
        }
    };

    handleUnloadToSavePlaylist = (): void => {
        if(this.props.playlistSongsData.length>0){
            const playlistDataForSave: string = JSON.stringify(this.props.playlistSongsData);
            window.sessionStorage.setItem('playlistData', playlistDataForSave);
        }
    }

    handleLoadToRestorePlaylist = (savedSongData: string): void => {
        const savedSongsArray: TrackDataForApp[] = JSON.parse(savedSongData);
        savedSongsArray.map((songData: TrackDataForApp) => this.props.setPlaylistSongsData(songData));
        window.sessionStorage.removeItem('playlistData');
    }

    componentDidMount= (): void => {
        window.addEventListener('beforeunload', this.handleUnloadToSavePlaylist);
        const savedSongData: string | null = window.sessionStorage.getItem('playlistData');
        if(savedSongData){
            this.handleLoadToRestorePlaylist(savedSongData)
        };
    }

    componentWillUnmount = (): void => {
        window.removeEventListener('beforeunload', this.handleUnloadToSavePlaylist);
    }
    
    render(){
        const loadingStatus = this.props.status;
        return(
            <div className={styles.playlistBox}>
                <form id="name" onSubmit={this.handleSubmit} className={styles.playlistInputForm}>
                    <input required className={styles.playlistNameInput} autoComplete="off" onChange={this.handleChange} type="text" name="Playlist's name"  placeholder="Playlist's name..." value={this.props.playlistName}/>
                </form>
                <hr></hr>
                <div className={styles.musicBox}>
                    {this.props.playlistSongsData.map(songData => 
                        <Track songData = {songData} 
                            key={songData.uri} 
                            containerType = 'Playlist'/>
                        )
                    }
                </div>
                <hr></hr>
                <button form="name" type="submit" className={styles.button}>{loadingStatus==='loading'?<LoadingWheel size = {3} color='black'/>: 'Submit to Spotify'}</button>
            </div>
        )
    }
}

const PlaylistContainer = connected(PlaylistRepresentational)

export default PlaylistContainer;