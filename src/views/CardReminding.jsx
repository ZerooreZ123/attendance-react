import React,{Component} from 'react';
import Switch from 'react-ios-switch';
import styles from '../styles/CardReminding.css';

import back from '../asset/ico/back.png';
import top from '../asset/manager/triangle-top.png';

class CardReminding extends Component {
    constructor() {
        super();
        this.state={}
    }
    componentDidMount() {
        document.querySelector('title').innerText = '打卡提醒';
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>打卡提醒</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <div>
                            <div className={styles.work}>上班打卡提醒</div>
                            <div className={styles.workRemind}>上班前10分钟未打卡提醒
                                <img src={top} alt=""/>
                                {/* <div className={styles.timeSlot}>
                                    <div>前3分钟</div>
                                    <div>前5分钟</div>
                                    <div>前10分钟</div>
                                    <div>前20分钟</div>
                                    <div>前30分钟</div>
                                </div> */}
                            </div>
                        </div>
                        <Switch/>
                    </div>
                    <div className={styles.item}>
                        <div>
                            <div className={styles.work}>下班打卡提醒</div>
                            <div className={styles.workRemind}>下班后10分钟未打卡提醒
                                <img src={top} alt=""/>
                                <div className={styles.timeSlot}>
                                    <div>前3分钟</div>
                                    <div>前5分钟</div>
                                    <div className={styles.current}>前10分钟</div>
                                    <div>前20分钟</div>
                                    <div>前30分钟</div>
                                </div>
                            </div>
                        </div>
                        <Switch/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardReminding;