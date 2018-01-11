//部门（人事部)
import React,{Component} from 'react';
import styles from '../styles/Department.css';

import XHR from '../utils/request';
import API from '../api/index';

import go from '../asset/manager/go.png';


class Department extends Component{
    constructor() {
        super();
        this.state={
            departmentStaff:[]

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '部门';
        this.getOfficeUserList();
    }
    personalInformation() {
        this.props.history.push('/personalInformation');
    }
    async getOfficeUserList() {                //获取全部部门及部门人员列表
        const result = await XHR.post(API.getOfficeUserList,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            officeid:this.state.departmentId    
        });
        const dataSource = JSON.parse(result).data;
        const userList = [];
        for(var i in dataSource) {
            userList.push({
                department:i,
                staff:dataSource[i]
           })
        }
        this.setState({departmentStaff:userList});
    }
    render() {
        const {departmentStaff} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.content}>
                    {
                        departmentStaff.map((item,index) =>
                            <div onClick={ev =>this.personalInformation(ev)} className={styles.item} key={index}>
                                <div className={styles.name}>{item.name}</div>
                                <img className={styles.forward} src={go} alt=""/>
                            </div> 
                        )
                    }
                </div>
            </div>
        )
    }

} 
export default Department