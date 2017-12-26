import React,{Component} from 'react';
import styles from '../styles/AttendanceRecord.css';

import back from '../asset/ico/back.png'

class AttendanceRecord extends Component{
    constructor() {
        super();
        this.state={

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '考勤记录';
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>
                        <div className={styles.currentTab}>全部</div>
                        <div className={styles.tab}>异常</div>
                    </div>    
                </div>
                <div className={styles.month}>
                   <div className={styles.currentMonth}>12月</div>
                   <div>11月</div>
                   <div>10月</div>
                   <div>9月</div>
                </div>
                <div className={styles.detailsList}>
                    <div className={styles.item}>
                        <div className={styles.displayDate}><span>2018.8.28</span><span>周一</span></div>
                        <div className={styles.work}>
                            <div className={styles.gotoWork}>上班:<span>正常</span></div>
                            <div className={styles.punchTime}>08:25</div>
                        </div>
                        <div className={styles.work}>
                            <div className={styles.gooffWork}>上班:<span>正常</span></div>
                            <div className={styles.punchTime}>08:25</div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.displayDate}><span>2018.8.28</span><span>周一</span></div>
                        <div className={styles.work}>
                            <div className={styles.gotoWork}>上班:<span>正常</span></div>
                            <div className={styles.punchTime}>08:25</div>
                        </div>
                        <div className={styles.work}>
                            <div className={styles.gooffWork}>上班:<span>正常</span></div>
                            <div className={styles.punchTime}>08:25</div>
                        </div>
                    </div>
                </div>             
            </div>
        )
    }
}
export default AttendanceRecord;