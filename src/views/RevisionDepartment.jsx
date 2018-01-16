import React,{Component} from 'react';
import styles from '../styles/RevisionDepartment.css';

import XHR from '../utils/request';
import API from '../api/index';


const Revision = ({visible,section,departmentIndex,parent}) => {
    if (!visible ) {
        return(
            <div className={styles.editBox}>
                <div onClick={ev =>parent.editDepartment(ev)} className={styles.edit}>修改</div>
            </div>
        )
    } else {
        return(
            <div>
                <div className={styles.departmentBox}>
                {
                    section.map((item,index) =>
                        <div onClick={ev =>parent.choice(index)} className={departmentIndex === index?styles.selectItem:styles.itemList} key={index}>{item.name}</div>
                    )
                }
                </div>
                <div className={styles.editBox}>
                    <div onClick={ev =>parent.cancelBtn(ev)}className={styles.cancel}>取消</div>
                    <div onClick={ev =>parent.confirmBtn(ev)} className={styles.confirm}>确认</div>
                </div>
            </div>
        )
    }
}

class RevisionDepartment extends Component{
    constructor(){
        super();
        this.state = {
            edit:false,                //默认显示'修改'
            section:[],                //部门列表
            departmentName:window.temp.officeName,  //默认部门
            departmentId:'',           //部门Id
            departmentIndex:''         //部门的索引值
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '修改部门';
        this.getOfficeList();
       
    }
    editDepartment() {
        this.setState({edit:true});
    }
    choice(i) {                                         //选择部门
       this.setState({departmentIndex:i})
       this.setState({departmentName:this.state.section[i].name});
       this.setState({departmentId:this.state.section[i].id});
    }
    cancelBtn(){                                       //取消修改
        this.setState({edit:false});
    }
    confirmBtn() {                                     //确认修改
        this.setState({edit:false})
        this.addOrUpdateOfficce();
    }
    async getOfficeList() {                           //部门列表
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
    async addOrUpdateOfficce() {                      //修改部门
        const result = await XHR.post(API.addOrUpdateOfficce,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            officeName:this.state.departmentName,
            officeid:this.state.departmentId
        })
        if (JSON.parse(result).success === "T") {
            alert("修改部门成功")
        }else{
            alert(JSON.parse(result).msg);
        }
    }
    render() {
        const {section,edit,departmentName,departmentIndex} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.information}>
                    <div className={styles.name}>{window.temp.name}</div>
                    <div className={styles.department}>{departmentName}</div>
                </div>
                <Revision visible={edit} section={section} departmentIndex={departmentIndex} parent={this}></Revision>
            </div>
        )
    }
}
export default RevisionDepartment;