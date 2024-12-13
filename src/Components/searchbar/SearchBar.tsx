import React from "react";
import styles from "./searchBar.module.css";
import { setUserInput, getSongs } from "./searchBarSlice";
import { RootState, AppDispatch } from "../app/store";
import { connect, ConnectedProps } from "react-redux";
/*import { useDispatch, useSelector } from "react-redux";

function SearchBar(){
    const dispatch = useDispatch();
    const userInput = useSelector(state=>state.searchBarState.userInput);

    const handleChange = (e) => {
        dispatch(setUserInput(e.target.value))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch(getSongs(userInput));
    }

    return(
        <div className={styles.searchbar}>
            <form onSubmit={handleSubmit}>  
                <input  autoComplete='off' className={styles.input} type="text" id="search" onChange={handleChange} value={userInput} placeholder="Find your song..."/>
                <br/>
                <button type="submit" className={styles.button}>Search</button>
            </form>
        </div>
    )
}*/

const mapStateToProps = (state: RootState) => {
    return {
        userInput: state.searchBarState.userInput
    }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        setUserInput: (value: string) => dispatch(setUserInput(value)),
        getSongs: (userInput: string) => dispatch(getSongs(userInput))
    }
};

const connected = connect(mapStateToProps, mapDispatchToProps);
type ReduxPropsForSearchBar = ConnectedProps<typeof connected>

class SearchBarRepresentational extends React.Component<ReduxPropsForSearchBar> {

    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.props.setUserInput(e.currentTarget.value)
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.props.getSongs(this.props.userInput);
    }

    render(){
        return(
            <div className={styles.searchbar}>
                <form onSubmit={this.handleSubmit}>  
                    <input  autoComplete='off' className={styles.input} type="text" id="search" onChange={this.handleChange} value={this.props.userInput} placeholder="Find your song..."/>
                    <br/>
                    <button type="submit" className={styles.button}>Search</button>
                </form>
            </div>
        )
    }

}

const SerachBarContainer = connected(SearchBarRepresentational)

export default SerachBarContainer;