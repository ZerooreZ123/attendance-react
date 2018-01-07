//员工个人信息(王大陆)
import React,{Component} from 'react';
import styles from '../styles/PersonalInformation.css';

import back from '../asset/ico/back.png';

class PersonalInformation extends Component {
    constructor() {
        super();
        this.state={
            record:[
                {
                    date:'2018.8.27',
                    week:'周一',
                    goWorkState:'正常',
                    goWorkTime:'08:05',
                    offWorkState:'正常',
                    offWorkTime:'18:05'
                },{
                    date:'2018.8.28',
                    week:'周二',
                    goWorkState:'迟到',
                    goWorkTime:'08:50',
                    offWorkState:'未打卡',
                    offWorkTime:'18:05'
                }

            ]
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '个人考勤记录';
    }
    editData() {
        this.props.history.push('/editProfile');
    }
    backMove() {
        this.props.history.push('/userCenter');
     }
    render() {
        const { record } = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.backMove(ev)} className={styles.back}><img className={styles.backImg} src={back} alt=""/><span className={styles.backCaption}>个人中心</span></div>
                    <div className={styles.title}>叶湘伦</div>
                    <div onClick={ev =>this.editData(ev)} className={styles.editProfile}>修改资料</div>     
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
                        {
                            record.map((item,index) =>
                                <div className={styles.item} key={index}>
                                    <div className={styles.displayDate}><span>{item.date}</span><span>{item.week}</span></div>
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
                </div>
                <div className={styles.more}>查看更多</div>
            </div>
        )
    }
}
export default PersonalInformation;