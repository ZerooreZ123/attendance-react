//员工考勤记录（普通管理员）
import React,{Component} from 'react';
import styles from '../styles/AttendanceData.css';

import back from '../asset/ico/back.png';
import top from '../asset/manager/triangle-top.png';

class AttendanceData extends Component{
    constructor() {
        super();
        this.state={
            currentIndex:0,
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
    }
    backMove() {
        this.props.history.push('/userCenter');
    }
    export() {
        this.props.history.push('/exportData');
    }
    selectTime(i) {
        this.setState({currentIndex:i});
    }
    personalInformation() {
        this.props.history.push('/personalInformation');
    }
    render() {
        const {record,currentIndex,dataSource} = this.state;
        const timeSlot = ['日','月','年'];
        const DateChange = props => {
            if(currentIndex === 0){
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
            }else if(currentIndex === 1){
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
            }else{
                return null;
            }
        }
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back} onClick={ev =>this.backMove(ev)}><img className={styles.backImg} src={back} alt=""/><span className={styles.backCaption}>个人中心</span></div>
                    <div className={styles.title}>
                        <div className={styles.currentTab}>全部</div>
                        <div className={styles.tab}>异常</div>
                    </div>    
                </div>
                <div className={styles.timetable}>
                    {
                        timeSlot.map((item,index) =><div onClick={ev =>this.selectTime(index)} key={index}>{item}</div>)
                    }
                </div>
                <DateChange></DateChange>
                <div className={styles.footer}>
                    <div className={styles.brief}>
                        <span>2017.12.15</span>/<span>智慧园区</span>
                        <img className={styles.top} src={top} alt=""/>
                    </div>
                    <div onClick={ev =>this.export(ev)} className={styles.exportData}>导出数据</div>
                </div>            
            </div>
        )
    }
}
export default AttendanceData;