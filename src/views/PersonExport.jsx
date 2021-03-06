import React,{Component} from 'react';
import styles from '../styles/ExportData.css';
import Toast from '../components/Toast';

import XHR from '../utils/request';
import API from '../api/index';
// import {admin ,server} from '../api/route';

import moment from 'moment';

class PersonExport extends Component{
    constructor(){
        super();
        this.state={
            tipState:false,        //提示状态
            inputMail:'',           //输入的mail
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '导出数据';
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
            this.getRecords(window.Data.time,window.Data.time,window.Data.userids);   
        }else if(window.Data.time.length === 7){                //月
            this.getRecords(window.Data.time + '-01',moment(window.Data.time).endOf('month').format('YYYY-MM-DD'),window.Data.userids) 
        }else{                                                  //年
            this.getRecords(window.Data.time + '-01-01',window.Data.time+ '-12-31',window.Data.userids)
        }
    }



    async getRecords(startTime,endTime,userId) {
        const result = await XHR.post(window.admin + API.getRecords,{
            companyid:window.sessionStorage.getItem('companyid'),
            beginDate:startTime,
            endDate:endTime,
            userids:userId,                                       //不传useid与office则导全部
            export:"export",                                       //传useid则导个人。
            mail:this.state.inputMail                              //传部门则导部门人员
        })
        if(JSON.parse(result).success === 'T') {
            this.setState({tipState:true})
            setTimeout(()=>{
                this.setState({tipState:false})
            },2000)
        }else{
            alert(JSON.parse(result).msg)
        }
    }
    render() {
        const {inputMail,tipState} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.describe}>
                        <div className={styles.dataDescribe}>数据描述</div>
                        <div><span>{window.Data.time}</span>/<span>{window.Person.name}</span></div>
                    </div>
                    <div className={inputMail === ''?styles.mailbox1:styles.mailbox}>
                        <div className={inputMail?styles.receiveMail:styles.hideReceive}>接收邮箱</div>
                        <input onChange={ev =>this.getMail(ev)} className={styles.inputBox} type="text" placeholder="接收邮箱" value={inputMail} />
                    </div>
                </div>
                <div onClick={ev =>this.exportData(ev)} className={inputMail === ''?styles.Button:styles.button}>发送</div>
                <Toast isShow={tipState} text="邮件发送成功"/>
            </div>
        )
    }
}
export default PersonExport;