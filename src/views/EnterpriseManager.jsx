//企业管理（xxx有限公司）
import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import styles from '../styles/EnterpriseManager.css';

import XHR from '../utils/request';
import API from '../api/index';

import go from '../asset/manager/go.png';
import deleteImg from '../asset/manager/delete.png';

const BottomBar = ({add,parent,deleteState}) => {           //底部选择栏组件
    if(add) {
        return(
            <div className={styles.bottomBar}>
                <div onClick={ev => parent.addDivision(ev)} className={ deleteState === true?styles.hideAdd:styles.add}>添加部门</div>
                <div onClick={ev =>parent.editor(ev)} className={styles.editor}>编辑</div>
            </div>
        )
    }else{
        return(
            <div className={styles.bottomBar}>
                <div onClick={ev =>parent.cancelSelect(ev)} className={styles.cancel}>取消</div>
                <div onClick={ev =>parent.addOrUpdateOfficce(ev)} className={styles.determine}>确定</div>
            </div>
        )
    }
}

class EnterpriseManager extends Component {
    constructor() {
        super();
        this.state = {
            selectState:true,            //底部栏展示
            invitationCode:'0',          //邀请码
            currentIndex: 0,             //切换tab的index
            division: false,             //添加部门输入框状态
            section: [],                 //部门列表
            machineNum: [],              //考勤机列表
            inputText:'',                //部门名称
            deleteSection:false          //删除部门状态
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
    editor() {
        this.setState({deleteSection:true})
    }
    addDivision() {         //添加部门
        this.setState({inputText:''})
        this.setState({ division: true });
        this.setState({selectState:false});
    }
    cancelSelect() {        //取消选择
        this.setState({ division: false });
        this.setState({selectState:true});
    }   
    selectTab(i) {                         //获取当前tab索引
        this.setState({ currentIndex: i });
    }
    getInput(ev) {                         //获取输入的部门
        this.setState({inputText:ev.target.value});
    }
    deleteClick(i) {
        var meg = '确认删除'+ this.state.section[i].officeName + '吗？';
        if(window.confirm(meg) === true){
           this.deleteOfficce(i);
        }else{
            return null
        }
    }
    async addOrUpdateOfficce() {            //增加部门
        this.setState({ division: false });
        this.setState({selectState:true});
        this.setState({section:this.state.section});
        const result = await XHR.post(API.addOrUpdateOfficce,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            officeName:this.state.inputText,
        })
        if (JSON.parse(result).success === "T") {
            alert("添加部门成功")
        }else{
            alert(JSON.parse(result).msg);
        }
    }
    async deleteOfficce(i) {              //删除部门
        const Id = this.state.section[i].officeId;
        const result = await XHR.post(API.deleteOfficce,{officeid:Id});
        if(JSON.parse(result).success === 'T') {
            this.state.section.splice(i,1);
            this.setState({section:this.state.section});
            this.setState({deleteSection:false});
        }else{
            alert(JSON.parse(result).msg)
        }
    }
    async getCompany() {                   //获取公司信息
        const result = await XHR.post(API.getCompany, { companyid: "4a44b823fa0b4fb2aa299e55584bca6d" });
        this.setState({ invitationCode: JSON.parse(result).data.invitationCode })

    }
    async getOfficeList() {                //获取公司部门列表
        const result = await XHR.post(API.getOfficeList, { companyid: "4a44b823fa0b4fb2aa299e55584bca6d" });
        const dataSource = JSON.parse(result).data;
        const officeList = [];
        dataSource.forEach((item, index) =>
            officeList.push({
                officeName:dataSource[index].name,
                officeId:dataSource[index].id
            })
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
        const { section, machineNum, division,currentIndex,inputText,deleteSection} = this.state;
        const tab = ['邀请码', '部门管理', '考勤机编号']
        const TabContent = props => {
            if (currentIndex === 1) {
                 if(deleteSection === false) {
                    return (
                        <div className={styles.content}>
                            <div className={ division === true ?styles.item:styles.hideInput}>
                                <input onChange={ev =>this.getInput(ev)} placeholder="请输入部门名称" className={styles.designation} value={inputText}/>
                                <img className={styles.forward} src={go} alt="" />
                            </div>
                            {
                                section.map((item, index) =>
                                    <div className={styles.item} key={index}>
                                        <div className={styles.name}>{item.officeName}</div>
                                        <img className={styles.forward} src={go} alt="" />
                                    </div>
                                )
                            }
                            <BottomBar add={this.state.selectState} parent={this} deleteState={deleteSection}></BottomBar>
                        </div>
                    );
                 }else{
                    return (
                        <div className={styles.content}>
                            {
                                section.map((item, index) =>
                                    <div className={styles.deleteItem} key={index} onClick={ev =>this.deleteClick(index)}>
                                        <img className={styles.deleteImg} src={deleteImg} alt=''/>
                                        <div className={styles.name}>{item.officeName}</div>
                                        <img className={styles.forward} src={go} alt="" />
                                    </div>
                                )
                            }
                            <BottomBar add={this.state.selectState} parent={this} deleteState={deleteSection}></BottomBar>
                        </div>
                    ); 
                 }
            } else if (currentIndex === 2) {
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