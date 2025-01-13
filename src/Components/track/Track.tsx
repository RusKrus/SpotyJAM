import React from "react";
import styles from "./track.module.css";
import { setPlaylistSongsData, removePlayListSongsData } from "../playlist/playlistSlice";
import { RootState, AppDispatch } from "../app/store";
import { TrackProps, TrackDataForApp } from "../../helperModules/appTypes";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => {
    return {
        playlistSongsData: state.playlistState.playlistSongsData
    }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        removePlayListSongsData: (id: string) => dispatch(removePlayListSongsData(id)),
        setPlaylistSongsData: (songData: TrackDataForApp) => dispatch(setPlaylistSongsData(songData))
    }
};

const connected = connect(mapStateToProps, mapDispatchToProps);
type ReduxPropsForTrack = ConnectedProps<typeof connected>;

type TrackPropsWithRedux = TrackProps & ReduxPropsForTrack;

class TrackRepresentation extends React.Component <TrackPropsWithRedux> {
    handleMinusClick = () =>{
        this.props.removePlayListSongsData(this.props.songData.uri)
    }

    handlePlusClick = () => {
        const songAlreadyAdded = this.props.playlistSongsData.some(songData=>songData.uri===this.props.songData.uri);
        
        if(!songAlreadyAdded){
            this.props.setPlaylistSongsData(this.props.songData);
        } 
    }
    
    render(){
        const { artistName, songName, songImage, albumName, spotifyUrl } = this.props.songData;
        const interactionButton: React.JSX.Element = this.props.containerType==="Search results"?<button className={styles.button} onClick={this.handlePlusClick}>+</button>: <button className={styles.button} onClick={this.handleMinusClick}>-</button>
        return (
            <div className={styles.container}>
                <img className = {styles.songImage} src={songImage} alt="Album cover"/>
                <a className={styles.songNameAndUrl} href={spotifyUrl} rel="noopener noreferrer" target = "_blank"><strong>{artistName}</strong> - {songName}</a>
                <p className={styles.album}>{albumName}</p>
                {interactionButton}
            </div>
        )
    }
}

const TrackContainer = connected(TrackRepresentation)

export default TrackContainer;