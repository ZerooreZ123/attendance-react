//添加考勤机（超级管理）
import React,{Component} from 'react';
import styles from '../styles/AddAttendanceMachine.css';

import XHR from '../utils/request';
import API from '../api/index';

class AddAttendanceMachine extends Component{
    constructor() {
        super();
        this.state={}
    }
    componentDidMount() {
        // document.querySelector('title').innerText = '添加考勤机';
    }
    backMove() {
        window.history.go(-1);
    }
    async update() {
        const result = await XHR.post(API.update,{
            loginName:'',
            companyName:'',
            serialNumber:''
        });
        if(JSON.parse(result).data.success === "T") {
            alert("绑定成功");
        }
    }
    render() {
        return(
            <div className={styles.contianer}>
                <div className={styles.content}>
                     <div className={styles.item}>
                       <div className={styles.machineNum}>考勤机编号</div>
                       <input className={styles.num}/>
                     </div>
                     <div className={styles.item}>
                       <div className={styles.companyInfo}>企业信息</div>
                       <input className={styles.company}/>
                     </div>
                     <div className={styles.item}>
                       <div className={styles.superManage}>超级管理员信息</div>
                       <input className={styles.name}/>
                       <input className={styles.phone}/>
                     </div>
                </div>
                <div className={styles.binding} onClick={ev =>this.update(ev)}>确认绑定</div>    
            </div>
        )
    }

}
export default AddAttendanceMachine;