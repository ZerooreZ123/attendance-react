import React,{Component} from 'react';
import styles from '../styles/HistoryAnnouncement.css';

import backImg from '../asset/ico/back.png';
import photoMin from '../asset/photo-min.jpg';

class HistoryAnnouncement extends Component{
    constructor() {
        super();
        this.state={

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '历史公告';
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <img className={styles.back} src={backImg} alt=""/>
                    <div className={styles.title}>历史公告</div>
                    <div className={styles.release}>发布公告</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <div className={styles.itemText}>
                            <div className={styles.caption}>临时放假通知</div>
                            <div className={styles.itemContent}>为照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾</div>
                            <div className={styles.itemDate}>2017.12.18</div>
                        </div>
                        <img className={styles.itemImg}src={photoMin} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemText}>
                            <div className={styles.caption}>临时放假通知</div>
                            <div className={styles.itemContent}>为照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾</div>
                            <div className={styles.itemDate}>2017.12.18</div>
                        </div>
                        <img className={styles.itemImg}src={photoMin} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemText}>
                            <div className={styles.caption}>临时放假通知</div>
                            <div className={styles.itemContent}>为照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾</div>
                            <div className={styles.itemDate}>2017.12.18</div>
                        </div>
                        <img className={styles.itemImg}src={photoMin} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}
export default HistoryAnnouncement;
