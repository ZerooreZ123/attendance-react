//考勤管理（超级管理）
import React,{Component} from 'react';
import styles from '../styles/AttendanceManagement.css';

import backImg from '../asset/ico/back.png';
import icon from '../asset/ico/icon.png';
import top from '../asset/manager/triangle-top.png';
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
const CheckBtn = (props) => {
    if (props.checked === true) {
      return <img src={check} alt="" />;
    } else {
      return <img src={nocheck} alt="" />;
    }
}
const Icon = (props) => {
    if (props.checked === true) {
      return <img className={styles.icon} src={top} alt=""/>;
    } else {
      return <img className={styles.icon} src={icon} alt=""/>;
    }
}

class AttendanceManagement extends Component{

    constructor() {
        super();
        this.state = {
            week:['周一','周二','周三','周四','周五','周六','周日']
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '考勤管理';
    }
    backMove() {
        window.history.go(-1);
    }
    render() {
        const {week} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <img onClick={ev =>this.backMove(ev)} className={styles.back} src={backImg} alt=""/>
                    <div className={styles.title}>考勤管理</div>
                </div> 
                <div className={styles.content}>
                     <div className={styles.clockTime}>
                         <div className={styles.clock}>打卡时间</div>
                         <div className={styles.time}>
                             <div>上午</div>
                             <div>08:45<Icon checked={false}/></div>
                         </div>
                         <div className={styles.time}>
                             <div>下午</div>
                             <div>18:00<Icon checked={false}/></div>
                         </div>
                     </div>
                     <div className={styles.automaticTime}>
                        <div className={styles.clock}>打卡时间</div>
                            <div className={styles.time}>
                                <div>上午</div>
                                <div>08:45<Icon checked={false}/></div>
                            </div>
                            <div className={styles.time}>
                                <div>下午</div>
                                <div>18:00<Icon checked={true}/></div>
                            </div>
                        </div>
                     <div className={styles.workTime}>
                         <div className={styles.work}>工作时间</div>
                         <div className={styles.holiday}><SelectBtn checked={true} />跟随节假日</div>
                         <div className={styles.custom}><SelectBtn checked={true}/>自定义</div>
                         <div className={styles.week}>
                            {
                                    week.map((item,index) =>
                                      <div className={styles.item} key={index}><CheckBtn checked={false}/>{item}</div>
                                )
                            }
                         </div>
                     </div>
                </div> 
                <div className={styles.determine}>确认</div> 
            </div>
        )
    }
    
}

export default AttendanceManagement;