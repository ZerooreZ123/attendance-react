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
            companyid:window.sessionStorage.getItem('companyid'),
            officeid:window.officeId
            // officeid:this.state.departmentId    
        });
        const dataSource = JSON.parse(result).data;
        console.log(dataSource)
        const userList = [];
        dataSource.forEach((ev,i) =>{
            userList.push({
                id:ev.id,
                name:ev.name
            })
        })
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