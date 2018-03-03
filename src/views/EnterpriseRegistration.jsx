import React,{Component} from 'react';

import styles from '../styles/EnterpriseRegistration.css';

import XHR from '../utils/request';
import API from '../api/index';

class EnterpriseRegistration extends Component {
  constructor() {
    super();
    this.state = {
        canState:true,            //可点击
        sendState:'发送验证码',   //发送状态
        inputCode:'',             //输入验证码
        inputPhone:'',            //手机号
        code:'',                  //返回验证码

    }
}
componentDidMount() {
    document.querySelector('title').innerText = '企业注册';
    console.log(this.props.match.params.serialNumber)
}
getCode(ev) {
    this.setState({inputCode:ev.target.value})
}
getPhone(ev) {
    this.setState({inputPhone:ev.target.value})
}
async goToNextStep() {          //下一步
    if((this.state.inputPhone !== '') && (this.state.inputCode !== '')) {     
            if(this.state.code === this.state.inputCode){
                const result = await XHR.post(API.judge,{serialNumber:this.props.match.params.serialNumber});
                if(JSON.parse(result).data === true ) {   
                    this.props.history.push('/writeInformation');
                    window.sessionStorage.setItem('serialNumber',this.props.match.params.serialNumber);
                    window.sessionStorage.setItem('LoginName',this.props.match.params.loginName);
                    window.sessionStorage.setItem("Phone",this.state.inputPhone);
                }else{
                    alert("该考勤机已经被绑定")
                }
            }else{
                alert("请输入正确的验证码")
            }
    }else{
        alert("请检查手机号或者验证码是否输入")
    }
}
async sendSms() {                  //获取验证码
    if(!(/^1[34578]\d{9}$/.test(this.state.inputPhone))){
        alert("手机号码格式不正确!");
    }else{
        var countdown = 60;
        var timeShow = setInterval(() => {
            countdown--;
            if( countdown<1){
                this.setState({sendState:'重新发送'})
                clearInterval(timeShow);
                this.setState({canState:true})
            }else{
                this.setState({sendState:countdown + 's'});
                this.setState({canState:false})
            }
        },1000)
        if(this.state.canState) {
            const result = await XHR.post(API.sendSms,{phone:this.state.inputPhone});
            if(JSON.parse(result).success === 'T') {
                this.setState({code:JSON.parse(result).data});
            }
        }else{
            return false
        }
    }
}

// next() {
//     if(this.state.inputCode === this.state.code) {
//         this.props.history.push('/writeInformation');
//         window.sessionStorage.setItem('serialNumber',this.props.match.params.serialNumber);
//         window.sessionStorage.setItem('LoginName',this.props.match.params.loginName);
//         window.sessionStorage.setItem("Phone",this.state.inputPhone); 

//     }
// }
render() {
    const {inputCode,inputPhone,sendState,canState} = this.state;
    return (
      <div className = {styles.container}>
        <div className = {styles.headImage}>
            <div className={styles.Num}>考勤机编号</div>
            <div className={styles.inputNum}>{this.props.match.params.serialNumber}</div>
        </div>

        <div className = {styles.invite}>
          <input className={styles.inputClass} onChange={ev =>this.getPhone(ev)} type="text" placeholder = "手机号" value={inputPhone}/>
        </div>

        <div className = {styles.getCode}>
          <input className={styles.inputClass} onChange={ev =>this.getCode(ev)} type="text" placeholder = "验证码" value={inputCode}/>
          <input onClick={ev =>this.sendSms(ev)} type="button" className={canState === false?styles.noSendCode:styles.sendCode} value={sendState}/>
        </div>

        <div className={styles.next}>
          <div className = {(inputCode && inputPhone) ? styles.nextCan:styles.nextStep} onClick={ev =>this.goToNextStep(ev)}>下一步</div>
        </div>
      </div>
    );
  }
}

export default EnterpriseRegistration;