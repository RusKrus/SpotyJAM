import React from "react";
import styles from "./playlist.module.css";
import Track from '../track/Track'
import { setPlaylistName, createPlaylist } from "./playlistSlice";
import { RootState, AppDispatch } from "../app/store";
import { DataForCreatingPlaylist } from "../../helperModules/appTypes";
import { connect, ConnectedProps } from "react-redux";
/*import { useSelector, useDispatch } from "react-redux";

function PlayList(){
    const dispatch = useDispatch();
    const playlistName = useSelector(state=>state.playlistState.playlistName);
    const playlistSongsData = useSelector(state=>state.playlistState.playlistSongsData)

    const handleChange=(e)=>{
        dispatch(setPlaylistName(e.target.value));
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();
        dispatch(createPlaylist({playlistName, playlistSongsData}));
        setPlaylistName("");
    };

    return(
        <div className={styles.box}>
        <form id="name" onSubmit={handleSubmit}>
                <input className={styles.input} autoComplete="off" onChange={handleChange} type="text" name="Playlist's name"  placeholder="Playlist's name..." value={playlistName}/>
            </form>
            <hr></hr>
            {playlistSongsData.map(songData => <Track songData = {songData} key={songData.id} containerType = 'Playlist'/>)}
            <button form="name" type="submit" className={styles.button}>Submit to Spotify</button>
        </div>
    )
}*/

const mapStateToProps = (state: RootState) => {
    return {
        playlistName: state.playlistState.playlistName,
        playlistSongsData: state.playlistState.playlistSongsData
    }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        setPlaylistName: (userInput: string) =>  dispatch(setPlaylistName(userInput)), 
        createPlaylist: ({playlistName, playlistSongsData}: DataForCreatingPlaylist) => dispatch(createPlaylist({playlistName, playlistSongsData}))
    }
};

const connected = connect(mapStateToProps, mapDispatchToProps);
type ReduxPropsForPlaylist = ConnectedProps<typeof connected>


class PlaylistRepresentational extends React.Component<ReduxPropsForPlaylist>{
    handleChange=(e: React.FormEvent<HTMLInputElement>): void => {
        this.props.setPlaylistName(e.currentTarget.value);
    };

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        const { playlistName, playlistSongsData } = this.props;
        e.preventDefault();
        this.props.createPlaylist({playlistName, playlistSongsData});
        this.props.setPlaylistName("");
    };
    
    render(){
        return(
            <div className={styles.box}>
            <form id="name" onSubmit={this.handleSubmit}>
                    <input className={styles.input} autoComplete="off" onChange={this.handleChange} type="text" name="Playlist's name"  placeholder="Playlist's name..." value={this.props.playlistName}/>
                </form>
                <hr></hr>
                {this.props.playlistSongsData.map(songData => <Track songData = {songData} key={songData.id} containerType = 'Playlist'/>)}
                <button form="name" type="submit" className={styles.button}>Submit to Spotify</button>
            </div>
        )
    }
}

const PlaylistContainer = connected(PlaylistRepresentational)

export default PlaylistContainer;