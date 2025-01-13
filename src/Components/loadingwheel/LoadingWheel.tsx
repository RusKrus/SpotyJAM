import React from 'react';
import styles from './loadingWheel.module.css'



class LoadingWheel extends React.Component<{size: number, color: string}> {
    static defaultProps = {
        size: 5
    }
    render(){
        const size = this.props.size;
        const color = this.props.color;
        return (
            <span className={styles.loader} style={{width: size*4, height: size*4, borderWidth: size+1, borderColor: color}}></span>
        )
    }
}



export default LoadingWheel



