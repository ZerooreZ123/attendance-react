//员工资料
import React,{Component} from 'react';
import styles from '../styles/EmployeeInformation.css';

import XHR from '../utils/request';
import API from '../api/index';

import back from '../asset/ico/back.png';
import search from '../asset/manager/search.png';
import forward from '../asset/manager/go.png';
import upBlue from '../asset/manager/triangle-top.png';
import downBlue from '../asset/manager/downBlue.png';
import spread from '../asset/manager/spread.png';


const Direction = (props) => {
    if (props.checked === true) {
      return <img  className={styles.top} src={downBlue} alt=""/>;
    } else {
      return <img  className={styles.top} src={upBlue} alt=""/>;
    }
}

class EmployeeInformation extends Component{
    constructor() {
        super();
        this.state={
            departmentStaff:[],         //部门及所属员工列表
            departmentPart:[],          //部门人员列表
            section:[],                 //部门列表
            departmentName:'全部',       //默认部门
            departmentIndex:'',         //部门的索引值
            departmentId:'',            //部门Id
            mask:false,                 //默认不显示部门
            exhibition:0                //展示人员 0全部部门人员  1部门人员
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '员工资料';
        this.getOfficeList();
        this.getOfficeUserList();
    }
    hideMask() {
        this.setState({ mask: false });
    }
    showMask() {
        this.setState({ mask: true });
    }
    jumpSearch() {
        this.props.history.push('/search')
    }
    personalInformation() {
        this.props.history.push('/personalInformation')
    }
    backMove() {
        this.props.history.push('/userCenter');
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
    async getOfficeUserList() {                //获取全部部门及部门人员列表
        const result = await XHR.post(API.getOfficeUserList,{companyid:"4a44b823fa0b4fb2aa299e55584bca6d"});
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
    async determineDepartment() {             //确认选定部门
        this.hideMask();
        if(this.state.departmentId){
            const result = await XHR.post(API.getOfficeUserList,{
                companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
                officeid:this.state.departmentId    
            });
            const dataSource = JSON.parse(result).data;
            const userList = [];
            dataSource.map((item,index) =>
                userList.push({
                    name:item.name,
                    loginName:item.loginName
                })
            )
            this.setState({departmentPart:userList});
            this.setState({exhibition:1});
        }else{
            return null;
        }
    }
    render() {
        const {departmentStaff,section,departmentIndex, departmentName,exhibition,departmentPart} = this.state;
        const Content = props =>{              //展示员工
            if(exhibition === 0) {             //全部
            return (
                <div className={styles.content}>
                    {
                        departmentStaff.map((item,index) =>
                        <div className={styles.dataList} key={index}>
                            <div className={styles.item}>
                                <div className={styles.department}>{item.department}</div>
                                <div className={styles.personnel}>
                                {
                                    item.staff.map((item,index) =>
                                    <div onClick={ev =>this.personalInformation(ev)} className={styles.single} key={index}>
                                        <div className={styles.information}>
                                            <div className={styles.name}>{item.name}</div>
                                            <div className={styles.phone}>{item.loginName}</div>
                                        </div>
                                        <img className={styles.forward} src={forward} alt=""/>
                                    </div>
                                )
                                }
                                </div>
                            </div>
                        </div>
                        ) 
                    }
                </div>
              )
            }else{                            //部门
                return(
                    <div className={styles.content}>
                        <div className={styles.personnel}>
                            {
                                departmentPart.map((item,index) =>
                                <div onClick={ev =>this.personalInformation(ev)} className={styles.single} key={index}>
                                    <div className={styles.information}>
                                        <div className={styles.name}>{item.name}</div>
                                        <div className={styles.phone}>{item.loginName}</div>
                                    </div>
                                    <img className={styles.forward} src={forward} alt=""/>
                                </div>
                            )
                            }
                        </div>
                    </div>
                )
            }
        }
        const Mask = props => {               //部门列表
            if (this.state.mask) {
                return (
                    <div className={styles.mask}>
                        <div className={styles.maskBox}>
                            <div className={styles.operation}>
                                <img className={styles.spread} src={spread} alt=""/>
                            </div>
                            <div className={styles.determine} onClick={ev =>this.determineDepartment(ev)}>确定</div>
                            <div className={styles.departmentBox}>
                                {
                                    section.map((item,index) =>
                                        <div onClick={ev =>this.clickTerm(index)} className={departmentIndex === index?styles.selectTerm:styles.term} key={index}>{item.name}</div>
                                    )
                                }
                                <div className={styles.clearBoth}></div>
                            </div>
                            <div className={styles.footer}>{departmentName}<Direction checked={true}/></div>
                        </div>
                    </div>
                );
            } else {
              return null;
            }
        }
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                   <div className={styles.searchBox}>
                        <img className={styles.search}src={search} alt=""/>
                        <input type="text" placeholder="搜索姓名或手机号"  />
                    </div>
                </div>
                <Content></Content>
                <div className={styles.footer} onClick={ev =>this.showMask(ev)}>{departmentName}<Direction checked={true}/></div>
                <Mask></Mask>
            </div>
        )
    }
}

export default  EmployeeInformation;