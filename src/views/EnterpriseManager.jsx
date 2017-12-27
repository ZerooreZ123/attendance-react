//企业管理（xxx有限公司）
import React,{Component} from 'react';
import styles from '../styles/EnterpriseManager.css';

import back from '../asset/ico/back.png';
import go from '../asset/manager/go.png';

class EnterpriseManager extends Component{
    constructor() {
        super();
        this.state={

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '员工考勤记录';
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>南京XX责任有限公司</div>
                </div>
                <div className={styles.timetable}>
                   <div>邀请码</div>
                   <div className={styles.currentTimetable}>查看部门</div>
                   <div>考勤机编号</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <div className={styles.name}>人事部</div>
                        <img className={styles.forward} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.name}>行政部</div>
                        <img className={styles.forward} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.name}>产品部</div>
                        <img className={styles.forward} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.name}>财务部</div>
                        <img className={styles.forward} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.name}>服务部</div>
                        <img className={styles.forward} src={go} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}
export default EnterpriseManager;