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
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '考勤记录';
        this.getRecords();
    }
    backMove() {
        this.props.history.push('/userCenter');
    }
    showAll() {
        this.setState({showState:true});
        this.getRecords();
    }
    showAbnormal() {
        this.setState({showState:false});
        this.getAbnormal();
    }
    async getRecords() {             //获取全部打卡记录
        const result = await XHR.post(API.getRecords,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            beginDate:"2017-11-26",
            endDate:"2017-11-30",
            userids:"92548d4571604ff2912652ec8e3d44a6"    
        })
        this.setState({dataSource:JSON.parse(result).data});

    }
    async getAbnormal() {
        const result = await XHR.post(API.getRecords,{
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            beginDate:"2017-11-26",
            endDate:"2017-11-30",
            userids:"92548d4571604ff2912652ec8e3d44a6",
            abnormity:"abnormity"    
        })
        this.setState({dataAbnormal:JSON.parse(result).data});
    }
    render() {
        const {dataSource,dataAbnormal,showState} = this.state;
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
                    <div className={styles.back} onClick={ev =>this.backMove(ev)}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>
                        <div onClick={ev =>this.showAll(ev)} className={styles.currentTab}>全部</div>
                        <div onClick={ev =>this.showAbnormal(ev)} className={styles.tab}>异常</div>
                    </div>    
                </div>
                <div className={styles.month}>
                   <div className={styles.currentMonth}>12月</div>
                   <div>11月</div>
                   <div>10月</div>
                   <div>9月</div>
                </div>
                <Show></Show>          
            </div>
        )
    }
}
export default AttendanceRecord;