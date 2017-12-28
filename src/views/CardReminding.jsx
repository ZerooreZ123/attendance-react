import React,{Component} from 'react';
import Switch from 'react-ios-switch';
import styles from '../styles/CardReminding.css';

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
            timeList:false
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '打卡提醒';
    }
    showTimeList() {
        this.setState({timeList:true});
    }
    hideTimeList() {
        this.setState({timeList:false});
    }
    render() {
        const list = ['前3分钟','前5分钟','前10分钟','前20分钟','前30分钟']
        const TimeList = props => {
            if (this.state.timeList) {
                return (
                    <div className={styles.mask}>
                        <div className={styles.maskBox}>
                            <div className={styles.timeSlot}>
                            {
                                list.map((item,index) =><div key={index} onClick={ev =>this.hideTimeList(ev)}>{item}</div>)
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
                    <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>打卡提醒</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <div>
                            <div className={styles.work}>上班打卡提醒</div>
                            <div onClick={ev =>this.showTimeList(ev)} className={styles.workRemind}>上班前10分钟未打卡提醒
                               <Icon direction={false}></Icon>
                            </div>
                        </div>
                        <Switch checked={true}></Switch>
                    </div>
                    <div className={styles.item}>
                        <div>
                            <div className={styles.work}>下班打卡提醒</div>
                            <div onClick={ev =>this.showTimeList(ev)} className={styles.workRemind}>下班后10分钟未打卡提醒
                               <Icon direction={false}></Icon>
                            </div>
                        </div>
                        <Switch checked={true}></Switch>
                    </div>
                </div>
                <TimeList></TimeList>
            </div>
        )
    }
}

export default CardReminding;