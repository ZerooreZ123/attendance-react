//考勤管理（超级管理）
import React,{Component} from 'react';
import styles from '../styles/AttendanceManagement.css';

import backImg from '../asset/ico/back.png';
import icon from '../asset/ico/icon.png';
import check from '../asset/manager/Check.png';
import nocheck from '../asset/manager/noCheck.png';
import choose from '../asset/manager/choose.png';
import nochoose from '../asset/manager/noChoose.png';

const SelectBtn = (props) => {
    if (props.checked === true) {
      return <img className={styles.choose} src={choose} alt="" />;
    } else {
      return <img className={styles.nochoose} src={nochoose} alt="" />;
    }
}

class AttendanceManagement extends Component{

    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '考勤管理';
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <img className={styles.back} src={backImg} alt=""/>
                    <div className={styles.title}>考勤管理</div>
                </div> 
                <div className={styles.content}>
                     <div className={styles.clockTime}>
                         <div className={styles.clock}>打卡时间</div>
                         <div className={styles.time}>
                             <div>上午</div>
                             <div>08:45<img className={styles.icon} src={icon} alt=""/></div>
                         </div>
                         <div className={styles.time}>
                             <div>下午</div>
                             <div>18:00<img className={styles.icon} src={icon} alt=""/></div>
                         </div>
                     </div>
                     <div className={styles.automaticTime}>
                        <div className={styles.clock}>打卡时间</div>
                            <div className={styles.time}>
                                <div>上午</div>
                                <div>08:45<img className={styles.icon} src={icon} alt=""/></div>
                            </div>
                            <div className={styles.time}>
                                <div>下午</div>
                                <div>18:00<img className={styles.icon} src={icon} alt=""/></div>
                            </div>
                        </div>
                     <div className={styles.workTime}>
                         <div className={styles.work}>工作时间</div>
                         <div className={styles.holiday}><img className={styles.choose} src={choose} alt=""/>跟随节假日</div>
                         <div className={styles.custom}><img className={styles.nochoose} src={nochoose} alt=""/>自定义</div>
                         <div className={styles.week}>
                             <div className={styles.item}><img src={check} alt=""/>周一</div>
                             <div className={styles.item}><img src={check} alt=""/>周二</div>
                             <div className={styles.item}><img src={check} alt=""/>周三</div>
                             <div className={styles.item}><img src={check} alt=""/>周四</div>
                             <div className={styles.item}><img src={check} alt=""/>周五</div>
                             <div className={styles.item}><img src={nocheck} alt=""/>周六</div>
                             <div className={styles.item}><img src={nocheck} alt=""/>周日</div>
                         </div>
                     </div>
                </div> 
                <div className={styles.determine}>确认</div> 
            </div>
        )
    }
    
}

export default AttendanceManagement;