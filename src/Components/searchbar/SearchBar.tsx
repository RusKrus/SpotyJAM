import React from "react";
import styles from "./searchBar.module.css";
import LoadingWheel from "../loadingwheel/LoadingWheel";
import { setUserInput, getSongs } from "./searchBarSlice";
import { RootState, AppDispatch } from "../app/store";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => {
    return {
        userInput: state.searchBarState.userInput,
        status: state.searchBarState.status
    }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        setUserInput: (value: string) => dispatch(setUserInput(value)),
        getSongs: (userInput: string) => dispatch(getSongs(userInput)),
    }
};

const connected = connect(mapStateToProps, mapDispatchToProps);
type ReduxPropsForSearchBar = ConnectedProps<typeof connected>

class SearchBarRepresentational extends React.Component<ReduxPropsForSearchBar> {

    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.props.setUserInput(e.currentTarget.value);
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.props.getSongs(this.props.userInput);
    }

    handleUnload = (): void => {
        window.sessionStorage.setItem('userInput', this.props.userInput);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload);
        const savedInput: string | null = window.sessionStorage.getItem('userInput');
        if(savedInput){
            this.props.setUserInput(savedInput);
        }
    }

    componentWillUnmount(){
        window.removeEventListener('beforeunload', this.handleUnload);
    }

    render(){
        const loadingStatus = this.props.status;
        return(
            <div className={styles.searchbar}>
                <form onSubmit={this.handleSubmit} className = {styles.searchForm}>
                    <input required autoComplete='off' className={styles.input} type="text" id="search" onChange={this.handleChange} value={this.props.userInput} placeholder="Find your song..."/>
                    <button disabled={loadingStatus==='loading'?true: false} className={styles.button}>{loadingStatus==='loading'?<LoadingWheel size = {3} color='black'/>:'Search'}</button>
                </form>
            </div>
        )
    }

}

const SerachBarContainer = connected(SearchBarRepresentational)

export default SerachBarContainer;
