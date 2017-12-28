import React,{Component} from 'react';
import styles from '../styles/RevisionDepartment.css';

import back from '../asset/ico/back.png'

class RevisionDepartment extends Component{
    constructor(){
        super();
        this.state={
            section:['人事部','采购部','行政部','业务部','研发部','技术部','智慧园区']
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '修改部门';
    }
    render() {
        const {section} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>修改部门</div>
                </div>
                <div className={styles.information}>
                    <div className={styles.name}>王大宏</div>
                    <div className={styles.department}>智慧园区</div>
                </div>
                <div className={styles.departmentBox}>
                {
                    section.map((item,index) =>
                        <div className={styles.item} key={index}>{item}</div>
                    )
                }
                </div>
                <div className={styles.edit}>
                    <div className={styles.cancel}>取消</div>
                    <div className={styles.confirm}>确认</div>
                </div>
            </div>
        )
    }
}
export default RevisionDepartment;