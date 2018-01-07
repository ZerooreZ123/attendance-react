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
    showTimeList() {
        this.setState({timeList:true});
    }
    hideTimeList() {
        this.setState({timeList:false});
    }
    backMove() {
        this.props.history.push('/userCenter');
    }
    selectTime(i) {
        const list = [3,5,10,20,30];
        this.setState({upTime:list[i]});
        this.hideTimeList();
    }
    async getUserRemind() {
        const result = await XHR.post(API.getUserRemind,{loginName:"18550117460"});
        this.setState({upTime:JSON.parse(result).data.upTime});
        this.setState({downTime:JSON.parse(result).data.downTime});
        this.setState({upSwitch:JSON.parse(result).data.upSwitch});
        this.setState({downSwitch:JSON.parse(result).data.downSwitch});
    }
    async clockInRemind() {
        const {dataSource} = this.state;
        const result = await XHR.post(API.clockInRemind,{
            loginName:"18550117460",
            upTime:this.state.gotoTime,
            upSwitch:this.state.gotoSwitch,
            downTime:this.state.gooffTime,
            downSwitch:this.state.gooffSwitch,
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
                                list.map((item,index) =><div key={index} onClick={ev =>this.selectTime(index)}>前{item}分钟</div>)
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
                        <Switch onClick={ev =>this.toggleSwitch(ev)} checked={upSwitch === '0' ? true:false}></Switch>
                    </div>
                    <div className={styles.item}>
                        <div>
                            <div className={styles.work}>下班打卡提醒</div>
                            <div onClick={ev =>this.showTimeList(ev)} className={styles.workRemind}>下班后{downTime}分钟未打卡提醒
                               <Icon direction={false}></Icon>
                            </div>
                        </div>
                        <Switch onClick={ev =>this.changeSwitch(ev)} checked={downSwitch === '0' ? true:false}></Switch>
                    </div>
                </div>
                <TimeList></TimeList>
            </div>
        )
    }
}

export default CardReminding;