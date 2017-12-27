import React,{Component} from 'react';
import styles from '../styles/InviteCode.css';

import back from '../asset/ico/left_arrow.png'

class InviteCode extends Component {
  constructor() {
    super();
    this.state = {
      enable: false
    }
  }
  codeChange(){
    const text = this.refs.inviteCode.value;
    if (text.length>0){
      this.refs.nextStep.removeAttribute("disabled");
      this.refs.nextStep.setAttribute("style","background-color:#FFF");
    }else{
      this.refs.nextStep.setAttribute("disabled" ,"disabled");
      this.refs.nextStep.setAttribute("style","background-color:lightgray");
    }
  }
  handleClick() {
    console.log(this.refs.inviteCode.value)
  }
  render() {
    return (
      <div className = {styles.container}>
        <div className={styles.header}>
            <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>登录</div>
        </div>
        
        <div className = {styles.headImage}><div style={{width:70,height:70,borderRadius: 35,background:'lightgray'}}></div></div>

        <div className = {styles.invite}>
          <input ref = "inviteCode" type="text" placeholder = "企业邀请码" onChange={()=>this.codeChange()}/>
          <div style={{height:1,background:'#FFF',marginTop:8}}></div>
        </div>

        <div className={styles.next}>
          <button ref = "nextStep" type = "button" className = {styles.nextStep} onClick={()=>this.handleClick()} disabled="disabled">下一步</button>
        </div>
      </div>
    );
  }
}

export default InviteCode;

