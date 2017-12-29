import React,{Component} from 'react';
import styles from '../styles/AnnouncementDetails.css';

import backImg from '../asset/ico/back.png';
import photo_1 from '../asset/photo-1.jpg';
import photo_2 from '../asset/photo-2.jpg';

class AnnouncementDetails extends Component{
    constructor() {
        super();
        this.tate={

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '公告详情';
    }
    backMove() {
        this.props.history.push('/userCenter');
     }
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.backMove(ev)} className={styles.back}><img className={styles.backImg} src={backImg} alt=""/>个人中心</div>
                    <div className={styles.title}>公告详情</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.caption}>临时放假通知</div>
                    <div className={styles.text}>为照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾照顾</div>
                    <div className={styles.photoBox}>
                        <img src={photo_1} alt=""/>
                        <img src={photo_2} alt=""/>
                    </div>
                </div>
            </div>
        )
    }

}

export default AnnouncementDetails;