import React,{Component} from 'react';
import moment from 'moment';

import styles from '../styles/AttendanceRecord.css';

import XHR from '../utils/request';
import API from '../api/index';

import back from '../asset/ico/back.png'

class AttendanceRecord extends Component{
    constructor() {
        super();
        this.state={
            dataSource:[],              //全部
            dataAbnormal:[],            //异常
            showState:true,             //默认展示全部
            tabIndex:0,                 //选择tab的索引
            monthList:[],               //月份展示
            monthIndex:0,               //选择月份索引
            getYear:''
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '考勤记录';
        this.getRecords();
        this.showMonth();
    }
    backMove() {
        this.props.history.push('/userCenter');
    }
    showMonth() {                    //展示当前及前三月
        var nowMonth = moment().format("M");
        var previous = moment().subtract(1, "months").format("M");
        var penult = moment().subtract(2, "months").format("M");
        var last = moment().subtract(3, "months").format("M");
        var list =[nowMonth,previous,penult,last];
        this.setState({monthList:list});
    }
    showAll() {                      //展示所有
        this.setState({showState:true});
        this.setState({tabIndex:0});
        this.getRecords();
    }
    showAbnormal() {                 //展示异常
        this.setState({showState:false});
        this.setState({tabIndex:1});
        this.getAbnormal();
    }
    async getRecords(i) {            //切换月份展示记录
        this.setState({monthIndex:i});
        var startTime = '';
        var endTime = '';
        switch(i){                   //动态传参
            case 0:
                startTime = moment().startOf('month').format("YYYY-MM-DD");
                endTime = moment().endOf('month').format("YYYY-MM-DD");
                break;
            case 1:
                startTime = moment().startOf('month').subtract(1, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(1, "months").format("YYYY-MM-DD");
                break;
            case 2:
                startTime = moment().startOf('month').subtract(2, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(2, "months").format("YYYY-MM-DD");
                break;
            default:
                startTime = moment().startOf('month').subtract(3, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(3, "months").format("YYYY-MM-DD");     
        }
        const result = await XHR.post(API.getRecords,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            beginDate:startTime,    
            endDate:endTime,
            userids:"92548d4571604ff2912652ec8e3d44a6"    
        })
        this.setState({dataSource:JSON.parse(result).data} || []);

    }
    async getAbnormal(i) {            //获取异常打卡记录
        this.setState({monthIndex:i});
        var startTime = '';
        var endTime = '';
        switch(i){                    //动态传参
            case 0:
                startTime = moment().startOf('month').format("YYYY-MM-DD");
                endTime = moment().endOf('month').format("YYYY-MM-DD");
                break;
            case 1:
                startTime = moment().startOf('month').subtract(1, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(1, "months").format("YYYY-MM-DD");
                break;
            case 2:
                startTime = moment().startOf('month').subtract(2, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(2, "months").format("YYYY-MM-DD");
                break;
            default:
                startTime = moment().startOf('month').subtract(3, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(3, "months").format("YYYY-MM-DD");     
        }
        const result = await XHR.post(API.getRecords,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            beginDate:startTime, 
            endDate:endTime,
            userids:"92548d4571604ff2912652ec8e3d44a6",
            abnormity:"abnormity"    
        })
        this.setState({dataAbnormal:JSON.parse(result).data || []});
    }
    render() {
        const {dataSource,dataAbnormal,showState,tabIndex,monthList,monthIndex} = this.state;
        const Show = props =>{
            if(showState === true) {
                return (
                    <div className={styles.detailsList}>
                    {
                        dataSource.map((item,index) =>
                            <div className={styles.item} key={index}>
                                <div className={styles.displayDate}><span>{item.date.slice(0,10)}</span> <span>{item.week}</span></div>
                                <div className={styles.work}>
                                    <div className={styles.gotoWork}>上班:<span>{item.gotoWork}</span></div>
                                    <div className={styles.punchTime}>{item.gotoWork}</div>
                                </div>
                                <div className={styles.work}>
                                    <div className={styles.gooffWork}>下班:<span>{item.getoffWork}</span></div>
                                    <div className={styles.punchTime}>{item.getoffWork}</div>
                                </div>
                            </div>
                        )
                    }
                </div>   
                )
            }else{
                return (
                    <div className={styles.detailsList}>
                    {
                        dataAbnormal.map((item,index) =>
                            <div className={styles.item} key={index}>
                                <div className={styles.displayDate}><span>{item.date.slice(0,10)}</span> <span>{item.week}</span></div>
                                <div className={styles.work}>
                                    <div className={styles.gotoWork}>上班:<span>{item.gotoWork}</span></div>
                                    <div className={styles.punchTime}>{item.gotoWork}</div>
                                </div>
                                <div className={styles.work}>
                                    <div className={styles.gooffWork}>下班:<span>{item.getoffWork}</span></div>
                                    <div className={styles.punchTime}>{item.getoffWork}</div>
                                </div>
                            </div>
                        )
                    }
                </div>   
                )
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
                <div className={styles.month}>
                   {
                       monthList.map((item,index) =><div key={index} onClick={ tabIndex === 0?ev =>this.getRecords(index):ev =>this.getAbnormal(index)} className={monthIndex === index? styles.currentMonth:styles.noMonth}>{item}月</div>)
                   } 
                </div>
                <Show></Show>          
            </div>
        )
    }
}
export default AttendanceRecord;