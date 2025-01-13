import React from 'react';
import SpotifyAuth from '../../Spotify/SpotifyAuth';
import LoadingWheel from '../loadingwheel/LoadingWheel'
import styles from './redirect.module.css'

class RedirectPage extends React.Component{
    state: {
        errorMessage: string,
        errorObtained: boolean
    }

    constructor(props: {}){
        super(props)
        this.state = {
            errorMessage: '',
            errorObtained: false
        }
    }

    async componentDidMount(){
        try{
            await SpotifyAuth.getToken();
        }
        catch(e: unknown){
            if(e instanceof Error){
                this.setState({
                    errorMessage: e.message,
                    errorObtained: true
                })
            }
            else{
                console.log(e)
            }
        }
    };


    render(){
        const errorObtained = this.state.errorObtained;
        const errorMessage = this.state.errorMessage;
        setTimeout(()=>window.location.replace('/'), 5000)
        if(errorObtained){
            return (
                <div className = {styles.redirectPage}>
                    <p className={styles.errorText}>An error occured:
                        <br/> 
                        <strong>{errorMessage}</strong> 
                        <br/> 
                        Please, try to sign in again 
                        <br/> 
                        You are going to be redirected in a few seconds
                    </p>
                </div>
            )
        }
        else{
            return (
                <div className = {styles.redirectPage}>
                    <h1 className = {styles.redirectSign}>Just one moment...</h1>
                    <LoadingWheel size = {5} color = 'white' />
                </div>
            )
        }
    }
}



export default RedirectPage