import React, { Component } from 'react';

import styles from '../styles/ShareInviteCode.css';

import back from '../asset/ico/back.png'
import circle from '../asset/userCenter/circle_code.png'


class ShareInviteCode extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }
  setTime(){

  }
  shareClick() {
    console.log(999)
  }
  render() {
    return (
      <div className = {styles.container}>
        <div className={styles.header}>
          <div className={styles.back}><img className={styles.backImg} alt='' src={back} /></div>
          <div style={{marginRight:20}} onClick={()=>this.setTime()}>设置考勤时间</div>
        </div>

        <div className={styles.codeWrap}>
          <div className={styles.codeContent}>
            <img style={{width:170,height:170}} src={circle} alt=""/>
            <div className={styles.code}>5666</div>
          </div>
          <div style={{marginTop:20}}>邀请码</div>
          <div style={{marginTop:20,color:'gray'}}>分享邀请码即可让员工注册</div>
        </div>

        <div className={styles.shareBtn}>
            <div onClick={()=>this.shareClick()}>分享邀请码</div>
        </div>
      </div>
    );
  }
}

export default ShareInviteCode;