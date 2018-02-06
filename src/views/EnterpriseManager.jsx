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
                <div onClick={ev =>parent.addOne(ev)} className={styles.determine}>确定</div>
            </div>
        )
    }
}
const TabContent = ({currentIndex,deleteSection,division,inputText,section, machineNum,parent,imgClick}) => {
    if (currentIndex === 1) {
         if(deleteSection === false) {
            return (
                <div className={styles.content}>
                    <div className={ division === true ?styles.item:styles.hideInput}>
                        <input onChange={ev =>parent.getInput(ev)} placeholder="请输入部门名称" className={styles.designation} value={inputText}/>
                        <img className={styles.forward} src={go} alt="" />
                    </div>
                    {
                        section.map((item, index) =>
                            <div className={styles.item} key={index} onClick={ev =>parent.departmentPerson(index)}>
                                <div className={styles.name}>{item.officeName}</div>
                                <img className={styles.forward} src={go} alt="" />
                            </div>
                        )
                    }
                    <BottomBar add={parent.state.selectState} parent={parent} deleteState={deleteSection}></BottomBar>
                </div>
            );
         }else{
            return (
                <div className={styles.content}>
                    {
                        section.map((item, index) =>
                            <div className={styles.deleteItem} key={index} onClick={ev =>parent.deleteClick(index)}>
                                <img className={styles.deleteImg} src={deleteImg} alt=''/>
                                <div className={styles.name}>{item.officeName}</div>
                                <img className={styles.forward} src={go} alt="" />
                            </div>
                        )
                    }
                    <BottomBar add={parent.state.selectState} parent={parent} deleteState={deleteSection}></BottomBar>
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
                <div onClick={ev => parent.scan(ev)} className={styles.addMachine}>添加考勤机</div>
            </div>
        )
    } else {
        return (
            <div className={styles.content}>
                <div className={styles.codeWrap}>
                    <div className={imgClick?styles.hideCode:styles.code}>
                        <QRCode value={parent.state.invitationCode} />
                    </div>
                    <div className={imgClick?styles.code:styles.hideCode}> 
                        <img className={styles.imgSize} src={imgClick} alt=""/>
                    </div>
                    <div className={styles.codetext}>邀请码</div>
                    <div className={styles.text}>点击右上角,分享邀请码即可让员工注册</div>
                </div>
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
            deleteSection:false,          //删除部门状态
            imgBase64:''
        }
    }
    componentDidMount() {
        // document.querySelector('title').innerText = '企业管理';
        this.getWX();
        this.selectIndex();
        this.getCompany();
        this.getOfficeList();
        this.getAttendanceMachineList();
    }
    componentWillUnmount(){
        window.sessionStorage.setItem('test',this.state.currentIndex);
    }
    selectIndex() {
        var test=window.sessionStorage.getItem('test');
        if(test){
            this.setState({currentIndex:+test})
            // this.setState({qr:window.sessionStorage.getItem('qr')})
        }else{
            this.setState({currentIndex:0})
        }
    }
    // addAttendanceMachine() {          //添加考勤机
    //     this.props.history.push('/addAttendanceMachine')
    // }
    departmentPerson(i) {
        window.officeId = this.state.section[i].officeId
        this.props.history.push('/department')
    }
    editor() {                             //删除部门页面显示
        this.setState({deleteSection:true})
    }
    addDivision() {                        //添加部门
        this.setState({inputText:''})
        this.setState({ division: true });
        this.setState({selectState:false});
    }
    cancelSelect() {                       //取消选择
        this.setState({ division: false });
        this.setState({selectState:true});
    }   
    selectTab(i) {                         //获取当前tab索引
        this.setState({ currentIndex: i });
    }
    getInput(ev) {                         //获取输入的部门
        this.setState({inputText:ev.target.value});
    }
    deleteClick(i) {                       //删除部门
        var meg = '确认删除'+ this.state.section[i].officeName + '吗？';
        if(window.confirm(meg) === true){
           this.deleteOfficce(i);
        }else{
            return null
        }
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
                // window.sessionStorage.setItem("result", result);
                // window.location.href = 'http://www.junl.cn/AttendanceFront/index.html#/backstagelogon';
            }
        });
    }
    async getWX() {                   //获取微信签名等信息
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
    addOne() {
        setTimeout(()=>this.addOrUpdateOfficce(), 0);
    }
    async addOrUpdateOfficce() {            //增加部门
        this.setState({ division: false });
        this.setState({selectState:true});
        const result = await XHR.post(API.addOrUpdateOfficce,{
            companyid:window.sessionStorage.getItem('companyid'),
            officeName:this.state.inputText
        })
        if (JSON.parse(result).success === "T") {
            this.setState({section:this.state.section});
            window.sessionStorage.setItem('test',this.state.currentIndex);
            window.location.reload();
            alert("添加部门成功");
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
    getBase64(canvas){
        if(this.state.currentIndex === 0) {
            var image = new Image();  
            image.src = canvas.toDataURL("image/png");
            this.setState({imgBase64:image.getAttribute('src')})    
        }else{
            return false;
        }
         
    }
    async getCompany() {                   //获取公司信息
        if(this.state.currentIndex === 0){
            const result = await XHR.post(API.getCompany,{companyid:window.sessionStorage.getItem('companyid')});
            const admin = 'http://www.junl.cn/AM/f/yk/api/oauthLogin.do?targetUrl={"name":"machine1","code":"' + JSON.parse(result).data.id + '"}';
            this.setState({invitationCode:admin});
            this.getBase64(document.getElementsByTagName('canvas')[0]);
        }else{
            return false
        }
       
      }

    async getOfficeList() {                //获取公司部门列表
        const result = await XHR.post(API.getOfficeList, { companyid:window.sessionStorage.getItem('companyid')});
        const dataSource = JSON.parse(result).data;
        const officeList = [];
        dataSource.forEach((item, index) =>
            officeList.push({
                officeName:dataSource[index].name,
                officeId:dataSource[index].id
            })
        )
        officeList.push({
            officeName:'其他',
            officeId:'officeid'
        })
        this.setState({ section: officeList });

    }
    async getAttendanceMachineList() {     //获取考勤机列表
        const result = await XHR.post(API.getAttendanceMachineList, { companyid:window.sessionStorage.getItem('companyid')});
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
        return (
            <div className={styles.container}>
                <div className={styles.timetable}>
                    {
                        tab.map((item, index) => <div onClick={ev => this.selectTab(index)} className={currentIndex === index ? styles.currentTab : styles.elseTab} key={index}>{item}</div>)
                    }
                </div>
                <TabContent 
                currentIndex ={currentIndex}
                deleteSection = {deleteSection}
                division = {division}
                inputText = {inputText}
                section = {section}
                machineNum ={machineNum}
                parent={this}
                imgClick={this.state.imgBase64}
                />
            </div>
        )
    }
}
export default EnterpriseManager;