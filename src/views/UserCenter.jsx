import React,{Component} from 'react';
import styles from '../styles/UserCenter.css';

import XHR from '../utils/request';
import API from '../api/index';

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
import scan from '../asset/manager/scan.png';


class UserCenter extends Component{
    constructor() {
        super();
        this.state={
            roleid:'',
            dataSource:{}
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '个人中心';
        this.getUser();
    }
    punchClock() {
        this.props.history.push('/punchClock');
    }
    attendanceData() {
        this.props.history.push('/attendanceData')
    }
    moveToUser(i){                   //一般用户选项跳转
        const userUrl = ['/attendanceRecord','/cardReminding','/revisionDepartment'];
        this.props.history.push(userUrl[i]);
    }
    moveToOrdinary(i){               //普通管理员选项跳转
        const ordinaryUrl = ['/attendanceData','/ordinaryEnterorise','/employeeInformation','/releaseAnnouncement']
        this.props.history.push(ordinaryUrl[i]);
    }
    moveToSuper(i) {                 //超级管理员选项跳转
        const superUrl = ['/attendanceData','/enterpriseManager','/employeeInformation','/releaseAnnouncement','/attendanceManagement']
        this.props.history.push(superUrl[i]);
    }
    scan() {                         //扫一扫
        window.wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
        });
    }
    unbindUser() {                  //解绑员工二次确认
        let mes = "解绑后您的资料与考勤数据将消失,确认解绑吗？";
        if(window.confirm(mes) === true) {
            this.unbind() 
        }else{
          return false
        }
    }
    async unbind() {                //解绑员工   
        const result = await XHR.post(API.unbindUser,{loginName:"18550117460"});
        if(JSON.parse(result).success === 'T') {
            alert('解绑成功');
        }else{
            alert('解绑失败');
        }
    }
    async getUser() {              //获取用户信息
        const result = await XHR.post(API.getUser,{loginName:"18550117460"});
        this.setState({ dataSource: JSON.parse(result).data });
        this.setState({roleid:JSON.parse(result).data.roleid});
    }
    render() {

        const {roleid,dataSource} = this.state;
        const user = [{icon:record,name:'考勤记录'},{icon:remind,name:'打卡提醒'},{icon:revise,name:'修改部门'}];
        const superMan = [{icon:attendanceRecord,name:'员工考勤记录'},{icon:administration,name:'企业管理'},{icon:staff,name:'员工资料'},{icon:release,name:'发布公告'},{icon:setUp,name:'设置考勤'}];
        const ordinary = [{icon:attendanceRecord,name:'员工考勤记录'},{icon:administration,name:'企业管理'},{icon:staff,name:'员工资料'},{icon:release,name:'发布公告'}];
        const Header = props =>{
            if(roleid === '2'||roleid === '3'){
                return (
                    <div className={styles.header}>
                        <div onClick={ev =>this.scan(ev)} className={styles.scanBox}><img className={styles.scanImg} src={scan} alt=''/><span className={styles.scanText}>后台登录</span></div>
                        <div onClick={ev =>this.unbindUser(ev)}>解绑企业</div>
                    </div>
                )
            }else{
                return (
                    <div className={styles.Userheader}>
                        <div onClick={ev =>this.unbindUser(ev)}>解绑企业</div>
                    </div>
                )
            }
        }
        const Module = props => {
            if ( roleid === '2') {                //超级管理员
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
            } else if(roleid === '3'){           //普通管理员
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
            }else{                              //一般用户
              return null
            }
        }

        return(
            <div className={styles.container}>
                <Header></Header>
                <div className={styles.information}>
                    <img className={styles.informationPhoto} src={headPortrait} alt=""/>
                    <div className={styles.personalInformation}>
                        <div className={styles.name}>
                            <span>0001</span>
                            <span>{dataSource.name}</span>
                            <span>({dataSource.roleNames})</span>
                        </div>
                        <div className={styles.phone}>{dataSource.loginName}</div>
                        <div className={styles.company}>
                            <span>{dataSource.companyName}</span>/
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