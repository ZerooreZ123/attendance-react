//员工资料
import React,{Component} from 'react';
import styles from '../styles/EmployeeInformation.css';

import back from '../asset/ico/back.png';
import search from '../asset/manager/search.png';
import forward from '../asset/manager/go.png';
import upBlue from '../asset/manager/triangle-top.png';
import downBlue from '../asset/manager/downBlue.png';
import spread from '../asset/manager/spread.png';


const Direction = (props) => {
    if (props.checked === true) {
      return <img  className={styles.top} src={downBlue} alt=""/>;
    } else {
      return <img  className={styles.top} src={upBlue} alt=""/>;
    }
}

class EmployeeInformation extends Component{
    constructor() {
        super();
        this.state={
            mask:false,
            departmentStaff:[{
                department:'人事部',
                staff:[{
                    name:'叶湘伦',
                    phone:13489785689
                },{
                    name:'路小雨',
                    phone:12345678899
                }]
            },{
                department:'采购部',
                staff:[{
                    name:'残月风',
                    phone:13489785689
                },{
                    name:'江映雪',
                    phone:12345678899
                }]
            }       
            ],
            section:['人事部','采购部','行政部','业务部','研发部','技术部','智慧园区']
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '员工资料';
    }
    hideMask() {
        this.setState({ mask: false });
    }
      showMask() {
        this.setState({ mask: true });
    }
    clickTerm() {
        alert('hello') 
    }
    jumpSearch() {
        this.props.history.push('/search')
    }
    personalInformation() {
        this.props.history.push('/personalInformation')
    }
    backMove() {
        this.props.history.push('/userCenter');
     }
    render() {
        const {departmentStaff,section} = this.state;
        const Mask = props => {
            if (this.state.mask) {
                return (
                    <div className={styles.mask}>
                        <div className={styles.maskBox}>
                            <div className={styles.operation}>
                                <img className={styles.spread} src={spread} alt=""/>
                            </div>
                            <div className={styles.determine} onClick={ev =>this.hideMask(ev)}>确定</div>
                            <div className={styles.departmentBox}>
                                {
                                    section.map((item,index) =>
                                        <div onClick={ev =>this.clickTerm(ev)} className={styles.term} key={index}>{item}</div>
                                    )
                                }
                                <div className={styles.clearBoth}></div>
                            </div>
                            <div className={styles.footer}>智慧园区<Direction checked={true}/></div>
                        </div>
                    </div>
                );
            } else {
              return null;
            }
        }
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.backMove(ev)} className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>员工资料</div>
                    <img onClick={ev =>this.jumpSearch(ev)} className={styles.search} src={search} alt=""/>     
                </div>
                <div className={styles.content}>
                    {
                        departmentStaff.map((item,index) =>
                        <div className={styles.dataList} key={index}>
                            <div className={styles.item}>
                                <div className={styles.department}>{item.department}</div>
                                <div className={styles.personnel}>
                                {
                                    item.staff.map((item,index) =>
                                    <div onClick={ev =>this.personalInformation(ev)} className={styles.single} key={index}>
                                        <div className={styles.information}>
                                            <div className={styles.name}>{item.name}</div>
                                            <div className={styles.phone}>{item.phone}</div>
                                        </div>
                                        <img className={styles.forward} src={forward} alt=""/>
                                    </div>
                                )
                                }
                                </div>
                            </div>
                        </div>
                        ) 
                    }
                </div>
                <div className={styles.footer} onClick={ev =>this.showMask(ev)}>全部<Direction checked={true}/></div>
                <Mask></Mask>
            </div>
        )
    }
}

export default  EmployeeInformation;