//员工考勤记录（普通管理员）
import React,{Component} from 'react';
import styles from '../styles/AttendanceData.css';

import XHR from '../utils/request';
import API from '../api/index';

import back from '../asset/ico/back.png';
import top from '../asset/manager/triangle-top.png';
import spread from '../asset/manager/spread.png';

class AttendanceData extends Component{
    constructor() {
        super();
        this.state={
            section:[],                 //部门列表
            departmentName:'智慧园区',   //默认部门
            departmentIndex:'',         //部门的索引值
            departmentId:'',            //部门Id
            mask:false,                 //默认不显示部门
            currentIndex:0,             //日月年展示模块索引
            showState:true,             //默认展示全部
            tabIndex:0,                 //选择tab的索引
            record:[
                {
                    name:'叶湘伦',
                    goWorkState:'正常',
                    goWorkTime:'08:05',
                    offWorkState:'正常',
                    offWorkTime:'18:05'
                },{
                    name:'路小雨',
                    goWorkState:'迟到',
                    goWorkTime:'08:50',
                    offWorkState:'未打卡',
                    offWorkTime:'18:05'
                }

            ],
            dataSource:[
                {
                    name:'叶湘伦',
                    already:'22天',
                    total:'23天',
                    normal:'20天',
                    abnormal:'3天'
                },{
                    name:'路小雨',
                    already:'20天',
                    total:'23天',
                    normal:'20天',
                    abnormal:'2天'
                }
            ]

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '员工考勤记录';
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
    }
    personalInformation() {
        this.props.history.push('/personalInformation');
    }
    hideMask() {                     //隐藏部门
        this.setState({ mask: false });
    }
    showMask() {                     //显示部门
        this.setState({ mask: true });
    }
    showAll() {                      //展示所有
        this.setState({showState:true});
        this.setState({tabIndex:0});
    }
    showAbnormal() {                 //展示异常
        this.setState({showState:false});
        this.setState({tabIndex:1});
    }
    choice(i) {                      //选择部门
        this.setState({departmentIndex:i})
        this.setState({departmentName:this.state.section[i].name});
        this.setState({departmentId:this.state.section[i].id});
 
     }
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
    clickTerm(i) {             //设置部门索引、名字、Id  
        this.setState({departmentIndex:i})
        this.setState({departmentName:this.state.section[i].name});
        this.setState({departmentId:this.state.section[i].id});
    }
    async determineDepartment() {    //确认选定部门
        this.hideMask();
        const result = await XHR.post(API.getOfficeUserList,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            officeid:this.state.departmentId    
        });
    }

    render() {
        const {record,currentIndex,dataSource,tabIndex,section,departmentIndex,departmentName} = this.state;
        const timeSlot = ['日','月','年'];
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
                                <div className={styles.name}>{item.name}</div>
                                <div className={styles.work}>
                                    <div className={styles.gotoWork}>上班: <span>{item.goWorkState}</span></div>
                                    <div className={styles.punchTime}>{item.goWorkTime}</div>
                                </div>
                                <div className={styles.work}>
                                    <div className={styles.gooffWork}>下班: <span>{item.offWorkState}</span></div>
                                    <div className={styles.punchTime}>{item.offWorkTime}</div>
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
                                    <div className={styles.totalDay}>已打卡: <span>{item.already}</span> 共需({item.total})</div>
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
                return null;
            }
        }
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back} onClick={ev =>this.backMove(ev)}><img className={styles.backImg} src={back} alt=""/><span className={styles.backCaption}>个人中心</span></div>
                    <div className={styles.title}>
                    <div onClick={ev =>this.showAll(ev)} className={tabIndex === 0 ? styles.currentTab:styles.tab}>全部</div>
                    <div onClick={ev =>this.showAbnormal(ev)} className={tabIndex === 1 ? styles.currentTab:styles.tab}>异常</div>
                    </div>    
                </div>
                <div className={styles.timetable}>
                    {
                        timeSlot.map((item,index) =><div onClick={ev =>this.selectTime(index)} key={index} className={currentIndex === index? styles.currentMonth:styles.noMonth}>{item}</div>)
                    }
                </div>
                <DateChange></DateChange>
                <div className={styles.footer}>
                    <div className={styles.brief}>
                        <span>2017.12.15</span>/<span onClick={ev =>this.showMask(ev)}>{departmentName}</span>
                        <img className={styles.top} src={top} alt=""/>
                    </div>
                    <div onClick={ev =>this.export(ev)} className={styles.exportData}>导出数据</div>
                </div>
                <Mask></Mask>           
            </div>
        )
    }
}
export default AttendanceData;