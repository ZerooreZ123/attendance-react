//企业管理（xxx有限公司）
import React,{Component} from 'react';
import styles from '../styles/EnterpriseManager.css';

import back from '../asset/ico/back.png';
import go from '../asset/manager/go.png';
import circle from '../asset/userCenter/circle_code.png';

class EnterpriseManager extends Component{
    constructor() {
        super();
        this.state={
            currentIndex:0,
            division:false,
            section:['人事部','采购部','行政部','业务部','研发部'],
            machineNum:['HASDKASDSD','SADFASFASA','ADSFASDFAS','DADSODPEDK']
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '企业管理';
    }
    addAttendanceMachine() {
        this.props.history.push('/addAttendanceMachine')
    }
    addDivision() {
        this.setState({division:true});
    }
    backMove() {
        this.props.history.push('/userCenter');
    }
    selectTab(i) {
        this.setState({currentIndex:i});
    }
    render() {
        const { section,machineNum,division} = this.state;
        const tab = ['邀请码','部门管理','考勤机编号']
        const Adddivision = props => {
            if(division) {
                return (
                    <div className={styles.item}>
                        <input className={styles.designation} defaultValue="输入部门名称" />
                        <img className={styles.forward} src={go} alt=""/>
                    </div>    
                )
            }else{
                return false;
            }
        }
        const TabContent = props => {
            if (this.state.currentIndex === 1) {
                return (
                    <div className={styles.content}>
                        <Adddivision></Adddivision>
                        {
                            section.map((item,index) =>
                                <div className={styles.item} key={index}>
                                    <div className={styles.name}>{item}</div>
                                    <img className={styles.forward} src={go} alt=""/>
                                </div>
                            )
                        }
                        <div onClick={ev =>this.addDivision(ev)} className={styles.add}>添加部门</div>
                    </div>
                );
            } else if(this.state.currentIndex === 2){
                return (
                    <div className={styles.content}>
                        {
                            machineNum.map((item,index) =>
                                <div className={styles.item} key={index}>
                                    <div className={styles.name}>考勤机{index}: {item}</div>
                                </div>
                            )
                        }
                        <div onClick={ev =>this.addAttendanceMachine(ev)} className={styles.add}>添加考勤机</div>
                    </div>
              )
            }else {
                return(
                    <div className={styles.content}>
                        <div className={styles.codeWrap}>
                        <div className={styles.codeContent}>
                            <img style={{width:170,height:170}} src={circle} alt=""/>
                            <div className={styles.code}>5666</div>
                        </div>
                        <div style={{marginTop:10}}>邀请码</div>
                        <div style={{marginTop:10,color:'gray'}}>分享邀请码即可让员工注册</div>
                        </div>

                        <div className={styles.shareBtn}>
                            <div>分享邀请码</div>
                        </div>
                    </div>
                )
            
            }
        }
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.backMove(ev)} className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>南京XX责任有限公司</div>
                </div>
                <div className={styles.timetable}>
                    {
                        tab.map((item,index) =><div onClick={ev =>this.selectTab(index)} key={index}>{item}</div>)
                    }
                </div>
                <TabContent></TabContent>
            </div>
        )
    }
}
export default EnterpriseManager;