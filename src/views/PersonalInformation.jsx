//员工个人信息(王大陆)
import React,{Component} from 'react';
import moment from 'moment';
import styles from '../styles/PersonalInformation.css';

import XHR from '../utils/request';
import API from '../api/index';

class PersonalInformation extends Component {
    constructor() {
        super();
        this.state = {
            dataSource:[],              //全部
            dataAbnormal:[],            //异常
            showState:true,             //默认展示全部
            monthList:[],               //月份列表
            monthIndex:0,               //月份索引
            tabIndex:0,                 //tab索引
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '个人考勤记录';
        this.showAll();
        this.getTime();
    }
    editData() {                     //跳转至修改资料
        this.props.history.push('/editProfile');
    }
    showAll(i) {                      //展示所有
        this.setState({showState:true});
        this.setState({tabIndex:0});
        this.getRecords(i);
        this.setState({monthIndex:0});
    }
    showAbnormal(i) {                 //展示异常
        this.setState({showState:false});
        this.setState({tabIndex:1});
        this.getAbnormal(i);
        this.setState({monthIndex:0});
    }
    getTime() {                      //获取当前月及前三月
        var nowMonth = moment().format("M");
        var previous = moment().subtract(1, "months").format("M");
        var penult = moment().subtract(2, "months").format("M");
        var last = moment().subtract(3, "months").format("M");
        var list =[nowMonth,previous,penult,last];
        this.setState({monthList:list});
    }
    async getRecords(i) {          //切换月份展示记录
        this.setState({monthIndex:i});
        var startTime ='';
        var endTime = '';
        switch(i){
            case 1:
                startTime = moment().startOf('month').subtract(1, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(1, "months").format("YYYY-MM-DD");
                break;
            case 2:
                startTime = moment().startOf('month').subtract(2, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(2, "months").format("YYYY-MM-DD");
                break;
            case 3:
                startTime = moment().startOf('month').subtract(3, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(3, "months").format("YYYY-MM-DD"); 
                break;
            default:
                startTime = moment().startOf('month').format("YYYY-MM-DD");
                endTime = moment().endOf('month').format("YYYY-MM-DD"); 
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
        var startTime ='';
        var endTime = '';
        switch(i){
            case 1:
                startTime = moment().startOf('month').subtract(1, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(1, "months").format("YYYY-MM-DD");
                break;
            case 2:
                startTime = moment().startOf('month').subtract(2, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(2, "months").format("YYYY-MM-DD");
                break;
            case 3:
                startTime = moment().startOf('month').subtract(3, "months").format("YYYY-MM-DD");
                endTime = moment().endOf('month').subtract(3, "months").format("YYYY-MM-DD"); 
                break;
            default:
                startTime = moment().startOf('month').format("YYYY-MM-DD");
                endTime = moment().endOf('month').format("YYYY-MM-DD"); 
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
        const { dataSource,dataAbnormal,monthList,monthIndex,tabIndex,showState} = this.state;
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
                                    <div className={styles.gotoWork}>上班:<span>{item.gotoWork.split('/')[1] ||''}</span></div>
                                    <div className={styles.punchTime}>{item.gotoWork.split('/')[0] || ''}</div>
                                </div>
                                <div className={styles.work}>
                                    <div className={styles.gooffWork}>下班:<span>{item.getoffWork.split('/')[1] || ''}</span></div>
                                    <div className={styles.punchTime}>{item.getoffWork.split('/')[0] || ''}</div>
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
                <div className={styles.content}>
                    <div className={styles.information}>
                        <div className={styles.phone}>13855667788</div>
                        <div className={styles.department}>智慧部门</div>
                    </div>
                    <div className={styles.tabBox}>
                        <div onClick={ev =>this.showAll(ev)} className={tabIndex === 0 ? styles.currentTab:styles.tab}>全部</div>
                        <div onClick={ev =>this.showAbnormal(ev)} className={tabIndex === 1 ? styles.currentTab:styles.tab}>异常</div>
                    </div>
                    <div className={styles.month}>
                        {
                          monthList.map((item,index) =>
                            <div onClick={ tabIndex === 0?ev =>this.getRecords(index):ev =>this.getAbnormal(index)} key={index} className={monthIndex === index ? styles.currentMonth:styles.noMonth}>{item}月</div>
                        )  
                        }
                    </div>
                    <Show></Show>
                </div>
                <div className={styles.bottomBar}>
                    <div className={styles.add}>查看更多</div>
                    <div onClick={ev =>this.editData(ev)} className={styles.editor}>修改资料</div>
                </div>
            </div>
        )
    }
}
export default PersonalInformation;