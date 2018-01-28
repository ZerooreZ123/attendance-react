import React,{Component} from 'react';

import styles from '../styles/InviteCodeDetail.css';

import XHR from '../utils/request';
import API from '../api/index';

import down from '../asset/userCenter/down_arrow.png';
import up from '../asset/userCenter/down_up.png';
import spread from '../asset/manager/spread.png';

import headPortrait from '../asset/userCenter/headPortrait.png';


const Icon = ({direction})  => {
  if (direction === true) {
    return <img className={styles.down} src={up} alt=""/>;
  } else {
    return <img className={styles.down} src={down} alt=""/>;
  }
}

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
        iconDirection:false,        //图标方向
        InputText:'',               //输入名字
        InputValue:'',              //输入部门
        departmentId:'',            //部门Id
        departmentIndex:'',         //部门的索引值
        mask:false,                 //遮罩层
        section:[],                 //部门列表
    }
}
componentDidMount() {
    // document.querySelector('title').innerText = '填写资料';
    this.getOfficeList();
}
hideMask() {
  this.setState({ mask:false,iconDirection:false});
}
showMask() {
  this.setState({ mask: true,iconDirection:true});
}
// getValue(ev) {          //获取部门的输入值
//   this.setState({InputValue:ev.target.value})
// }
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
  if(this.state.InputText){
    const result = await XHR.post(API.update,{
      loginName:window.sessionStorage.getItem('ID'),
      companyid:window.sessionStorage.getItem('comID'),
      phone:window.sessionStorage.getItem("phone"),
      officeid:this.state.departmentId,
      userName:this.state.InputText
    });
    this.props.history.push('./userCenter/'+ window.sessionStorage.getItem('ID'));   
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
    const {mask,section,departmentIndex,InputValue,InputText,iconDirection} = this.state;
    return (
      <div className = {styles.container}>
        <div className = {styles.headImage}>
            <img className={styles.informationPhoto} src={headPortrait} alt=""/>
        </div>

        <div className = {styles.getCode}>
          <input onChange={ev =>this.getName(ev)} type="text" placeholder = "姓名" value={InputText}/>
          <div>必填</div>
        </div>
        <div onClick={ev =>this.showMask(ev)} className = {styles.getCode}>
          <div>{InputValue}</div>
          <Icon direction={iconDirection}/>
        </div>

        <div className={styles.next}>
          <div onClick={ev =>this.register(ev)} className = { InputText ? styles.nextCan:styles.nextStep}>完成</div>
        </div>
        <Mask visible={mask} parent={this} List={section} Index={departmentIndex} />
      </div>
    );
  }
}
export default InviteCodeDetail;