//员工个人资料修改
import React,{Component} from 'react';
import styles from '../styles/EditProfile.css';

import XHR from '../utils/request';
import API from '../api/index';

import back from '../asset/ico/back.png';
import upBlue from '../asset/manager/triangle-top.png';
import downBlue from '../asset/manager/downBlue.png';


const Direction = (props) => {
    if (props.checked === true) {
      return <img  className={styles.top} src={downBlue} alt=""/>;
    } else {
      return <img  className={styles.top} src={upBlue} alt=""/>;
    }
}

class EditProfile extends Component{
    constructor() {
        super();
        this.state={
            section:[],                 //部门列表
            departmentName:'智慧园区',   //默认部门
            departmentIndex:'',         //部门的索引值
            departmentId:'',            //部门Id
            mask:false,                 //默认不显示部门
            valueName:'叶湘伦'                //用户姓名
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '修改资料';
        this.getOfficeList();
    }
    showDepartment() {
        this.setState({mask:true});
    }
    hideDepartment() {
        this.setState({mask:false});
    }
    backMove() {
        this.props.history.push('/employeeInformation');
    }
    editName(ev) {
        this.setState({valueName: ev.target.value});
      }
    clickTerm(i) {                              //设置部门索引、名字、Id  
        this.setState({departmentIndex:i})
        this.setState({departmentName:this.state.section[i].name});
        this.setState({departmentId:this.state.section[i].id});
    }
    async getOfficeList() {                     //获取部门列表
        const result = await XHR.post(API.getOfficeList,{companyid:"4a44b823fa0b4fb2aa299e55584bca6d"});
        const sectionList = [];
        JSON.parse(result).data.forEach((item,index) =>{
            sectionList.push({
                name:item.name,
                id:item.id
            })
        });
        this.setState({section:sectionList}); 
    }
    async determineDepartment() {             //更新用户资料
        if(this.state.departmentId){
            const result = await XHR.post(API.update,{
                loginName:'18550117460',
                officeid:this.state.departmentId,
                userName:this.state.valueName
            });
        }else{
            return null;
        }
        this.hideDepartment();
    }
    render() {
        const {section,departmentName,departmentIndex} = this.state;
        const Exhibition = props => {
            if (this.state.mask) {
                return (
                    <div className={styles.mask}>
                        <div className={styles.maskBox}>
                            <div className={styles.departmentBox}>
                                {
                                    section.map((item,index) =>
                                        <div onClick={ev =>this.clickTerm(index)} className={departmentIndex === index?styles.selectTerm:styles.term} key={index}>{item.name}</div>
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
        return(
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.information}>
                        <input className={styles.name} type="text" onChange={ev =>this.editName(ev)} value={this.state.valueName} />
                        <div className={styles.department}>{departmentName}</div>
                    </div>
                </div>
                <div onClick={ev =>this.showDepartment(ev)} className={styles.selectDepartment}>选择部门<Direction checked={true}/></div>
                <Exhibition></Exhibition>
            </div>
        )
    }

}

export default EditProfile;