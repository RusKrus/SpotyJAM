import React from "react";
import styles from "./track.module.css";
import { setPlaylistSongsData, removePlayListSongsData } from "../playlist/playlistSlice";
import { RootState, AppDispatch } from "../app/store";
import { SongsData, TrackProps } from "../../helperModules/appTypes";
import { connect, ConnectedProps } from "react-redux";
/*import { useSelector, useDispatch } from "react-redux";

function Track({ songData,  containerType }){
    const dispatch = useDispatch();
    const playlistSongsData = useSelector(state=>state.playlistState.playlistSongsData)
    const { artist, name, album, id } = songData;
    
    const handleMinusClick = () =>{
        dispatch(removePlayListSongsData(id))
    }

    const handlePlusClick = () => {
        const isAdded = playlistSongsData.some(songData=>songData.id===id);
        if(!isAdded){
            dispatch(setPlaylistSongsData(songData));
        } 
    }  

    const interactionButton = containerType==="Search results"?<button className={styles.button} onClick={handlePlusClick}>+</button>: <button className={styles.button} onClick={handleMinusClick}>-</button>

    return(
        <div className={styles.container}>
            <p className={styles.p1}><strong>{artist}</strong> - {name}</p>
            <p className={styles.p2}>{album}</p>
            {interactionButton}
        </div>
    )
}
*/

const mapStateToProps = (state: RootState) => {
    return {
        playlistSongsData: state.playlistState.playlistSongsData
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        removePlayListSongsData: (id: string) => dispatch(removePlayListSongsData(id)),
        setPlaylistSongsData: (songData: SongsData) => dispatch(setPlaylistSongsData(songData))
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps);
type ReduxPropsForTrack = ConnectedProps<typeof connected>;

type TrackPropsWithRedux = TrackProps & ReduxPropsForTrack;

class TrackRepresentation extends React.Component <TrackPropsWithRedux> {
    handleMinusClick = () =>{
        this.props.removePlayListSongsData(this.props.songData.id)
    }

    handlePlusClick = () => {
        const isAdded = this.props.playlistSongsData.some(songData=>songData.id===this.props.songData.id);
        
        if(!isAdded){
            this.props.setPlaylistSongsData(this.props.songData);
        } 
    }
    
    render(){
        const { artist, name, album } = this.props.songData;
        const interactionButton: React.JSX.Element = this.props.containerType==="Search results"?<button className={styles.button} onClick={this.handlePlusClick}>+</button>: <button className={styles.button} onClick={this.handleMinusClick}>-</button>
        return (
            <div className={styles.container}>
                <p className={styles.p1}><strong>{artist}</strong> - {name}</p>
                <p className={styles.p2}>{album}</p>
                {interactionButton}
            </div>
        )
    }
}

const TrackContainer = connected(TrackRepresentation)

export default TrackContainer;