import React,{Component} from 'react';
import styles from '../styles/RevisionDepartment.css';

import XHR from '../utils/request';
import API from '../api/index';

import back from '../asset/ico/back.png'

class RevisionDepartment extends Component{
    constructor(){
        super();
        this.state = {
            edit:false,                //默认显示'修改'
            section:[],                //部门列表
            departmentName:'智慧园区',  //默认部门
            departmentId:'',           //部门Id
            departmentIndex:''
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '修改部门';
        this.getOfficeList();
       
    }
    backMove() {
        this.props.history.push('/userCenter');
    }
    editDepartment() {
        this.setState({edit:true});
    }
    choice(i) {                                         //选择部门
       this.setState({departmentIndex:i})
       this.setState({departmentName:this.state.section[i].name});
       this.setState({departmentId:this.state.section[i].id});

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
    async addOrUpdateOfficce() {                      //修改部门API
        const result = await XHR.post(API.addOrUpdateOfficce,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            officeName:this.state.departmentName,
            officeid:this.state.departmentId
        })
    }
    render() {
        const {section,edit,departmentName,departmentIndex} = this.state;
        const Revision = props => {
            if (edit === false ) {
                return(
                    <div className={styles.editBox}>
                        <div onClick={ev =>this.editDepartment(ev)} className={styles.edit}>修改</div>
                    </div>
                )
            } else {
                return(
                    <div>
                        <div className={styles.departmentBox}>
                        {
                            section.map((item,index) =>
                                <div onClick={ev =>this.choice(index)} className={departmentIndex === index?styles.selectItem:styles.itemList} key={index}>{item.name}</div>
                            )
                        }
                        </div>
                        <div className={styles.editBox}>
                            <div className={styles.cancel}>取消</div>
                            <div onClick={ev =>this.confirmBtn(ev)} className={styles.confirm}>确认</div>
                        </div>
                    </div>
                )
            }
        }
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.backMove(ev)} className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>修改部门</div>
                </div>
                <div className={styles.information}>
                    <div className={styles.name}>王大宏</div>
                    <div className={styles.department}>{departmentName}</div>
                </div>
                <Revision></Revision>
            </div>
        )
    }
}
export default RevisionDepartment;