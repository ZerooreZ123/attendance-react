//考勤管理（超级管理）
import React, { Component } from 'react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

import styles from '../styles/AttendanceManagement.css';

import XHR from '../utils/request';
import API from '../api/index';

import icon from '../asset/ico/icon.png';
import top from '../asset/manager/triangle-top.png';
import check from '../asset/manager/Check.png';
import nocheck from '../asset/manager/noCheck.png';


const CheckBtn = (props) => {
    if (props.checked === true) {
        return <img src={check} alt="" />;
    } else {
        return <img src={nocheck} alt="" />;
    }
}
const Icon = (props) => {
    if (props.checked === true) {
        return <img className={styles.icon} src={top} alt="" />;
    } else {
        return <img className={styles.icon} src={icon} alt="" />;
    }
}
class AttendanceManagement extends Component {

    constructor() {
        super();
        window.temp = {};
        this.state = {
            value: moment(),
            status: [],            //勾选状态
            data: [],              //初始数据
            now: moment().hour(0).minute(0),
            now1: moment().hour(0).minute(0)
        }
    }

    componentDidMount() {
        document.querySelector('title').innerText = '考勤管理';
        this.getAttendanceManagement();
    }
    handleValueChange(time, s){
        if (s === 0) {
            this.setState({now: time});
            console.log(this.state.now)
        } else {
            this.setState({now1: time});
            console.log(this.state.now1)
        }
    }
    checkBtn(i) {               //勾选或取消
        this.state.status[i] = !this.state.status[i];
        this.setState({status:this.state.status});
    }
    async getAttendanceManagement() {       //公司考勤时间配置及数据渲染
        const result = await XHR.post(API.getAttendanceManagement, { companyid: "4a44b823fa0b4fb2aa299e55584bca6d" });
        const dataSource = JSON.parse(result).data[0];
        this.setState({ data: dataSource });
        var T1 = JSON.parse(result).data[0].forenoonLatest.split(':');
        var T2 = JSON.parse(result).data[0].afternoonFirst.split(':');
        const now = moment().hour(T1[0]).minute(T1[1]);
        const now1 = moment().hour(T2[0]).minute(T2[1]);
        this.setState({
            now,
            now1
        })
        const Num = [1, 2, 3, 4, 5, 6, 7];                                         //一周时间
        const weekDay = JSON.parse(result).data[0].workingTime.split(',');   //初始勾选日期
        const weekDayNum = [];                                     //初始勾选日期类型转换
        const weekSelect = [];                                    //勾选日期state
        weekDay.forEach(ev => weekDayNum.push(parseInt(ev)));
        weekDayNum.forEach((ev, index) => {
            if (Num.indexOf(ev) > -1) {
                weekSelect[Num.indexOf(ev)] = true;
                this.setState({ status: weekSelect });
            }
        })


    }
    async attendanceManagement() {        //公司考勤时间设置
        var d = new Date(this.state.now);       
        var c = new Date(this.state.now1) 
        var morTime=d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var aftTime=c.getHours() + ':' + c.getMinutes() + ':' + d.getSeconds();
        
        var list = []
        this.state.status.forEach((ev,index) =>{
            if(ev === true){
              list.push(index+1)
            }
        })

        const result = await XHR.post(API.attendanceManagement, {
            companyid: this.state.data.companyid,
            forenoonLatest:morTime,
            afternoonFirst:aftTime,
            workingTime: list.toString(),
            id: this.state.data.id
        })
        if(JSON.parse(result).success === 'T'){
            alert("设置成功")
        }else{
            alert(JSON.parse(result).msg);
        }
    }
    render() {
        const { status } = this.state;
        const format = 'H:mm';

        const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.clockTime}>
                        <div className={styles.clock}>打卡时间</div>
                        <div className={styles.time}>
                            <div>上午</div>
                            <div>
                                <TimePicker
                                    showSecond={false}
                                    value={this.state.now}
                                    onChange={time => this.handleValueChange(time, 0)}
                                    format={format}
                                    use24Hours
                                />
                                <Icon checked={false} />
                            </div>

                        </div>
                        <div className={styles.time}>
                            <div>下午</div>
                            <div>
                                <TimePicker
                                    showSecond={false}
                                    value={this.state.now1}
                                    onChange={time => this.handleValueChange(time, 1)}
                                    format={format}
                                    use24Hours
                                />
                                <Icon checked={false} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.workTime}>
                        <div className={styles.work}>工作时间</div>
                        <div className={styles.week}>
                            {
                                week.map((item, index) =>
                                    <div onClick={ev => this.checkBtn(index)} className={styles.item} key={index}><CheckBtn checked={status[index]} />{item}</div>
                                )
                            }
                        </div>
                    </div>
                    <div onClick={ev => this.attendanceManagement(ev)} className={styles.determine}>确认</div>
                </div>
            </div>
        )
    }

}

export default AttendanceManagement;