import React, { Component } from 'react';
import styles from '../styles/PunchClock.css';

import XHR from '../utils/request';
import API from '../api/index';

import delete_1 from '../asset/ico/close.png';
import person from '../asset/punchClock/person-2.png';
import clock from '../asset/punchClock/loction-2.png';
import notice from '../asset/punchClock/notice.png';
import warn from '../asset/punchClock/abnormal.png';
import load from '../asset/punchClock/load.png';
import successMin from '../asset/punchClock/successMin.png';
import success from '../asset/punchClock/success.png';



class PunchClock extends Component {
    constructor() {
        super();
        this.state = {
          h:'',                    //时
          m:'',                    //分
          s:'',                    //秒
          month:'',                //月
          day:'',                  //日
          weekday:'',              //周几
          prompt:3,                //考勤机状态
        };
      }
    componentDidMount() {
        document.querySelector('title').innerText = '考勤打卡';
        this.showTime();
    }
    userCenter() {
      this.props.history.push('/userCenter');
    }
                            
    showTime() {                      //刷新当前时间/1秒
      setInterval(ev =>this.getTime(ev),1000)
    }
    getTime() {                       //获取当前时/分/秒/月/日/星期
      var data = new Date();
      this.setState({h:data.getHours()<10?'0'+data.getHours():data.getHours()});
      this.setState({m:data.getMinutes()<10?'0'+data.getMinutes():data.getMinutes()});
      this.setState({s:data.getSeconds()<10?'0'+data.getSeconds():data.getSeconds()});
      this.setState({month:data.getMonth()+1});
      this.setState({day:data.getDate()});
      switch(data.getDay()) {
        case 0:
            this.setState({weekday:'日'});
            break;
        case 1:
            this.setState({weekday:'一'});
            break;
        case 2:
            this.setState({weekday:'二'});
            break;
        case 3:
            this.setState({weekday:'三'});
            break;
        case 4:
            this.setState({weekday:'四'});
            break;
        case 5:
            this.setState({weekday:'五'});
            break;
        default:
            this.setState({week:'六'});
      }
      
    }
    async clockIn() {                //员工打卡
      const result = await XHR.post(API.clockIn,{loginName:"123456789"});
      if(JSON.parse(result).success === "T") {
        this.setState({prompt:3})
      }
    }
    render() {
      const {prompt,h,m,s,month,day,weekday} = this.state;
      const ClockPage = props => {
        if(prompt ===0) {            //搜索中
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
                <img className={styles.promptImg} src={load} alt=""/><span className={styles.text}>正在搜索考勤机...</span>
              </div>
              <div className={styles.refreshHide}>刷新页面</div>
              <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
            </div>
          )
        }else if(prompt === 1){      //可打卡
          return (
            <div className={styles.content}>
              <div className={styles.clickClock}>
                <div className={styles.circular}></div>
                <div onClick={ev =>this.clockIn(ev)} className={styles.clickButton}>
                  <div className={styles.clockCan}>打卡</div>
                  <div className={styles.clockDate}>{h}:{m}:{s}</div>
                </div>
              </div>
              <div className={styles.prompt}>可以打卡了</div>
              <div className={styles.refreshHide}>刷新页面</div>
              <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
            </div>
          )
        }else if(prompt === 2) {     //打卡异常
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
                <img className={styles.promptImg} src={warn} alt=""/><span className={styles.text}>网络连接异常,蓝牙未打开</span>
              </div>
              <div className={styles.refreshShow}>刷新页面</div>
              <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
            </div>
          )
        }else{                      //打卡成功
          return (
            <div className={styles.content}>
              <div className={styles.clickClock}>
                <img className={styles.cardFinish} src={success} alt=""/>
                <div className={styles.cardTime}>
                  <div className={styles.clockDate}>{h}:{m}:{s}</div>
                </div>
              </div>
              <div className={styles.prompt}>
                <img className={styles.promptImg} src={successMin} alt=""/><span className={styles.text}>打卡成功!</span>
              </div>
              <div className={styles.refreshHide}>刷新页面</div>
              <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
            </div>
          )
        }
      }
      return (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}><span>周{weekday}</span> <span>{month}月{day}日</span></div>
          </div>
          <div className={styles.noticeBoard}>
            <img className={styles.noticeImg} src={notice} alt=""/>
            <span className={styles.noticeText}>元旦放假通知,放假具体时间为30、31、1号</span>
            <img className={styles.noteceDelete} src={delete_1} alt=""/>
          </div>
          <ClockPage></ClockPage>
          <div className={styles.tabBox}>
            <div className={styles.tab}>
              <img className={styles.tabImg} src={clock} alt=""/>
              <div>考勤打卡</div>
            </div>
            <div className={styles.tab} onClick={ev =>this.userCenter(ev)} >
              <img className={styles.tabImg} src={person} alt=""/>
              <div>个人中心</div>
            </div>
          </div>
        </div>
      );
    }

}
 export  default PunchClock;