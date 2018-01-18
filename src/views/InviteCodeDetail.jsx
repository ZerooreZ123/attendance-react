import React,{Component} from 'react';

import styles from '../styles/InviteCodeDetail.css';

import XHR from '../utils/request';
import API from '../api/index';

import down from '../asset/userCenter/down_arrow.png';
import spread from '../asset/manager/spread.png';



const Mask = ({visible,parent,List,Index}) => {               //部门列表
  if (visible) {
      return (
          <div className={styles.mask}>
              <div className={styles.maskBox}>
                  <div className={styles.operation}>
                      <img onClick={ev =>parent.hideMask(ev)} className={styles.spread} src={spread} alt=""/>
                  </div>
                  <div className={styles.determine} onClick={ev =>parent.determineDepartment(ev)}>确定</div>
                  <div className={styles.departmentBox}>
                      {
                          List.map((item,index) =>
                              <div onClick={ev =>parent.clickTerm(index)} className={Index === index?styles.selectTerm:styles.term} key={index}>{item.name}</div>
                          )
                      }
                      <div className={styles.clearBoth}></div>
                  </div>
              </div>
          </div>
      );
  } else {
    return null;
  }
}

class InviteCodeDetail extends Component {
  constructor() {
    super();
    this.state = {
        InputText:'',               //输入名字
        InputValue:'',              //输入部门
        departmentId:'',            //部门Id
        departmentIndex:'',         //部门的索引值
        mask:false,                 //遮罩层
        section:[],                 //部门列表
        status:true
    }
}
componentDidMount() {
    document.querySelector('title').innerText = '填写资料';
    this.getOfficeList();
}
hideMask() {
  this.setState({ mask: false });
}
showMask() {
  this.setState({ mask: true });
}
getValue(ev) {          //获取部门的输入值
  this.setState({InputValue:ev.target.value})
}
getName(ev) {           //获取输入的姓名
  this.setState({InputText:ev.target.value})
}
clickTerm(i) {                              //设置部门索引、名字、Id  
  this.setState({departmentIndex:i})
  this.setState({departmentName:this.state.section[i].name});
  this.setState({departmentId:this.state.section[i].id});
}
determineDepartment(){
  this.hideMask();
  this.setState({InputValue:this.state.departmentName});
}
async register() {
  if(this.state.inputValue && this.state.inputText){
    const result = await XHR.post(API.register,{
      loginName:window.sessionStorage.getItem('ID'),
      phone:window.sessionStorage.getItem("phone")
    });
    if(JSON.parse(result).data.roleid ===2 || JSON.parse(result).data.roleid ===3) {
      this.props.history.push('./userCenter');
    }else{
      this.props.history.push('./punchClock');
    }       
  }else{
      return null;
  }
}

async getOfficeList() {                     //获取部门列表
  const result = await XHR.post(API.getOfficeList,{companyid:window.sessionStorage.getItem('comID')});
  const sectionList = [];
  JSON.parse(result).data.forEach((item,index) =>{
      sectionList.push({
          name:item.name,
          id:item.id
      })
  });
  this.setState({section:sectionList || []});   
}
render() {
    const {status,mask,section,departmentIndex,InputValue,InputText} = this.state;
    return (
      <div className = {styles.container}>
        <div className = {styles.headImage}>
           <div style={{width:70,height:70,borderRadius: 35,background:'lightgray'}}></div>
        </div>

        <div className = {styles.getCode}>
          <input onChange={ev =>this.getName(ev)} type="text" placeholder = "姓名" value={InputText}/>
          <div>必填</div>
        </div>

        <div className = {styles.getCode}>
          <input onChange={ev =>this.getValue(ev)} type="text" placeholder = "部门" value={InputValue}/>
          <img onClick={ev =>this.showMask(ev)} src={down} className={styles.down} alt=''/>
        </div>

        <div className={styles.next}>
          <div onClick={ev =>this.register(ev)} className = {(InputText && InputValue) ? styles.nextCan:styles.nextStep}>完成</div>
        </div>
        <Mask visible={mask} parent={this} List={section} Index={departmentIndex} />
      </div>
    );
  }
}
export default InviteCodeDetail;