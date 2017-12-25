import React,{Component} from 'react';
import styles from '../styles/UserCenter.css';

import headPortrait from '../asset/userCenter/headPortrait.png';
import record from '../asset/userCenter/record.png';
import remind from '../asset/userCenter/remind.png';
import revise from '../asset/userCenter/revise.png';

import attendanceRecord from '../asset/manager/attendanceRecord.png';
import administration from '../asset/manager/administration.png';
import staff from '../asset/manager/staff.png';
import release from '../asset/manager/release.png';
import setUp from '../asset/manager/setUp.png';

import person from '../asset/manager/person-1.png';
import clock from '../asset/manager/location-1.png';
import go from '../asset/manager/go.png';

class UserCenter extends Component{
    constructor() {
        super();
        this.state={}
    }
    componentDidMount() {
        document.querySelector('title').innerText = '个人中心';
    }
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <span>解绑企业</span>
                    <span>个人中心</span>
                    <span>后台登录</span>
                </div>
                <div className={styles.information}>
                    <img className={styles.informationPhoto} src={headPortrait} alt=""/>
                    <div className={styles.personalInformation}>
                        <div className={styles.name}>
                            <span>0001</span>
                            <span>王小明</span>
                            <span>(超级管理员)</span>
                        </div>
                        <div className={styles.phone}>13851712109</div>
                        <div className={styles.company}>
                            <span>南京XXXX责任有限公司</span>/
                            <span>人事部</span>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <img className={styles.itemImg}src={record} alt=""/>
                        <span className={styles.itemName}>考勤记录</span>
                        <img className={styles.itemGo} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <img className={styles.itemImg}src={remind} alt=""/>
                        <span className={styles.itemName}>打卡提醒</span>
                        <img className={styles.itemGo} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <img className={styles.itemImg}src={revise} alt=""/>
                        <span className={styles.itemName}>修改部门</span>
                        <img className={styles.itemGo} src={go} alt=""/>
                    </div>
                </div>
                <div className={styles.jurisdictionModule_1}>
                    <div className={styles.item}>
                        <img className={styles.itemImg}src={attendanceRecord} alt=""/>
                        <span className={styles.itemName}>员工考勤记录</span>
                        <img className={styles.itemGo} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <img className={styles.itemImg}src={administration} alt=""/>
                        <span className={styles.itemName}>企业管理</span>
                        <img className={styles.itemGo} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <img className={styles.itemImg}src={staff} alt=""/>
                        <span className={styles.itemName}>员工资料</span>
                        <img className={styles.itemGo} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <img className={styles.itemImg}src={release} alt=""/>
                        <span className={styles.itemName}>发布公告</span>
                        <img className={styles.itemGo} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <img className={styles.itemImg}src={setUp} alt=""/>
                        <span className={styles.itemName}>设置考勤</span>
                        <img className={styles.itemGo} src={go} alt=""/>
                    </div>      
                </div>
                <div className={styles.tabBox}>
                    <div className={styles.tab}>
                        <img className={styles.tabImg} src={clock} alt=""/>
                        <div>考勤打卡</div>
                    </div>
                    <div className={styles.tab}>
                        <img className={styles.tabImg} src={person} alt=""/>
                        <div>个人中心</div>
                    </div>
                </div>
            </div>
        ) 
    }

}
export default UserCenter;