import React,{Component} from 'react';
import Switch from 'react-ios-switch';
import styles from '../styles/CardReminding.css';

import XHR from '../utils/request';
import API from '../api/index';

import back from '../asset/ico/back.png';
import blueTop from '../asset/manager/triangle-top.png';
import grayDown from '../asset/ico/icon.png';

const Icon = (props) => {
    if (props.direction === true) {
      return <img className={styles.icon} src={blueTop} alt=""/>;
    } else {
      return <img className={styles.icon} src={grayDown} alt=""/>;
    }
}


class CardReminding extends Component {
    constructor() {
        super();
        this.state={
            timeList:false,
            timeSlot:false,
            upTime:'',
            downTime:'',
            upSwitch:'',
            downSwitch:'',
            dataSource:{}
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '打卡提醒';
        this.getUserRemind();
    }
    showTimeList() {                       //显示1
        this.setState({timeList:true});
    }
    hideTimeList() {                       //隐藏1
        this.setState({timeList:false});
    }
    showTimeSlot(){                        //显示2
        this.setState({timeSlot:true})
    }
    hideTimeSlot(){                        //隐藏2
        this.setState({timeSlot:false})
    }
    backMove() {                          //跳转至个人中心
        this.props.history.push('/userCenter');
    }
    selectTime(i) {                       //选择分钟数NO.1
        const list = [3,5,10,20,30];
        this.setState({upTime:list[i]});
        this.clockInRemind();
        this.hideTimeList();
    }
    choiceTime(i) {                       //选择分钟数NO.2
        const list = [3,5,10,20,30];
        this.setState({downTime:list[i]});
        this.clockInRemind();
        this.hideTimeSlot();
    }
    toggleSwitch() {
        if(this.state.upSwitch === '0') {
            this.setState({upSwitch:'1'})
        }else{
            this.setState({upSwitch:'0'}) 
        }
        this.clockInRemind();
    }
    changeSwitch() {
        if(this.state.downSwitch === '0') {
            this.setState({downSwitch:'1'})
        }else{
            this.setState({downSwitch:'0'}) 
        }
        this.clockInRemind();
    }
    async getUserRemind() {              //初始化提醒设置
        const result = await XHR.post(API.getUserRemind,{loginName:"18550117460"});
        this.setState({upTime:JSON.parse(result).data.upTime});
        this.setState({downTime:JSON.parse(result).data.downTime});
        this.setState({upSwitch:JSON.parse(result).data.upSwitch});
        this.setState({downSwitch:JSON.parse(result).data.downSwitch});
    }
    async clockInRemind() {              //设置提醒设置
        const {dataSource} = this.state;
        const result = await XHR.post(API.clockInRemind,{
            loginName:"18550117460",
            upTime:this.state.upTime,
            upSwitch:this.state.upSwitch,
            downTime:this.state.downTime,
            downSwitch:this.state.downSwitch,
            id:dataSource.id
        });
    }
    render() {
        const list = [3,5,10,20,30];
        const {upTime,upSwitch,downTime,downSwitch} = this.state;
        const TimeList = props => {
            if (this.state.timeList) {
                return (
                    <div className={styles.mask}>
                        <div className={styles.maskBox}>
                            <div className={styles.timeSlot}>
                            {
                                list.map((item,index) =><div className={styles.single} key={index} onClick={ev =>this.selectTime(index)}>前{item}分钟</div>)
                            }
                            </div>
                        </div>
                    </div>
                );
            } else {
              return null;
            }
        }
        const TimeSlot = props => {
            if (this.state.timeSlot) {
                return (
                    <div className={styles.maskCopy}>
                        <div className={styles.maskBox}>
                            <div className={styles.timeDuan}>
                            {
                                list.map((item,index) =><div className={styles.single} key={index} onClick={ev =>this.choiceTime(index)}>前{item}分钟</div>)
                            }
                            </div>
                        </div>
                    </div>
                );
            } else {
              return null;
            }
        }
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.backMove(ev)} className={styles.back}><img className={styles.backImg} src={back} alt=""/><span className={styles.backCaption}>个人中心</span></div>
                    <div className={styles.title}>打卡提醒</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <div>
                            <div className={styles.work}>上班打卡提醒</div>
                            <div onClick={ev =>this.showTimeList(ev)} className={styles.workRemind}>上班前{upTime}分钟未打卡提醒
                               <Icon direction={false}></Icon>
                            </div>
                        </div>
                        <Switch onChange={ev =>this.toggleSwitch(ev)} checked={upSwitch === '0' ? true:false}></Switch>
                    </div>
                    <div className={styles.itemOne}>
                        <div>
                            <div className={styles.work}>下班打卡提醒</div>
                            <div onClick={ev =>this.showTimeSlot(ev)} className={styles.workRemind}>下班后{downTime}分钟未打卡提醒
                               <Icon direction={false}></Icon>
                            </div>
                        </div>
                        <Switch onChange={ev =>this.changeSwitch(ev)} checked={downSwitch === '0' ? true:false}></Switch>
                    </div>
                    <TimeList></TimeList>
                    <TimeSlot></TimeSlot>
                </div>
            </div>
        )
    }
}

export default CardReminding;