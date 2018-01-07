import React,{Component} from 'react';
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
        this.getParameter();
    }
    backMove() {
        this.props.history.push('/userCenter');
    }
    selectMonth(i) {
        this.setState({monthIndex:i});
    }
    showMonth() {                    //展示当前及前三月
        var data = new Date();
        var year = data.getFullYear();
        var month = data.getMonth()+1;
        switch(month) {
            case 1:
               var list = [1,12,11,10];
               break;
            case 2:
               var list = [2,1,12,11];
               break;
            case 3:
               var list = [3,2,1,12];
               break;
            default:
               list =[month,month-1,month-2,month-3]
        }
        this.setState({monthList:list});
        this.setState({getYear:year});
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
    getParameter() {
        var date = new Date();
        var year = date.getFullYear();
        
    }
    async getRecords(i) {             //获取全部打卡记录
        console.log(this.state.getYear);
        console.log(this.state.monthList[i]);
        const result = await XHR.post(API.getRecords,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            beginDate:"2017-11-26",  
            endDate:"2017-11-30",
            userids:"92548d4571604ff2912652ec8e3d44a6"    
        })
        this.setState({dataSource:JSON.parse(result).data});

    }
    async getAbnormal() {            //获取异常打卡记录
        const result = await XHR.post(API.getRecords,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            beginDate:"2017-11-26",    //
            endDate:"2017-11-30",
            userids:"92548d4571604ff2912652ec8e3d44a6",
            abnormity:"abnormity"    
        })
        this.setState({dataAbnormal:JSON.parse(result).data});
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
                                    <div className={styles.gotoWork}>上班:<span>{item.gotoWork.split('/')[1]}</span></div>
                                    <div className={styles.punchTime}>{item.gotoWork.split('/')[0]}</div>
                                </div>
                                <div className={styles.work}>
                                    <div className={styles.gooffWork}>下班:<span>{item.getoffWork.split('/')[1]}</span></div>
                                    <div className={styles.punchTime}>{item.getoffWork.split('/')[0]}</div>
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
                                    <div className={styles.gotoWork}>上班:<span>{item.gotoWork.split('/')[1]}</span></div>
                                    <div className={styles.punchTime}>{item.gotoWork.split('/')[0]}</div>
                                </div>
                                <div className={styles.work}>
                                    <div className={styles.gooffWork}>下班:<span>{item.getoffWork.split('/')[1]}</span></div>
                                    <div className={styles.punchTime}>{item.getoffWork.split('/')[0]}</div>
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
                       monthList.map((item,index) =><div key={index} onClick={ev =>this.selectMonth(index)} className={monthIndex === index? styles.currentMonth:styles.noMonth}>{item}月</div>)
                   } 
                </div>
                <Show></Show>          
            </div>
        )
    }
}
export default AttendanceRecord;