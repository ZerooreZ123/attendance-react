import React,{Component} from 'react';
import styles from '../styles/ExportData.css';

import XHR from '../utils/request';
import API from '../api/index';

class ExportData extends Component{
    constructor(){
        super();
        this.state={
            inputMail:'',           //输入的mail
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '导出数据';
    }
    getMail(ev) {
        this.setState({inputMail:ev.target.value})
    }
    async getRecords() {
        const result = await XHR.post(API.getRecords,{
            companyid:window.sessionStorage.getItem('companyid'),
            beginDate:"2017-11-1",
            endDate:"2017-11-30",
            userids:window.sessionStorage.getItem('id'),
            export:"export",
            mail:this.state.inputMail
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
                <div onClick={ev =>this.getRecords(ev)} className={styles.button}>发送</div>
            </div>
        )
    }
}
export default ExportData;