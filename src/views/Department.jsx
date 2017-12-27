//部门（人事部)
import React,{Component} from 'react';
import styles from '../styles/Department.css';

import back from '../asset/ico/back.png';
import go from '../asset/manager/go.png';


class Department extends Component{
    constructor() {
        super();
        this.state={

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '部门';
    }
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.back}><img className={styles.backImg} src={back} alt=""/>个人中心</div>
                    <div className={styles.title}>人事部</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <div className={styles.name}>叶湘伦</div>
                        <img className={styles.forward} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.name}>路小雨</div>
                        <img className={styles.forward} src={go} alt=""/>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.name}>段千雪</div>
                        <img className={styles.forward} src={go} alt=""/>
                    </div>
                </div>
            </div>
        )
    }

} 
export default Department