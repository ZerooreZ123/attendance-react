//员工考勤记录（普通管理员）
import React,{Component} from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; 

import styles from '../styles/AttendanceData.css';

import XHR from '../utils/request';
import API from '../api/index';

import top from '../asset/manager/triangle-top.png';
import spread from '../asset/manager/spread.png'
import search from '../asset/manager/search.png';

const Datemask = ({parent,visible}) => {
    if (visible) {
      return (
           <div className={styles.mask}>
                <div className={styles.operation}>
                    <img className={styles.spread} src={spread} alt=""/>
                </div>
                <div className={styles.determine} onClick={ev =>parent.determineDepartment(ev)}>确定</div>>
                <div>
                    <InfiniteCalendar/>
                </div>   
            </div>
      )
    }else {
      return null;
    }
  }

class AttendanceData extends Component{
    constructor() {
        super();
        this.state={
            section:[],                 //部门列表
            departmentName:'智慧园区',   //默认部门
            departmentIndex:'',         //部门的索引值
            departmentId:'',            //部门Id
            mask:false,                 //默认不显示部门
            maskDate:false,             //默认不显示日历
            currentIndex:0,             //日月年展示模块索引
            showState:0,                //默认展示全部
            tabIndex:0,                 //选择tab的索引
            startTime:'2017-11-14',     //开始时间(传参)
            endTime:'2017-11-14',       //结束时间(传参)
            record:[],                  //展示打卡记录
            dataSource:[]               //统计打卡记录

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '员工考勤记录';
        this.getRecords();
        this.getOfficeList();
    }
    backMove() {                     //跳转至个人中心
        this.props.history.push('/userCenter');
    }
    export() {                       //跳转至导出页面
        this.props.history.push('/exportData');
    }
    selectTime(i) {                  //设置日月年展示模块索引值
        this.setState({currentIndex:i});
        if(i === 0){
            this.getRecords();
        }else if(i === 1) {
            this.getStatisticalInfo();
        }
    }
    personalInformation() {
        this.props.history.push('/personalInformation');
    }
    hideMask() {                     //隐藏部门
        this.setState({ mask: false });
    }
    showMask() {                     //显示部门
        // this.setState({ mask: true });
        this.setState({maskDate:true});

    }
    showAll() {                      //展示所有
        this.setState({showState:0});
        this.setState({tabIndex:0});
    }
    showAbnormal() {                 //展示异常
        this.setState({showState:1});
        this.setState({tabIndex:1});
    }
    showNotAbsenteeism(){            //展示全勤
        this.setState({showState:2});
        this.setState({tabIndex:2});
    }
    choice(i) {                      //选择部门
        this.setState({departmentIndex:i})
        this.setState({departmentName:this.state.section[i].name});
        this.setState({departmentId:this.state.section[i].id});
 
    }
    clickTerm(i) {                   //设置部门索引、名字、Id  
        this.setState({departmentIndex:i})
        this.setState({departmentName:this.state.section[i].name});
        this.setState({departmentId:this.state.section[i].id});
    }
    selectDate() {

    }
    // async notAbsenteeism() {         //获取全勤信息

    // }
    async getOfficeList() {          //部门列表
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
    async determineDepartment() {    //确认选定部门
        this.hideMask();
        const result = await XHR.post(API.getOfficeUserList,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            officeid:this.state.departmentId    
        });
    }
    async getRecords() {            //获取全部员工某日考勤记录
        const result = await XHR.post(API.getRecords,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            beginDate:this.state.startTime,    
            endDate:this.state.endTime 
        })
        this.setState({record:JSON.parse(result).data} || []);
    }
    async getStatisticalInfo() {     //获取全部员工考勤记录统计
        const result = await XHR.post(API.getStatisticalInfo,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            beginDate:"2017-11-20",
            endDate:"2017-11-30",
        })
        const data = JSON.parse(result).data;
        const list = [];
        data.forEach((ev,index) =>{
            list.push({
                name:ev.userName,
                already:ev.clockIn,
                total:ev.totalClockIn,
                normal:ev.normal,
                abnormal:ev.anomaly
            })
        })
        this.setState({dataSource:list});
    }
    render() {
        const {record,currentIndex,dataSource,tabIndex,section,departmentIndex,departmentName} = this.state;
        const timeSlot = ['日','月','年'];
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        const Mask = props => {                     //部门列表
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
                        </div>
                    </div>
                );
            } else {
              return null;
            }
        }
        const DateChange = props => {              //日期显示内容
            if(currentIndex === 0){                //日
                return (
                    <div className={styles.detailsList}>
                    {
                        record.map((item,index) =>
                            <div className={styles.item} key={index}>
                                <div className={styles.name}>{item.userName}</div>
                                <div className={styles.work}>
                                    <div className={styles.gotoWork}>上班: <span>{item.gotoWork}</span></div>
                                    <div className={styles.punchTime}>{item.gotoWork}</div>
                                </div>
                                <div className={styles.work}>
                                    <div className={styles.gooffWork}>下班: <span>{item.getoffWork}</span></div>
                                    <div className={styles.punchTime}>{item.getoffWork}</div>
                                </div>
                            </div>
                        )
                    }
                </div>     
                );
            }else if(currentIndex === 1){           //月
                return (
                    <div className={styles.detailsList}>
                    {
                        dataSource.map((item,index) =>
                            <div className={styles.item} key={index}>
                                <div className={styles.nameBox}>
                                    <div className={styles.personName}>{item.name}</div>
                                    <div onClick={ev =>this.personalInformation(ev)} className={styles.detail}>详情</div>
                                </div>
                                <div className={styles.totalDay}>
                                    <div className={styles.totalDay}>已打卡: <span>{item.already}</span> (共需{item.total}天)</div>
                                </div>
                                <div className={styles.work}>
                                    <div className={styles.gooffWork}>正常: <span>{item.normal}</span></div>
                                    <div className={styles.punchTime}>异常：<span>{item.abnormal}</span></div>
                                </div>
                            </div>
                        )
                    }
                   </div>         
                )
            }else{                                   //年
                return (
                    <div className={styles.detailsList}>
                    {
                        dataSource.map((item,index) =>
                            <div className={styles.item} key={index}>
                                <div className={styles.nameBox}>
                                    <div className={styles.personName}>{item.name}</div>
                                    <div onClick={ev =>this.personalInformation(ev)} className={styles.detail}>详情</div>
                                </div>
                                <div className={styles.totalDay}>
                                    <div className={styles.totalDay}>已打卡: <span>{item.already}</span> (共需{item.total}天)</div>
                                </div>
                                <div className={styles.work}>
                                    <div className={styles.gooffWork}>正常: <span>{item.normal}</span></div>
                                    <div className={styles.punchTime}>异常：<span>{item.abnormal}</span></div>
                                </div>
                            </div>
                        )
                    }
                   </div>        
                );
            }
        }
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <div onClick={ev =>this.showAll(ev)} className={tabIndex === 0 ? styles.currentTab:styles.tab}>全部</div>
                        <div onClick={ev =>this.showAbnormal(ev)} className={tabIndex === 1 ? styles.currentTab:styles.tab}>异常</div>
                        <div onClick={ev =>this.showNotAbsenteeism(ev)} className={tabIndex === 2 ? styles.currentTab:styles.tab}>全勤</div>
                    </div>
                    <img className={styles.searchImg} src={search} alt=""/>  
                </div>
                <div className={tabIndex === 2 ?styles.hide:styles.timetable}>
                    {
                        timeSlot.map((item,index) =><div onClick={ev =>this.selectTime(index)} key={index} className={currentIndex === index? styles.currentMonth:styles.noMonth}>{item}</div>)
                    }
                </div>
                <DateChange></DateChange>
                <div className={styles.footer}>
                    <div className={styles.brief}>
                        <span onClick={ev => this.showMask(ev)}>2017.12.15</span>/<span onClick={ev =>this.showMask(ev)}>{departmentName}</span>
                        <img className={styles.top} src={top} alt=""/>
                    </div>
                    <div onClick={ev =>this.export(ev)} className={styles.exportData}>导出数据</div>
                </div>
                <Mask></Mask>
                <Datemask visible={this.state.maskDate} parent={this}></Datemask>
            </div>
        )
    }
}
export default AttendanceData;