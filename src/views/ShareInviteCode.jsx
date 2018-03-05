import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import styles from '../styles/ShareInviteCode.css';

import XHR from '../utils/request';
import API from '../api/index';
// import {admin ,server} from '../api/route';

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
    const result = await XHR.post(window.admin + API.getCompany,{companyid:window.sessionStorage.getItem('companyid')});
    const admin1 = window.admin + 'oauthLogin.do?targetUrl={"name":"machine1","code":"' + JSON.parse(result).data.id + '"}';
    this.setState({invitationCode:admin1})
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