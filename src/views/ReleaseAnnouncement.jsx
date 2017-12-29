import React,{Component} from 'react';
import styles from '../styles/ReleaseAnnouncement.css';

import photoMin from '../asset/photo-min.jpg';
import addphoto from '../asset/ico/photo.png';
import top from '../asset/manager/triangle-top.png';


class ReleaseAnnouncement extends Component{
    constructor(){
        super();
        this.state={

        };
    }
    componentDidMount() {
        document.querySelector('title').innerText = '发布公告';
    }
    historyAnnouncement() {
        this.props.history.push('/historyAnnouncement');
    }
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.cancel}>取消</div>
                    <div className={styles.title}>发布公告</div>
                    <div className={styles.release}>发布</div>     
                </div>
                <div className={styles.content}>
                    <div className={styles.box}>
                       <input type="text" className={styles.inputBox} placeholder='公告标题' />
                    </div>
                    <textarea className={styles.inputBlock} placeholder="公告内容"></textarea>
                    <div className={styles.imgBox}>
                        <img className={styles.img} src={photoMin} alt=""/> 
                        <img className={styles.img} src={photoMin} alt=""/> 
                        <img className={styles.img} src={photoMin} alt=""/>  
                        <img className={styles.img} src={photoMin} alt=""/>  
                        <img className={styles.img} src={photoMin} alt=""/>  
                        <img className={styles.img} src={photoMin} alt=""/>  
                        <img className={styles.img} src={photoMin} alt=""/>    
                        <img className={styles.img} src={photoMin} alt=""/>   
                        <img className={styles.img} src={photoMin} alt=""/>                         
                    </div>
                    <div className={styles.releaseTime}>公告将发布于:<span>2018年1月18日</span>-<span>2018年1月21日</span></div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.case}>
                        <div onClick={ev =>this.historyAnnouncement(ev)} className={styles.history}>历史公告</div>
                        <div className={styles.photoBox}>
                           <img className={styles.addphoto} src={addphoto} alt=""/>
                        </div>
                    </div>
                    <div className={styles.selectDate}>选择起止日期<img src={top} alt=""/></div>
                </div>
            </div>
        )
    }
}

export default ReleaseAnnouncement;