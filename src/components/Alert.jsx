import React, { Component } from 'react';
import styles from '../styles/Alert.css'

class Toast extends Component {
    constructor() {
        super();
        this.state = {
            confire:false,
            cancel:false,
        }
    }
    componentDidMount() {

    }
    confirm(){
       this.setState({confire:true})
    }
    cancel(){
       this.setState({cancel:true})
    }
    render() {
        const html = this.props.isShow?<div className={styles.wrap}>
                <div className={styles.box}>
                    <div className={styles.text}> {this.props.text}</div>
                    <div className={styles.selectTab}>
                        <span onClick={(ev) =>this.confirm(ev)}>确认</span><span onClick={(ev)=>this.cancel(ev)}>取消</span>
                    </div>
                </div>
            </div>:null
        return html
    }

}
export default Toast;