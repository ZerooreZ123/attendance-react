import React,{Component} from 'react';

import styles from '../styles/EnterpriseRegistration.css';

import XHR from '../utils/request';
import API from '../api/index';

class EnterpriseRegistration extends Component {
  constructor() {
    super();
    this.state = {
        inputNum:'',              //考勤机编号
        inputCode:'',             //输入验证码
        inputPhone:'',            //手机号
        code:'',                  //返回验证码
    }
}
componentDidMount() {
    document.querySelector('title').innerText = '企业注册'; 
}
getNum(ev) {
    this.setState({inputNum:ev.target.value})
}
getCode(ev) {
    this.setState({inputCode:ev.target.value})
}
getPhone(ev) {
    this.setState({inputPhone:ev.target.value})
}
goToNextStep() {          //下一步
    if(this.state.inputNum && this.state.inputPhone && this.state.inputCode){
        this.register();
    }else{
        return null;
    }
}
async sendSms() {                  //获取验证码
   const result = await XHR.post(API.sendSms,{phone:"18617015565"});
   this.setState({code:JSON.parse(result).data});

    // var countdown=60;
    // if (countdown === 0) {  
    //     val.removeAttribute("disabled");  
    //     val.value="获取验证码";  
    //     countdown = 60;  
    //     return false;  
    // } else {  
    //     val.setAttribute("disabled", true);  
    //     val.value="重新发送(" + countdown + ")";  
    //     countdown--;  
    // }    
}
async register() {                //公司注册
    const result = await XHR.post(API.register,{
        serialNumber:this.state.inputNum,
        loginName:"ogjb9jic6u1sTAD0cn8DcSUWRCKA",
        phone:this.state.inputPhone
    })
    if(JSON.parse(result).success === "T" && this.state.inputCode === this.state.code){
        this.props.history.push('./inviteCodeDetail');
    }else{
        alert(JSON.parse(result).msg)
    }
}
render() {
    const {inputNum,inputCode,inputPhone} = this.state;
    return (
      <div className = {styles.container}>
        <div className = {styles.headImage}>
            <div className={styles.Num}>考勤机编号</div>
            <input onChange={ev =>this.getNum(ev)} className={styles.inputNum} type="text" placeholder = "考勤机编号" value={inputNum}/>
        </div>

        <div className = {styles.invite}>
          <input onChange={ev =>this.getPhone(ev)} type="text" placeholder = "手机号" value={inputPhone}/>
        </div>

        <div className = {styles.getCode}>
          <input onChange={ev =>this.getCode(ev)} type="text" placeholder = "验证码" value={inputCode}/>
          <input onClick={ev =>this.sendSms(ev)} type="button" className={styles.sendCode} value=" 获取验证码"/>
        </div>

        <div className={styles.next}>
          <div className = {(inputNum && inputCode && inputPhone) ? styles.nextCan:styles.nextStep} onClick={ev =>this.goToNextStep(ev)}>下一步</div>
        </div>
      </div>
    );
  }
}

export default EnterpriseRegistration;