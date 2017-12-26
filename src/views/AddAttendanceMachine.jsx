//添加考勤机（超级管理）
import React,{Component} from 'react';
import styles from '../styles/AddAttendanceMachine.css';

import backImg from '../asset/ico/back.png';

class AddAttendanceMachine extends Component{
    constructor() {
        super();
        this.state={}
    }
    componentDidMount() {
        document.querySelector('title').innerText = '添加考勤机';
    }
    render() {
        return(
            <div className={styles.contianer}>
                <div className={styles.header}>
                    <img className={styles.back} src={backImg} alt=""/>
                    <div className={styles.title}>添加考勤机</div>
                </div>
                <div className={styles.content}>
                     <div className={styles.item}>
                       <div className={styles.machineNum}>考勤机编号</div>
                       <div className={styles.num}>HDHDKENDNE</div>
                     </div>
                     <div className={styles.item}>
                       <div className={styles.companyInfo}>企业信息</div>
                       <div className={styles.company}>南京XXXX责任有限公司</div>
                     </div>
                     <div className={styles.item}>
                       <div className={styles.superManage}>超级管理员信息</div>
                       <div className={styles.name}>王小明</div>
                       <div className={styles.phone}>13855667788</div>
                     </div>
                </div>
                <div className={styles.binding}>确认绑定</div>    
            </div>
        )
    }

}
export default AddAttendanceMachine;