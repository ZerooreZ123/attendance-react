//员工资料
import React,{Component} from 'react';
import styles from '../styles/EmployeeInformation.css';

import back from '../asset/ico/back.png';
import search from '../asset/manager/search.png';
import forward from '../asset/manager/go.png';
import top from '../asset/manager/triangle-top.png';

class EmployeeInformation extends Component{
    constructor() {
        super();
        this.state={}
    }
    componentDidMount() {
        document.querySelector('title').innerText = '员工资料';
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人资料</div>
                    <div className={styles.title}>员工资料</div>
                    <img className={styles.search} src={search} alt=""/>     
                </div>
                <div className={styles.content}>
                     <div className={styles.dataList}>
                         <div className={styles.item}>
                             <div className={styles.department}>人事部</div>
                             <div className={styles.personnel}>
                                 <div className={styles.single}>
                                     <div className={styles.information}>
                                         <div className={styles.name}>王大宏</div>
                                         <div className={styles.phone}>13855667788</div>
                                     </div>
                                     <img className={styles.forward} src={forward} alt=""/>
                                 </div>
                                 <div className={styles.single}>
                                     <div className={styles.information}>
                                         <div className={styles.name}>王大宏</div>
                                         <div className={styles.phone}>13855667788</div>
                                     </div>
                                     <img className={styles.forward} src={forward} alt=""/>
                                 </div>
                             </div>
                         </div>
                         <div className={styles.item}>
                             <div className={styles.department}>采购部</div>
                             <div className={styles.personnel}>
                                 <div className={styles.single}>
                                     <div className={styles.information}>
                                         <div className={styles.name}>张天爱</div>
                                         <div className={styles.phone}>13855667788</div>
                                     </div>
                                     <img className={styles.forward} src={forward} alt=""/>
                                 </div>
                                 <div className={styles.single}>
                                     <div className={styles.information}>
                                         <div className={styles.name}>张天爱</div>
                                         <div className={styles.phone}>13855667788</div>
                                     </div>
                                     <img className={styles.forward} src={forward} alt=""/>
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>
                <div className={styles.footer}>智慧园区<img  className={styles.top} src={top} alt=""/></div>
            </div>
        )
    }
}

export default  EmployeeInformation;