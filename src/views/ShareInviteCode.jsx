import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import styles from '../styles/ShareInviteCode.css';

import XHR from '../utils/request';
import API from '../api/index';

class ShareInviteCode extends Component {
  constructor() {
    super();
    this.state = {
      invitationCode:'' 
    }
  } 
  componentDidMount() {
    document.querySelector('title').innerText = '分享邀请码';
    this.getCompany();
  }
  goToManagement() {
    this.props.history.push('/attendanceManagement');
  }
  async getCompany() {                   //获取公司信息
    const result = await XHR.post(API.getCompany,{companyid:"4a44b823fa0b4fb2aa299e55584bca6d"});
    this.setState({invitationCode:JSON.parse(result).data.invitationCode})
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.codeWrap}>
                <div className={styles.code}>
                    <QRCode value={this.state.invitationCode} />
                </div>
                <div className={styles.codetext}>邀请码</div>
                <div className={styles.text}>点击右上角,分享邀请码即可让员工注册</div>
            </div>    
        </div>
        <div onClick={ev =>this.goToManagement(ev)} className={styles.footer}>完成并设置考勤时间</div>
      </div>
    );
  }
}

export default ShareInviteCode;