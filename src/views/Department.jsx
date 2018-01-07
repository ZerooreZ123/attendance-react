//部门（人事部)
import React,{Component} from 'react';
import styles from '../styles/Department.css';

import back from '../asset/ico/back.png';
import go from '../asset/manager/go.png';


class Department extends Component{
    constructor() {
        super();
        this.state={
            name:['叶湘伦','路小雨','段千雪']

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '部门';
    }
    personalInformation() {
        this.props.history.push('/personalInformation');
    }
    backMove() {
        this.props.history.push('/userCenter');
     }
    render() {
        const {name} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.backMove(ev)} className={styles.back}><img className={styles.backImg} src={back} alt=""/><span className={styles.backCaption}>个人中心</span></div>
                    <div className={styles.title}>人事部</div>
                </div>
                <div className={styles.content}>
                    {
                        name.map((item,index) =>
                            <div onClick={ev =>this.personalInformation(ev)} className={styles.item} key={index}>
                                <div className={styles.name}>{item}</div>
                                <img className={styles.forward} src={go} alt=""/>
                            </div> 
                        )
                    }
                </div>
            </div>
        )
    }

} 
export default Department