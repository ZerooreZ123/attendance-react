//企业管理（xxx有限公司）
import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import styles from '../styles/EnterpriseManager.css';

import XHR from '../utils/request';
import API from '../api/index';

import go from '../asset/manager/go.png';

const BottomBar = ({add,parent}) => {           //底部选择栏组件
    if(add) {
        return(
            <div className={styles.bottomBar}>
                <div onClick={ev => parent.addDivision(ev)} className={styles.add}>添加部门</div>
                <div className={styles.editor}>编辑</div>
            </div>
        )
    }else{
        return(
            <div className={styles.bottomBar}>
                <div onClick={ev =>parent.cancelSelect(ev)} className={styles.cancel}>取消</div>
                <div onClick={ev =>parent.confirmSelect(ev)} className={styles.determine}>确定</div>
            </div>
        )
    }
}

class EnterpriseManager extends Component {
    constructor() {
        super();
        this.state = {
            selectState:true,           //底部栏展示
            invitationCode: '',
            currentIndex: 0,             //切换tab的index
            division: false,
            section: [],                 //部门列表
            machineNum: [],              //考勤机列表
            companyInfo: {},             //公司名称及邀请码
            inputText:''                 //部门名称
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '企业管理';
        this.getCompany();
        this.getOfficeList();
        this.getAttendanceMachineList();
    }
    addAttendanceMachine() {
        this.props.history.push('/addAttendanceMachine')
    }
    addDivision() {        //添加部门
        this.setState({ division: true });
        this.setState({selectState:false});
    }
    cancelSelect() {        //取消选择
        this.setState({ division: false });
        this.setState({selectState:true});
    }
    confirmSelect(ev) {       //确认选择
        this.setState({ division: false });
        this.setState({selectState:true});
        this.state.section.unshift(this.state.inputText);
        this.setState({section:this.state.section});

    }          
    selectTab(i) {                         //获取当前tab索引
        this.setState({ currentIndex: i });
    }
    getInput(ev) {
        this.setState({inputText:ev.target.value})
    }
    async getCompany() {                   //获取公司信息
        const result = await XHR.post(API.getCompany, { companyid: "4a44b823fa0b4fb2aa299e55584bca6d" });
        this.setState({ companyInfo: JSON.parse(result).data })
        this.setState({ invitationCode: JSON.parse(result).data.invitationCode })

    }
    async getOfficeList() {                //获取公司部门列表
        const result = await XHR.post(API.getOfficeList, { companyid: "4a44b823fa0b4fb2aa299e55584bca6d" });
        const dataSource = JSON.parse(result).data;
        const officeList = [];
        dataSource.forEach((item, index) =>
            officeList.push(dataSource[index].name)
        )
        this.setState({ section: officeList });

    }
    async getAttendanceMachineList() {     //获取考勤机列表
        const result = await XHR.post(API.getAttendanceMachineList, { companyid: "4a44b823fa0b4fb2aa299e55584bca6d" });
        const dataSource = JSON.parse(result).data;
        const machineList = [];
        dataSource.forEach((item, index) =>
            machineList.push(dataSource[index].id)
        )
        this.setState({ machineNum: machineList });
    }
    render() {
        const { section, machineNum, division, companyInfo, currentIndex ,inputText} = this.state;
        const tab = ['邀请码', '部门管理', '考勤机编号']
        const Adddivision = props => {
            if (division) {
                return (
                    <div className={styles.item}>
                        <input onChange={ev =>this.getInput(ev)} placeholder="请输入部门名称" className={styles.designation} value={inputText} />
                        <img className={styles.forward} src={go} alt="" />
                    </div>
                )
            } else {
                return false;
            }
        }
        const TabContent = props => {
            if (this.state.currentIndex === 1) {
                return (
                    <div className={styles.content}>
                        <Adddivision></Adddivision>
                        {
                            section.map((item, index) =>
                                <div className={styles.item} key={index}>
                                    <div className={styles.name}>{item}</div>
                                    <img className={styles.forward} src={go} alt="" />
                                </div>
                            )
                        }
                        <BottomBar add={this.state.selectState} parent={this}></BottomBar>
                    </div>
                );
            } else if (this.state.currentIndex === 2) {
                return (
                    <div className={styles.content}>
                        {
                            machineNum.map((item, index) =>
                                <div className={styles.item} key={index}>
                                    <div className={styles.name}>考勤机{index + 1}: {item}</div>
                                </div>
                            )
                        }
                        <div onClick={ev => this.addAttendanceMachine(ev)} className={styles.addMachine}>添加考勤机</div>
                    </div>
                )
            } else {
                return (
                    <div className={styles.content}>
                        <div className={styles.codeWrap}>
                            <div className={styles.code}>
                                <QRCode value={this.state.invitationCode} />
                            </div>
                            <div className={styles.codetext}>邀请码</div>
                            <div className={styles.text}>点击右上角,分享邀请码即可让员工注册</div>
                        </div>
                    </div>
                )

            }
        }
        return (
            <div className={styles.container}>
                <div className={styles.timetable}>
                    {
                        tab.map((item, index) => <div onClick={ev => this.selectTab(index)} className={currentIndex === index ? styles.currentTab : styles.elseTab} key={index}>{item}</div>)
                    }
                </div>
                <TabContent></TabContent>
            </div>
        )
    }
}
export default EnterpriseManager;