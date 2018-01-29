import React,{Component} from 'react';
import styles from '../styles/ExportData.css';

import XHR from '../utils/request';
import API from '../api/index';

import moment from 'moment';

class ExportData extends Component{
    constructor(){
        super();
        this.state={
            inputMail:'',           //输入的mail
        }
    }
    componentDidMount() {
        // document.querySelector('title').innerText = '导出数据';
        // console.log(window.Data.time.length);
    }
    componentWillUnmount() {
        delete window.Data;
    }
    getMail(ev) {
        this.setState({inputMail:ev.target.value})
    }
    exportData() {
        if(window.Data.time.length === 10){                     //日
            if(window.Data.section === '全部') {      //全部
                this.getRecords(window.Data.time,window.Data.time);   
            }else{                                   //部门
                this.getRecords(window.Data.time,window.Data.time,window.Data.departmentId);   
            }
        }else if(window.Data.time.length === 7){                //月
            if(window.Data.section === '全部') {      //全部
                this.getRecords(window.Data.time + '-01',moment(window.Data.time).endOf('month').format('YYYY-MM-DD'));   
            }else if(window.Data.departmentId){                                   //部门
                this.getRecords(window.Data.time + '-01',moment(window.Data.time).endOf('month').format('YYYY-MM-DD'),window.Data.departmentId)   
            }else {
                this.getRecords(window.Data.time + '-01',moment(window.Data.time).endOf('month').format('YYYY-MM-DD'),'',window.Data.userids)   
            }
        }else{                                                  //年
            if(window.Data.section === '全部') {      //全部
                this.getRecords(window.Data.time + '-01-01',window.Data.time+ '-12-31');   
            }else if(window.Data.departmentId){                                   //部门
                this.getRecords(window.Data.time + '-01-01',window.Data.time+ '-12-31',window.Data.departmentId)   
            }else{
                this.getRecords(window.Data.time + '-01-01',window.Data.time+ '-12-31','',window.Data.userids)   
            }
        }
    }



    async getRecords(startTime,endTime,officeId,userId) {
        const result = await XHR.post(API.getRecords,{
            companyid:window.sessionStorage.getItem('companyid'),
            beginDate:startTime,
            endDate:endTime,
            officeid:officeId,
            userids:userId,                                       //不传useid与office则导全部
            export:"export",                                       //传useid则导个人。
            mail:this.state.inputMail                              //传部门则导部门人员
        })
        if(JSON.parse(result).success === 'T') {
            alert("邮件发送成功")
        }else{
            alert(JSON.parse(result).msg)
        }
    }
    render() {
        const {inputMail} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.describe}>
                        <div>数据描述</div>
                        <div><span>{window.Data.time}</span>/<span>{window.Data.section}</span></div>
                    </div>
                    <div className={styles.mailbox}>
                        <div>接收邮箱</div>
                        <input onChange={ev =>this.getMail(ev)} className={styles.inputBox} type="text" placeholder="接收邮箱" value={inputMail} />
                    </div>
                </div>
                <div onClick={ev =>this.exportData(ev)} className={styles.button}>发送</div>
            </div>
        )
    }
}
export default ExportData;