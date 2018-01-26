import React, { Component } from 'react';
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
import delete_1 from '../asset/ico/close.png';
import person1 from '../asset/punchClock/person-2.png';
import clock2 from '../asset/punchClock/loction-2.png';
import notice from '../asset/punchClock/notice.png';
import warn from '../asset/punchClock/abnormal.png';
import load from '../asset/punchClock/load.png';
import successMin from '../asset/punchClock/successMin.png';
import success from '../asset/punchClock/success.png';

const Notice = ({ noticeState, parent, title }) => {   //打卡顶部通告
    if (noticeState) {
        return (
            <div className={styles.noticeBoard}>
                <img className={styles.noticeImg} src={notice} alt="" />
                <span onClick={ev => parent.AnnouncementDetails(ev)} className={styles.noticeText}>{title}</span>
                <img onClick={ev => parent.noteceDelete(ev)} className={styles.noteceDelete} src={delete_1} alt="" />
            </div>
        )
    } else {
        return null
    }
}
const Header = ({roleid,parent})=> {           //个人中心头部
    if (roleid === '2' || roleid === '3') {
        return (
            <div className={styles.header}>
                <div onClick={ev => parent.scan(ev)} className={styles.scanBox}><img className={styles.scanImg} src={scan} alt='' /><span className={styles.scanText}>后台登录</span></div>
                <div onClick={ev => parent.unbindUser(ev)}>解绑企业</div>
            </div>
        )
    } else {
        return (
            <div className={styles.Userheader}>
                <div onClick={ev => parent.unbindUser(ev)}>解绑企业</div>
            </div>
        )
    }
}

const Module=({roleid,superMan,ordinary,parent})=> {   //个人中心不同权限展示模块
    if (roleid === '2') {                //超级管理员
        return (
            <div className={styles.jurisdictionModule_1}>
                {
                    superMan.map((ev, index) =>
                        <div className={styles.item} key={index} onClick={ev => parent.moveToSuper(index)}>
                            <img className={styles.itemImg} src={ev.icon} alt="" />
                            <span className={styles.itemName}>{ev.name}</span>
                            <img className={styles.itemGo} src={go} alt="" />
                        </div>

                    )
                }
            </div>
        );
    } else if (roleid === '3') {           //普通管理员
        return (
            <div className={styles.jurisdictionModule_1}>
                {
                    ordinary.map((ev, index) =>
                        <div className={styles.item} key={index} onClick={ev => parent.moveToOrdinary(index)}>
                            <img className={styles.itemImg} src={ev.icon} alt="" />
                            <span className={styles.itemName}>{ev.name}</span>
                            <img className={styles.itemGo} src={go} alt="" />
                        </div>

                    )
                }
            </div>
        );
    } else {                              //一般用户
        return null
    }
}

const ClockPage = ({prompt,parent,h,m,s}) => {
    if (prompt === 0) {            //搜索中
        return (
        <div className={styles.content}>
            <div className={styles.clickClock}>
            <div className={styles.ring}></div>
            <div className={styles.clickButton}>
                <div className={styles.clockOn}>打卡</div>
                <div className={styles.clockDate}>{h}:{m}:{s}</div>
            </div>
            </div>
            <div className={styles.prompt}>
            <img className={styles.promptImg} src={load} alt="" /><span className={styles.text}>正在搜索考勤机...</span>
            </div>
            <div className={styles.refreshHide}>刷新页面</div>
            <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
        </div>
        )
    } else if (prompt === 1) {      //可打卡
        return (
        <div className={styles.content}>
            <div className={styles.clickClock}>
            <div className={styles.circular}></div>
            <div onClick={ev => parent.clockIn(ev)} className={styles.clickButton}>
                <div className={styles.clockCan}>打卡</div>
                <div className={styles.clockDate}>{h}:{m}:{s}</div>
            </div>
            </div>
            <div className={styles.prompt}>可以打卡了</div>
            <div className={styles.refreshHide}>刷新页面</div>
            <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
        </div>
        )
    } else if (prompt === 2) {     //打卡异常
        return (
        <div className={styles.content}>
            <div className={styles.clickClock}>
            <div className={styles.circular}></div>
            <div className={styles.clickButton}>
                <div className={styles.clockOn}>打卡</div>
                <div className={styles.clockDate}>{h}:{m}:{s}</div>
            </div>
            </div>
            <div className={styles.prompt}>
            <img className={styles.promptImg} src={warn} alt="" /><span className={styles.text}>网络连接异常,蓝牙未打开</span>
            </div>
            <div onClick={ev => parent.refresh(ev)} className={styles.refreshShow}>刷新页面</div>
            <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
        </div>
        )
    } else {                      //打卡成功
        return (
        <div className={styles.content}>
            <div className={styles.clickClock}>
            <img className={styles.cardFinish} src={success} alt="" />
            <div className={styles.cardTime}>
                <div className={styles.clockDate}>{h}:{m}:{s}</div>
            </div>
            </div>
            <div className={styles.prompt}>
            <img className={styles.promptImg} src={successMin} alt="" /><span className={styles.text}>打卡成功!</span>
            </div>
            <div className={styles.refreshHide}>刷新页面</div>
            <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
        </div>
        )
    }
}

class UserCenter extends Component {
    constructor() {
        super();
        window.temp = {};
        this.state = {
            showUserCenter:true,   //展示模块1
            showPunchClock:false,  //展示模块2
            companyid: '',         //公司Id
            roleid: '',            //用户权限
            dataSource: {},        //用户信息
            result: {},            //签名内容
            prompt: 1,            //考勤机状态
            noticeState: true,    //通知显示
            noticeTitle: '',       //公告标题
            normalDay: ''
        }
    }
    componentDidMount() {
        // document.querySelector('title').innerText = '个人中心';
        this.getUser();
        this.getWX();
        // this.searchIbeacons();
        this.showTime();
        // this.getNewNotice();
    }
    AnnouncementDetails(ev) {         //切换至公告详情
        ev.stopPropagation();
        this.props.history.push('/AnnouncementDetails');
    }
    showTime() {                      //刷新当前时间/1秒
        setInterval(ev => this.getTime(ev), 1000)
    }
    hideMask() {
        this.setState({ mask: false }); //隐藏
    }
    showMask() {
        this.setState({ mask: true });  //显示
        this.rankingList();
    }
    refresh() {                       //刷新页面
        this.setState({ prompt: 0 })
    }
    noteceDelete() {                  //删除通知
        this.setState({ noticeState: false });
    }
    getTime() {                       //获取当前时/分/秒/月/日/星期
        var data = new Date();
        this.setState({ h: data.getHours() < 10 ? '0' + data.getHours() : data.getHours() });
        this.setState({ m: data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes() });
        this.setState({ s: data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds() });
    }
    async getNewNotice() {
        const result = await XHR.post(API.getNewNotice, { companyid: window.sessionStorage.getItem('companyid') });
        if (JSON.parse(result).data) {
            this.setState({ noticeTitle: JSON.parse(result).data.title });
            window.sessionStorage.setItem('listId',JSON.parse(result).data.id)
        } else {
            this.setState({ noticeState: false })
            return false;
        }

    }
    async clockIn() {                //员工打卡
        const result = await XHR.post(API.clockIn, { loginName: this.props.match.params.loginName });
        if (JSON.parse(result).success === "T") {
            this.setState({ prompt: 3 })
        } else {
            this.setState({ prompt: 2 })
        }
    }


    punchClock() {
        this.setState({showUserCenter:false});
        this.setState({showPunchClock:true});
    }
    personCenter() {
        this.setState({showUserCenter:true});
        this.setState({showPunchClock:false});
    }
    attendanceData() {
        this.props.history.push('/attendanceData')
    }
    moveToUser(i) {                   //一般用户选项跳转
        this.getOfficeList();
        const userUrl = ['/attendanceRecord', '/cardReminding', '/revisionDepartment'];
        this.props.history.push(userUrl[i]);
    }
    moveToOrdinary(i) {               //普通管理员选项跳转
        this.getOfficeList();
        const ordinaryUrl = ['/attendanceData', '/ordinaryEnterorise', '/employeeInformation', '/releaseAnnouncement']
        this.props.history.push(ordinaryUrl[i]);
    }
    moveToSuper(i) {                 //超级管理员选项跳转
        this.getOfficeList();
        const superUrl = ['/attendanceData', '/enterpriseManager', '/employeeInformation', '/releaseAnnouncement', '/attendanceManagement']
        this.props.history.push(superUrl[i]);
    }
    scan() {                         //扫一扫
        window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx361547ce36eb2185', // 必填，公众号的唯一标识
            timestamp: this.state.result.timestamp, // 必填，生成签名的时间戳
            nonceStr: this.state.result.nonceStr, // 必填，生成签名的随机串
            signature: this.state.result.signature,// 必填，签名
            jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
        });
        window.wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结
                window.sessionStorage.setItem("result", result);
                window.location.href = 'http://www.junl.cn/AttendanceFront/index.html#/backstagelogon';
            }
        });
    }
    // async searchIbeacons() {
    //     const result = await XHR.post(API.getSignature);
    //     if(JSON.parse(result).success === 'T') {
    //       this.setState({
    //          result:{
    //             timestamp:JSON.parse(result).data.timestamp,
    //             nonceStr:JSON.parse(result).data.noncestr,
    //             signature:JSON.parse(result).data.signature
    //          }  
    //       })
    //     };
    //     window.wx.config({
    //         debug:true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: 'wx361547ce36eb2185', // 必填，公众号的唯一标识
    //         timestamp:this.state.result.timestamp, // 必填，生成签名的时间戳
    //         nonceStr:this.state.result.nonceStr, // 必填，生成签名的随机串
    //         signature:this.state.result.signature,// 必填，签名
    //         // jsApiList: ['startSearchBeacons','onSearchBeacons']
    //         jsApiList: ['startMonitoringBeacons','stopMonitoringBeacons'] // 必填，需要使用的JS接口列表
    //       });
    //     window.wx.ready(function() {
    //         alert("1")
    //         window.wx.startSearchBeacons({
    //             ticket: "",
    //             complete: function (argv) {
    //                   //开启查找完成后的回调函数
    //                   alert("2")

    //                 // 监听iBeacon信号
    //                   window.wx.onSearchBeacons({
    //                       complete:function(argv){
    //                           alert('3')
    //                       //回调函数，可以数组形式取得该商家注册的在周边的相关设备列表
    //                         //  console.log(argv);
    //                       }
    //                     });
    //             }
    //           });

    //     })
    // }   
    unbindUser() {                  //解绑员工二次确认
        let mes = "解绑后您的资料与考勤数据将消失,确认解绑吗？";
        if (window.confirm(mes) === true) {
            this.unbind()
        } else {
            return false
        }
    }
    async getWX() {
        const result = await XHR.post(API.getSignature);
        if (JSON.parse(result).success === 'T') {
            this.setState({
                result: {
                    timestamp: JSON.parse(result).data.timestamp,
                    nonceStr: JSON.parse(result).data.noncestr,
                    signature: JSON.parse(result).data.signature
                }
            })
        }
    }
    async getOfficeList() {          //部门列表
        const result = await XHR.post(API.getOfficeList, { companyid: this.state.companyid });
        const sectionList = [];
        JSON.parse(result).data.forEach((item, index) => {
            sectionList.push({
                name: item.name,
                id: item.id
            })
        });
        window.sessionStorage.setItem("officeList", JSON.stringify(sectionList));
    }
    async unbind() {                //解绑员工   
        const result = await XHR.post(API.unbindUser, { loginName: this.props.match.params.loginName });
        if (JSON.parse(result).success === 'T') {
            alert('解绑成功');
        } else {
            alert('解绑失败');
        }
    }
    async getUser() {              //获取用户信息
        const result = await XHR.post(API.getUser, { loginName: this.props.match.params.loginName });
        this.setState({ dataSource: JSON.parse(result).data });
        this.setState({ roleid: JSON.parse(result).data.roleid });
        this.setState({ companyid: JSON.parse(result).data.companyid })
        window.temp = {
            name: JSON.parse(result).data.name,
            officeName: JSON.parse(result).data.officeName
        }
        window.sessionStorage.setItem('loginName', this.props.match.params.loginName);
        window.sessionStorage.setItem('companyid', JSON.parse(result).data.companyid);
        window.sessionStorage.setItem('id', JSON.parse(result).data.id);
    }
    render() {

        const { roleid, dataSource,prompt, h, m, s, noticeState,noticeTitle,showUserCenter,showPunchClock} = this.state;
        const user = [{ icon: record, name: '考勤记录' }, { icon: remind, name: '打卡提醒' }, { icon: revise, name: '修改部门' }];
        const superMan = [{ icon: attendanceRecord, name: '员工考勤记录' }, { icon: administration, name: '企业管理' }, { icon: staff, name: '员工资料' }, { icon: release, name: '发布公告' }, { icon: setUp, name: '设置考勤' }];
        const ordinary = [{ icon: attendanceRecord, name: '员工考勤记录' }, { icon: administration, name: '企业管理' }, { icon: staff, name: '员工资料' }, { icon: release, name: '发布公告' }];
        return (
            <div className={showUserCenter === true ?styles.container:styles.container1}>
                <div>
                    <div className={showUserCenter === true ? styles.moduleShow:styles.moduleHide}>
                        <Header roleid = {roleid} parent ={this}></Header>
                        <div className={styles.information}>
                            <img className={styles.informationPhoto} src={headPortrait} alt="" />
                            <div className={styles.personalInformation}>
                                <div className={styles.name}>
                                    <span>{dataSource.name}</span>
                                    <span>({dataSource.roleNames})</span>
                                </div>
                                <div className={styles.phone}>{dataSource.phone}</div>
                                <div className={styles.company}>
                                    <span>{dataSource.companyName}</span>/
                                    <span>{dataSource.officeName}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.content}>
                            {
                                user.map((ev, index) =>
                                    <div className={styles.item} key={index} onClick={ev => this.moveToUser(index)}>
                                        <img className={styles.itemImg} src={ev.icon} alt="" />
                                        <span className={styles.itemName}>{ev.name}</span>
                                        <img className={styles.itemGo} src={go} alt="" />
                                    </div>
                                )
                            }
                        </div>
                        <Module roleid ={roleid} superMan ={superMan} ordinary ={ordinary} parent ={this}></Module>
                    </div>
                    <div className={showPunchClock === true ? styles.moduleShow:styles.moduleHide}>
                        <Notice noticeState={noticeState} parent={this} title={noticeTitle}></Notice>
                        <ClockPage prompt={prompt} parent={this} h={h} m ={m}s ={s}></ClockPage>
                    </div>
                </div>
                <div style={{'height':40,'paddingTop':6,'paddingBottom':4}} className={styles.tabBox}>
                    <div style={{'height':40}}  className={styles.tab} onClick={ev => this.punchClock(ev)}>
                        <img style={{'height':22,'width':22}} className={styles.tabImg} src={ showPunchClock === true ? clock2 :clock} alt="" />
                        <div style={{'fontSize':12,'height':14,'lineHight':14}} className={styles.tabText}>考勤打卡</div>
                    </div>
                    <div style={{'height':40}} className={styles.tab} onClick={ev =>this.personCenter(ev)}>
                        <img style={{'height':22,'width':22}} className={styles.tabImg} src={ showUserCenter === true? person:person1} alt="" />
                        <div style={{'fontSize':12,'height':14,'lineHight':14}} className={styles.tabText}>个人中心</div>
                    </div>
                </div>
            </div>
        )
    }

}
export default UserCenter;