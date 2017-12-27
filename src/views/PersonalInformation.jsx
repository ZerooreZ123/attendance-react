//员工个人信息(王大陆)
import React,{Component} from 'react';
import styles from '../styles/PersonalInformation.css';

import back from '../asset/ico/back.png';

class PersonalInformation extends Component {
    constructor() {
        super();
        this.state={

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '个人考勤记录';
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>叶湘伦</div>
                    <div className={styles.editProfile}>修改资料</div>     
                </div>
                <div className={styles.content}>
                    <div className={styles.information}>
                        <div className={styles.phone}>13855667788</div>
                        <div className={styles.department}>智慧部门</div>
                    </div>
                    <div className={styles.tabBox}>
                        <div className={styles.all}>全部</div>
                        <div className={styles.abnormal}>异常</div>
                    </div>
                    <div className={styles.month}>
                    <div className={styles.currentMonth}>12月</div>
                    <div>11月</div>
                    <div>10月</div>
                    <div>9月</div>
                    </div>
                    <div className={styles.detailsList}>
                        <div className={styles.item}>
                            <div className={styles.displayDate}><span>2018.8.28</span><span>周一</span></div>
                            <div className={styles.work}>
                                <div className={styles.gotoWork}>上班: <span>正常</span></div>
                                <div className={styles.punchTime}>08:25</div>
                            </div>
                            <div className={styles.work}>
                                <div className={styles.gooffWork}>下班: <span>正常</span></div>
                                <div className={styles.punchTime}>18:05</div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.displayDate}><span>2018.8.28</span><span>周一</span></div>
                            <div className={styles.work}>
                                <div className={styles.gotoWork}>上班: <span>正常</span></div>
                                <div className={styles.punchTime}>08:25</div>
                            </div>
                            <div className={styles.work}>
                                <div className={styles.gooffWork}>下班: <span>正常</span></div>
                                <div className={styles.punchTime}>18:05</div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.displayDate}><span>2018.8.28</span><span>周一</span></div>
                            <div className={styles.work}>
                                <div className={styles.gotoWork}>上班: <span className={styles.unusual}>迟到</span></div>
                                <div className={styles.punchTime}>09:25</div>
                            </div>
                            <div className={styles.work}>
                                <div className={styles.gooffWork}>下班: <span>正常</span></div>
                                <div className={styles.punchTime}>18:25</div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.displayDate}><span>2018.8.28</span><span>周一</span></div>
                            <div className={styles.work}>
                                <div className={styles.gotoWork}>上班: <span className={styles.unusual}>未打卡</span></div>
                                <div className={styles.punchTime}>08:45</div>
                            </div>
                            <div className={styles.work}>
                                <div className={styles.gooffWork}>下班: <span className={styles.unusual}>早退</span></div>
                                <div className={styles.punchTime}>18:25</div>
                            </div>
                        </div>
                    </div>             
                </div>
                <div className={styles.more}>查看更多</div>
            </div>
        )
    }
}
export default PersonalInformation;