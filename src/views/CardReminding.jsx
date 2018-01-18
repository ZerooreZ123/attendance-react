import React,{Component} from 'react';
import Switch from 'react-ios-switch';
import styles from '../styles/CardReminding.css';

import XHR from '../utils/request';
import API from '../api/index';

import blueTop from '../asset/manager/triangle-top.png';
import grayDown from '../asset/ico/icon.png';

const Icon = ({direction})  => {
    if (direction === true) {
      return <img className={styles.icon} src={blueTop} alt=""/>;
    } else {
      return <img className={styles.icon} src={grayDown} alt=""/>;
    }
}

const TimeList =({parent,visible})  => {
    const list = [3,5,10,20,30];
    if (visible) {
        return (
            <div className={styles.mask}>
                <div className={styles.maskBox}>
                    <div className={styles.timeSlot}>
                    {
                        list.map((item,index) =><div className={styles.single} key={index} onClick={ev =>parent.selectTime(index)}>前{item}分钟</div>)
                    }
                    </div>
                </div>
            </div>
        );
    } else {
      return null;
    }
}

const TimeSlot = ({parent,visible})  => {
    const list = [3,5,10,20,30];
    if (visible) {
        return (
            <div className={styles.maskCopy}>
                <div className={styles.maskBox}>
                    <div className={styles.timeDuan}>
                    {
                        list.map((item,index) =><div className={styles.single} key={index} onClick={ev =>parent.choiceTime(index)}>前{item}分钟</div>)
                    }
                    </div>
                </div>
            </div>
        );
    } else {
      return null;
    }
}

class CardReminding extends Component {
    constructor() {
        super();
        this.state={
            timeIndex:'',           //上时间表列表
            iconTop:false,          //上图片状态
            iconDown:false,         //下图片状态
            timeList:false,
            timeSlot:false,
            upTime:'',              //上时间
            downTime:'',            //下时间
            upSwitch:'',            //上状态
            downSwitch:'',          //下状态
            dataSource:{}
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '打卡提醒';
        this.getUserRemind();
    }
    showTimeList() {                       //显示1
        this.setState({timeList:true});
        this.setState({iconTop:true})
    }
    hideTimeList() {                       //隐藏1
        this.setState({timeList:false});
        this.setState({iconTop:false})
    }
    showTimeSlot(){                        //显示2
        this.setState({timeSlot:true})
        this.setState({iconDown:true})
    }
    hideTimeSlot(){                        //隐藏2
        this.setState({timeSlot:false})
        this.setState({iconDown:false})
    }
    selectTime(i) {                       //选择分钟数NO.1
        const list = ['3','5','10','20','30'];
        this.setState({upTime:list[i]});
        this.hideTimeList();
        this.preClockInRemind();
    }
    choiceTime(i) {                       //选择分钟数NO.2
        const list = ['3','5','10','20','30'];
        this.setState({downTime:list[i]});
        this.hideTimeSlot();
        this.preClockInRemind();
    }
    toggleSwitch() {                     //Switch切换1
        if(this.state.upSwitch === '0') {
            this.setState({upSwitch:'1'})
        }else{
            this.setState({upSwitch:'0'}) 
        }
        this.preClockInRemind();
    }
    changeSwitch() {                     //Switch切换2
        if(this.state.downSwitch === '0') {
            this.setState({downSwitch:'1'})
        }else{
            this.setState({downSwitch:'0'}) 
        }
        this.preClockInRemind();
    }
    async getUserRemind() {              //初始化提醒设置
        const result = await XHR.post(API.getUserRemind,{loginName:window.sessionStorage.getItem('loginName')});
        this.setState({upTime:JSON.parse(result).data.upTime});
        this.setState({downTime:JSON.parse(result).data.downTime});
        this.setState({upSwitch:JSON.parse(result).data.upSwitch});
        this.setState({downSwitch:JSON.parse(result).data.downSwitch});
        this.setState({dataSource:JSON.parse(result).data});
    }
    preClockInRemind() {
        setTimeout(()=>this.clockInRemind(), 0);
    }
    async clockInRemind() {              //设置提醒设置
        console.log(this.state.upTime,this.state.upSwitch,this.state.downTime,this.state.downSwitch)
        const result = await XHR.post(API.clockInRemind,{
            loginName:window.sessionStorage.getItem('loginName'),
            upTime:this.state.upTime,
            upSwitch:this.state.upSwitch,
            downTime:this.state.downTime,
            downSwitch:this.state.downSwitch,
            id:this.state.dataSource.id
        });
    }
    render() {
        const {upTime,upSwitch,downTime,downSwitch,timeList,timeSlot,iconDown,iconTop} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <div>
                            <div className={styles.work}>上班打卡提醒</div>
                            <div onClick={ev =>this.showTimeList(ev)} className={ iconTop === true ? styles.blueRemind:styles.workRemind}>上班前{upTime}分钟未打卡提醒
                               <Icon direction={iconTop}></Icon>
                            </div>
                        </div>
                        <Switch onChange={ev =>this.toggleSwitch(ev)} checked={upSwitch === '0' ? true:false}></Switch>
                    </div>
                    <div className={styles.itemOne}>
                        <div>
                            <div className={styles.work}>下班打卡提醒</div>
                            <div onClick={ev =>this.showTimeSlot(ev)} className={ iconDown === true ? styles.blueRemind:styles.workRemind}>下班后{downTime}分钟未打卡提醒
                               <Icon direction={iconDown}></Icon>
                            </div>
                        </div>
                        <Switch onChange={ev =>this.changeSwitch(ev)} checked={downSwitch === '0' ? true:false}></Switch>
                    </div>
                    <TimeList parent={this} visible={timeList}></TimeList>
                    <TimeSlot parent={this} visible={timeSlot}></TimeSlot>
                </div>
            </div>
        )
    }
}

export default CardReminding;