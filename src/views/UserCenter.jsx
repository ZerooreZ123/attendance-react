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
import clock from '../asset/manager/location-2.png';
import go from '../asset/manager/go.png';

class UserCenter extends Component{
    constructor() {
        super();
        this.state={
            userId:'superManagement',
            user:[
                {icon:record,name:'考勤记录'},
                {icon:remind,name:'打卡提醒'},
                {icon:revise,name:'修改部门'},
            ],
            superMan:[
                {icon:attendanceRecord,name:'员工考勤记录'},
                {icon:administration,name:'企业管理'},
                {icon:staff,name:'员工资料'},
                {icon:release,name:'发布公告'},
                {icon:setUp,name:'设置考勤'}
            ],
            ordinary:[
                {icon:attendanceRecord,name:'员工考勤记录'},
                {icon:administration,name:'企业管理'},
                {icon:staff,name:'员工资料'},
                {icon:release,name:'发布公告'}
            ],
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '个人中心';
    }
    punchClock() {
        this.props.history.push('/punchClock');
    }
    attendanceData() {
        this.props.history.push('/attendanceData')
    }
    moveToUser(i){
        const userUrl = ['/attendanceRecord','/cardReminding','/revisionDepartment'];
        this.props.history.push(userUrl[i]);
    }
    moveToOrdinary(i){
        const ordinaryUrl = ['/attendanceData','/ordinaryEnterorise','/employeeInformation','/releaseAnnouncement']
        this.props.history.push(ordinaryUrl[i]);
    }
    moveToSuper(i) {
        const superUrl = ['/attendanceData','/enterpriseManager','/employeeInformation','/releaseAnnouncement','/attendanceManagement']
        this.props.history.push(superUrl[i]);
    }
    render() {

        const {userId,superMan,ordinary,user} = this.state;
        
        const Module = props => {
            if ( userId === 'superManagement') {
              return (
                <div className={styles.jurisdictionModule_1}>
                    {
                        superMan.map((ev,index) =>
                        <div className={styles.item} key={index} onClick={ev =>this.moveToSuper(index)}>
                            <img className={styles.itemImg}src={ev.icon} alt=""/>
                            <span className={styles.itemName}>{ev.name}</span>
                            <img className={styles.itemGo} src={go} alt=""/>
                        </div>

                         )
                    }
                </div>    
              );
            } else if(userId === 'ordinaryManagement'){
              return (
                <div className={styles.jurisdictionModule_1}>
                    {
                        ordinary.map((ev,index) =>
                        <div className={styles.item} key={index} onClick={ev =>this.moveToOrdinary(index)}>
                            <img className={styles.itemImg}src={ev.icon} alt=""/>
                            <span className={styles.itemName}>{ev.name}</span>
                            <img className={styles.itemGo} src={go} alt=""/>
                        </div>

                         )
                    }
                </div>    
              );
            }else{
              return null
            }
        }

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
                    {
                        user.map((ev,index) =>
                        <div className={styles.item} key={index} onClick={ev =>this.moveToUser(index)}>
                            <img className={styles.itemImg}src={ev.icon} alt=""/>
                            <span className={styles.itemName}>{ev.name}</span>
                            <img className={styles.itemGo} src={go} alt=""/>
                        </div>
                       )
                    }
                </div>
                <Module></Module>
                <div className={styles.tabBox}>
                    <div className={styles.tab} onClick={ev =>this.punchClock(ev)}>
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