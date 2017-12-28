import React, { Component } from 'react';

import styles from '../styles/PunchClock.css';

import delete_1 from '../asset/ico/close.png';
import person from '../asset/punchClock/person-2.png';
import clock from '../asset/punchClock/loction-2.png';
import notice from '../asset/punchClock/notice.png';
import warn from '../asset/punchClock/abnormal.png'


class PunchClock extends Component {
    constructor() {
        super();
        this.state = {
        };
      }
    componentDidMount() {
        document.querySelector('title').innerText = '考勤打卡';
    }
    userCenter() {
      this.props.history.push('/userCenter');
    }
    render() {
      return (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}><span>周三</span> <span>10月22日</span></div>
          </div>
          <div className={styles.noticeBoard}>
            <img className={styles.noticeImg} src={notice} alt=""/>
            <span className={styles.noticeText}>元旦放假通知,放假具体时间为30、31、1号</span>
            <img className={styles.noteceDelete} src={delete_1} alt=""/>
          </div>
          <div className={styles.content}>
            <div className={styles.clickClock}>
              <div className={styles.ring}></div>
              <div className={styles.clickButton}>
                <div className={styles.clockOn}>打卡</div>
                <div className={styles.clockDate}>16:00:00</div>
              </div>
            </div>
            <div className={styles.prompt}>
              <img className={styles.promptImg} src={warn} alt=""/>正在搜索考勤机...
            </div>
            <div className={styles.refresh}>刷新页面</div>
            <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
          </div>
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