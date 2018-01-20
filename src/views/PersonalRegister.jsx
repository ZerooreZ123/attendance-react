import React,{Component} from 'react';

import styles from '../styles/PersonalRegister.css';

import XHR from '../utils/request';
import API from '../api/index';


class PersonalRegister extends Component {
  constructor() {
    super();
    this.state = {
        sendState:'发送验证码',   //发送状态
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
    if(!(/^1[34578]\d{9}$/.test(this.state.inputText))){
        alert("手机号码格式不正确!");
    }else{
        const result = await XHR.post(API.sendSms,{phone:this.state.inputText});
        if(JSON.parse(result).success === 'T') {
            var countdown = 60;
            this.setState({code:JSON.parse(result).data});
           
            var timeShow = setInterval(() => {
                countdown--;
                if( countdown<1){
                    this.setState({sendState:'重新发送'})
                    clearInterval(timeShow);
                }else{
                    this.setState({sendState:countdown + 's'});
                }
            },1000)
        }
        window.sessionStorage.setItem("phone",this.state.inputText); 
    }
}
goToNextStep() {
   if((this.state.inputText !== '') && (this.state.inputValue !== '')) {
        if(this.state.inputValue === this.state.code) {
            this.props.history.push('/inviteCodeDetail')
        }else{
            alert("请输入正确的验证码")
        }
   }else{
       alert("请检查手机号或者验证码是否输入")
   }
}
render() {
    const {inputValue,inputText,sendState} = this.state;
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
          <input onClick={ev =>this.sendSms(ev)} type="button" className={styles.sendCode} value={sendState} />
        </div>

        <div className={styles.next}>
          <div className = {(inputText && inputValue) ? styles.nextCan:styles.nextStep} onClick={ev =>this.goToNextStep(ev)}>下一步</div>
        </div>
      </div>
    );
  }
}

export default PersonalRegister;

