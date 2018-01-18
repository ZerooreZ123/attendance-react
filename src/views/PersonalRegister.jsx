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
    console.log(this.props.match.params.companyid)
    window.sessionStorage.setItem('comID',this.props.match.params.companyid);
    window.sessionStorage.setItem('ID',this.props.match.params.loginName);
}
getPhone(ev) {
    this.setState({inputText:ev.target.value});
}
getCode(ev) {
    this.setState({inputValue:ev.target.value});
}  
async sendSms() {                  //获取验证码
    const result = await XHR.post(API.sendSms,{phone:this.state.inputText});
    this.setState({code:JSON.parse(result).data});
    window.sessionStorage.setItem("phone",this.state.inputText); 

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
goToNextStep() {
   if(this.state.inputValue === this.state.code) {
       this.props.history.push('/inviteCodeDetail')
   }else{
       alert("请输入正确的验证码")
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

