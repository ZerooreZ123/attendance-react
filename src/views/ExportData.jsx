import React,{Component} from 'react';
import styles from '../styles/ExportData.css';

import back from '../asset/ico/back.png'

class ExportData extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '导出数据';
    }
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>导出数据</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.describe}>
                        <div>数据描述</div>
                        <div><span>2018.01.</span>/<span>智慧园区</span></div>
                    </div>
                    <div className={styles.mailbox}>
                        <div>接收邮箱</div>
                        <input className={styles.inputBox} type="text" placeholder="接收邮箱" />
                    </div>
                </div>
                <div className={styles.button}>发送</div>
            </div>
        )
    }
}
export default ExportData;