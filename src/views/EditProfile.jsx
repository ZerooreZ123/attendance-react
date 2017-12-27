//员工个人资料修改
import React,{Component} from 'react';
import styles from '../styles/EditProfile.css';

import back from '../asset/ico/back.png';
import top from '../asset/manager/triangle-top.png';

class EditProfile extends Component{
    constructor() {
        super();
        this.state={}
    }
    componentDidMount() {
        document.querySelector('title').innerText = '修改资料';
    }
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>员工资料</div>
                    <div className={styles.title}>修改资料</div>
                    <div className={styles.confirm}>确定</div>     
                </div>
                <div className={styles.content}>
                    <div className={styles.information}>
                        <input className={styles.name} type="text" defaultValue='叶湘伦' />
                        <div className={styles.department}>智慧部门</div>
                    </div>
                </div>
                <div className={styles.selectDepartment}>选择部门<img src={top}className={styles.top} alt=""/></div>
            </div>
        )
    }

}

export default EditProfile;