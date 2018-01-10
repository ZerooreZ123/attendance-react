import React,{Component} from 'react';
import styles from '../styles/Backstagelogon.css';

import computer from '../asset/computer.png';


class Backstagelogon extends Component {
    constructor() {
        super();
        this.state={
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '后台登录';
    }
    render() {
        return(
            <div className={styles.container}>
              <div className={styles.content}>
                  <img className={styles.photo} src={computer} alt=""/>
                  <div className={styles.text}>电脑端登录确认</div>
                  <div className={styles.login}>登录</div>
                  <div className={styles.cancel}>取消登录</div>  
              </div>
            </div>
        )
    }
}
export default Backstagelogon
