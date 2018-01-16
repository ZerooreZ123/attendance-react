import React,{Component} from 'react';

import styles from '../styles/PersonalRegister.css';

import XHR from '../utils/request';
import API from '../api/index';


class PersonalRegister extends Component {
  constructor() {
    super();
    this.state = {
        inputText:'',            //输入的手机号
        inputValue:'',           //输入的验证码
        code:''                  //获得的验证码
    }
}
componentDidMount() {
    document.querySelector('title').innerText = '注册'; 
}
getPhone(ev) {
    this.setState({inputText:ev.target.value});
}
getCode(ev) {
    this.setState({inputValue:ev.target.value});
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
goToNextStep() {          //下一步
    if(this.state.inputValue && this.state.inputText){
        this.register();
    }else{
        return null;
    }
}
async register() {
   const result = await XHR.post(API.register,{
        loginName:"ogjb9jic6u1sTAD0cn8DcSUWRCKA",
        phone:this.state.inputText
   })
   if(JSON.parse(result).success === 'T' && this.state.inputValue === this.state.code) {
       this.props.history.push('./inviteCodeDetail')
   }else{
       alert(JSON.parse(result).msg)
   }
}
render() {
    const {inputValue,inputText} = this.state;
    return (
      <div className = {styles.container}>
        <div className = {styles.headImage}>
           <div style={{width:70,height:70,borderRadius: 35,background:'lightgray'}}></div>
        </div>

        <div className = {styles.invite}>
          <input onChange={ev =>this.getPhone(ev)} type="text" placeholder = "手机号" value={inputText}/>
        </div>

        <div className = {styles.getCode}>
          <input onChange={ev =>this.getCode(ev)} type="text" placeholder = "验证码" value={inputValue}/>
          <input onClick={ev =>this.sendSms(ev)} type="button" className={styles.sendCode} value=" 获取验证码" />
        </div>

        <div className={styles.next}>
          <div className = {(inputText && inputValue) ? styles.nextCan:styles.nextStep} onClick={ev =>this.goToNextStep(ev)}>下一步</div>
        </div>
      </div>
    );
  }
}

export default PersonalRegister;

