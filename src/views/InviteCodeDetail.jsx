import React,{Component} from 'react';

import styles from '../styles/InviteCodeDetail.css';

import back from '../asset/ico/left_arrow.png';
import depart from '../asset/userCenter/down_arrow.png'
import departDown from '../asset/userCenter/gray_arrow.png'

const departArr = ['部门01','人事部','财务部','移动开发','商务部','市场部']

class InviteCodeDetail extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      selectDepart:0
    }
  }
  codeChange(){
    const text = this.refs.depart.value;
    if (text.length>0){
      this.refs.nextStep.removeAttribute("disabled");
      this.refs.nextStep.setAttribute("style","background-color:#FFF");
    }else{
      this.refs.nextStep.setAttribute("disabled" ,"disabled");
      this.refs.nextStep.setAttribute("style","background-color:lightgray");
    }
  }
  nextStep() {
    console.log(this.refs.name.value)
  }
  showDepart() {
    // const container = this.refs.container;
    // const modal = this.refs.modal;
    // container.appendChild(modal);
    this.setState({showModal:true});
    this.selectDepart(0);
  }
  sureClick() {
    // const container = this.refs.container;
    // const modal = this.refs.modal;
    // container.removeChild(modal);
    this.setState({showModal:false});
    // 主动判断部门字符，如果有完成按钮可点击
    this.codeChange()
  }
  selectDepart(index) {
    this.setState({selectDepart:index});
    const depart = this.refs.depart;
    depart.value = departArr[index];
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div className = {styles.container} ref = "container">
        <div className={styles.header}>
            <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>企业邀请码</div>
        </div>
        
        <div className = {styles.headImage}><div style={{width:70,height:70,borderRadius: 35,background:'lightgray'}}></div></div>

        <div className = {styles.invite}>
          <input ref = "name" type="text" placeholder = "姓名" onChange={()=>this.codeChange()}/>必填
          <div style={{height:1,background:'#FFF',marginTop:8}}></div>
        </div>

        <div className = {styles.invite}>
          <input ref = "depart" type="text" placeholder = "部门" onChange={()=>this.codeChange()}/>
          <div style={{display:"inline-block",width:15,height:15}} onClick = {()=>this.showDepart()}>
            <img src={depart} alt=""/>
          </div>
          <div style={{height:1,background:'#FFF',marginTop:8}}></div>
        </div>

        <div className={styles.next}>
          <button ref = "nextStep" type = "button" className = {styles.nextStep} onClick={()=>this.nextStep()} disabled="disabled">完成</button>
        </div>

        {this.state.showModal?<div className={styles.modal} ref = "modal">
          <div className = {styles.modalContent}>
            <div className={styles.sureBtn} onClick={()=>this.sureClick()}>
              <img src={departDown} style={{width:35,height:12}} alt=""/>
              <div>确定</div>
            </div>
            <div className={styles.depart}>
                {
                  departArr.map((value,index)=>{
                    return(
                      <div key={index} className={this.state.selectDepart!==index? styles.departItem : styles.selDepartItem} onClick={()=>this.selectDepart(index)}>{value}</div>
                    )
                  })
                }
            </div>
          </div>
        </div>:null}
      </div>
    );
  }
}

export default InviteCodeDetail;

