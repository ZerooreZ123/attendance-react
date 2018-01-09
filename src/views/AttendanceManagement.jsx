//考勤管理（超级管理）
import React,{Component} from 'react';
import styles from '../styles/AttendanceManagement.css';

import XHR from '../utils/request';
import API from '../api/index';

import backImg from '../asset/ico/back.png';
import icon from '../asset/ico/icon.png';
import top from '../asset/manager/triangle-top.png';
import check from '../asset/manager/Check.png';
import nocheck from '../asset/manager/noCheck.png';
import choose from '../asset/manager/choose.png';
import nochoose from '../asset/manager/noChoose.png';

const SelectBtn = (props) => {
    if (props.checked === true) {
      return <img className={styles.choose} src={choose} alt="" />;
    } else {
      return <img className={styles.nochoose} src={nochoose} alt="" />;
    }
}
const CheckBtn = (props) => {
    if (props.checked === true) {
      return <img src={check} alt="" />;
    } else {
      return <img src={nocheck} alt="" />;
    }
}
const Icon = (props) => {
    if (props.checked === true) {
      return <img className={styles.icon} src={top} alt=""/>;
    } else {
      return <img className={styles.icon} src={icon} alt=""/>;
    }
}

class AttendanceManagement extends Component{

    constructor() {
        super();
        this.state = {
            status:[],            //勾选状态
            custom:true,
            data:[],
            forenoonLatest:'',
            afternoonFirst:''
            // forenoonStartTime:'',
            // forenoonEndTime:'',
            // afternoonStartTime:'',
            // afternoonEndTime:''
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '考勤管理';
        this.getAttendanceManagement();
    }
    backMove() {                //返回上一页面
        window.history.go(-1);
    }
    checkBtn(i) {               //勾选或取消
        this.state.status[i] = !this.state.status[i];
        this.setState({status:this.state.status});
    }
    async getAttendanceManagement() {       //公司考勤时间配置及数据渲染
        const result = await XHR.post(API.getAttendanceManagement,{companyid:"4a44b823fa0b4fb2aa299e55584bca6d"});
        const dataSource = JSON.parse(result).data[0];
        this.setState({data:dataSource});
        this.setState({forenoonLatest:dataSource.forenoonLatest});           //上午最迟时间
        this.setState({afternoonFirst:dataSource.afternoonFirst});           //下午最早时间
        // this.setState({forenoonStartTime:dataSource.forenoonStartTime});     //上午开始时间
        // this.setState({forenoonEndTime:dataSource.forenoonEndTime});         //上午结束时间
        // this.setState({afternoonStartTime:dataSource.afternoonStartTime});   //下午开始时间
        // this.setState({afternoonEndTime:dataSource.afternoonEndTime});       //下午结束时间
        const Num = [1,2,3,4,5,6,7];                                         //一周时间
        const weekDay = JSON.parse(result).data[0].workingTime.split(',');   //初始勾选日期
        const weekDayNum =[];                                     //初始勾选日期类型转换
        const weekSelect = [];                                    //勾选日期state
        weekDay.forEach(ev  =>weekDayNum.push(parseInt(ev))); 
        weekDayNum.forEach((ev,index) =>{
            if(Num.indexOf(ev) > -1){
               weekSelect[Num.indexOf(ev)] = true;
               this.setState({status:weekSelect});
            }
        })
    }
    async attendanceManagement() {        //公司考勤时间设置
        const result = await XHR.post(API.attendanceManagement,{
            companyid:this.state.data.companyid,
            forenoonLatest:"09:00:00",
            forenoonStartTime:"08:00:00",
            // forenoonEndTime:"09:00:00",
            // afternoonFirst:"18:00:00",
            // afternoonStartTime:"17:00:00",
            // afternoonEndTime:"18:00:00",
            workingTime:"1,2,3,4,5",
            id: this.state.data.id
        })
    }
    render() {
        const {custom,status,forenoonLatest,afternoonFirst} = this.state;
        const week = ['周一','周二','周三','周四','周五','周六','周日'];
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <img onClick={ev =>this.backMove(ev)} className={styles.back} src={backImg} alt=""/>
                    <div className={styles.title}>考勤管理</div>
                </div> 
                <div className={styles.content}>
                     <div className={styles.clockTime}>
                         <div className={styles.clock}>打卡时间</div>
                         <div className={styles.time}>
                             <div>上午</div>
                             <div>{forenoonLatest}<Icon checked={false}/></div>
                         </div>
                         <div className={styles.time}>
                             <div>下午</div>
                             <div>{afternoonFirst}<Icon checked={false}/></div>
                         </div>
                     </div>
                     
                     <div className={styles.workTime}>
                         <div className={styles.work}>工作时间</div>
                         <div onClick={ev =>this.selectBtn()} className={styles.custom}><SelectBtn checked={custom}/>自定义</div>
                         <div className={styles.week}>
                            {
                                    week.map((item,index) =>
                                      <div onClick={ev =>this.checkBtn(index)} className={styles.item} key={index}><CheckBtn checked={status[index]}/>{item}</div>
                                )
                            }
                         </div>
                     </div>
                </div> 
                <div onClick={ev =>this.attendanceManagement(ev)} className={styles.determine}>确认</div> 
            </div>
        )
    }
    
}

export default AttendanceManagement;