//员工考勤记录（普通管理员）
import React,{Component} from 'react';
import styles from '../styles/AttendanceData.css';

import back from '../asset/ico/back.png';
import top from '../asset/manager/triangle-top.png';

class AttendanceData extends Component{
    constructor() {
        super();
        this.state={

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '员工考勤记录';
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
                <div className={styles.timetable}>
                   <div className={styles.currentTimetable}>日</div>
                   <div>月</div>
                   <div>年</div>
                </div>
                <div className={styles.detailsList}>
                    <div className={styles.item}>
                        <div className={styles.name}>路小雨</div>
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
                        <div className={styles.name}>叶湘伦</div>
                        <div className={styles.work}>
                            <div className={styles.gotoWork}>上班:<span className={styles.abnormal}>迟到</span></div>
                            <div className={styles.punchTime}>08:25</div>
                        </div>
                        <div className={styles.work}>
                            <div className={styles.gooffWork}>上班:<span>正常</span></div>
                            <div className={styles.punchTime}>08:25</div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.name}>风落殇</div>
                        <div className={styles.work}>
                            <div className={styles.gotoWork}>上班:<span className={styles.abnormal}>未打卡</span></div>
                            <div className={styles.punchTime}>08:25</div>
                        </div>
                        <div className={styles.work}>
                            <div className={styles.gooffWork}>上班:<span className={styles.abnormal}>早退</span></div>
                            <div className={styles.punchTime}>08:25</div>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.brief}>
                        <span>2017.12.15</span>/<span>智慧园区</span>
                        <img className={styles.top} src={top} alt=""/>
                    </div>
                    <div className={styles.exportData}>导出数据</div>
                </div>            
            </div>
        )
    }
}
export default AttendanceData;