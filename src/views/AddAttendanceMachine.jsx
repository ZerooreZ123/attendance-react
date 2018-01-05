//添加考勤机（超级管理）
import React,{Component} from 'react';
import styles from '../styles/AddAttendanceMachine.css';

import XHR from '../utils/request';
import API from '../api/index';

import backImg from '../asset/ico/back.png';

class AddAttendanceMachine extends Component{
    constructor() {
        super();
        this.state={}
    }
    componentDidMount() {
        document.querySelector('title').innerText = '添加考勤机';
    }
    backMove() {
        window.history.go(-1);
    }
    async update() {
        const result = await XHR.post(API.update,{
            loginName:"18550117460",
            companyName:"测试公司",
            serialNumber:'27f25635111111111111111'
        });
        if(JSON.parse(result).data.success === "T") {
            alert("绑定成功");
        }
    }
    render() {
        return(
            <div className={styles.contianer}>
                <div className={styles.header}>
                    <img onClick={ev =>this.backMove(ev)} className={styles.back} src={backImg} alt=""/>
                    <div className={styles.title}>添加考勤机</div>
                </div>
                <div className={styles.content}>
                     <div className={styles.item}>
                       <div className={styles.machineNum}>考勤机编号</div>
                       <input className={styles.num} defaultValue='27f25635dsfsadfsdfasfsdfssdf'/>
                     </div>
                     <div className={styles.item}>
                       <div className={styles.companyInfo}>企业信息</div>
                       <input className={styles.company} defaultValue='南京XXXX责任有限公司'/>
                     </div>
                     <div className={styles.item}>
                       <div className={styles.superManage}>超级管理员信息</div>
                       <input className={styles.name} defaultValue='王小明'/>
                       <input className={styles.phone} defaultValue='13855667788'/>
                     </div>
                </div>
                <div className={styles.binding} onClick={ev =>this.update(ev)}>确认绑定</div>    
            </div>
        )
    }

}
export default AddAttendanceMachine;