import React,{Component} from 'react';

import styles from '../styles/WriteInformation.css';

import XHR from '../utils/request';
import API from '../api/index';

class WriteInformation extends Component {
  constructor() {
    super();
    this.state = {
      inputValue:'',         //姓名
      inputText:'',          //公司名
    }
}
componentDidMount() {
    document.querySelector('title').innerText = '填写资料'; 
}
async ShareInviteCode() {                //公司注册
    const result = await XHR.post(API.register,{
        serialNumber:window.sessionStorage.getItem('serialNumber'),
        loginName:window.sessionStorage.getItem('LoginName'),
        phone:window.sessionStorage.getItem("Phone")
    });
    if(JSON.parse(result).success === 'T') {
      this.props.history.push('./shareInviteCode');
    }else{
      alert(JSON.parse(result).msg);
    }  
}
getCompany(ev) {
    this.setState({inputText:ev.target.value});
}
getName(ev) {
    this.setState({inputValue:ev.target.value});
} 
render() {
    const {inputValue,inputText} = this.state;
    return (
      <div className = {styles.container}>
        <div className = {styles.getCode}>
          <input onChange={ev =>this.getCompany(ev)} type="text" placeholder = "公司名" value={inputText}/>
          <div className={styles.prompt}>必填</div>
        </div>

        <div className = {styles.getCode}>
          <input onChange={ev =>this.getName(ev)} type="text" placeholder = "姓名" value={inputValue}/>
          <div className={styles.prompt}>必填</div>
        </div>

        <div className={styles.next}>
          <div onClick={ev =>this.ShareInviteCode(ev)} className = {(inputValue && inputText) ? styles.nextCan:styles.nextStep}>完成</div>
        </div>
      </div>
    );
  }
}

export default WriteInformation;