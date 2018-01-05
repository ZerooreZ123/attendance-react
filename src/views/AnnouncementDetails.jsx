import React,{Component} from 'react';
import styles from '../styles/AnnouncementDetails.css';

import XHR from '../utils/request';
import API from '../api/index';

import backImg from '../asset/ico/back.png';
import photo_1 from '../asset/photo-1.jpg';
import photo_2 from '../asset/photo-2.jpg';

class AnnouncementDetails extends Component{
    constructor() {
        super();
        this.state={
           dataSource:{},
           imgBox:[]
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '公告详情';
        this.noticeDetails();
    }
    backMove() {
        this.props.history.push('/userCenter');
    }
    async noticeDetails() {
        const result = await XHR.post(API.noticeDetails,{id:"dcfdbaed2e3d44d595ee7789d9bda85b"});
        this.setState({dataSource:JSON.parse(result).data});
        const ret = JSON.parse(result).data.image.slice(1).split('|');
        this.setState({imgBox:ret});
        
    }
    render(){
        const {dataSource,imgBox} = this.state;
        const admin = 'http://192.168.1.46:8080';
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.backMove(ev)} className={styles.back}><img className={styles.backImg} src={backImg} alt=""/>个人中心</div>
                    <div className={styles.title}>公告详情</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.caption}>{dataSource.title}</div>
                    <div className={styles.text}>{dataSource.content}</div>
                    <div className={styles.photoBox}>
                       {
                          imgBox.map((item,index) => <img key={index} src={admin+item} alt=""/>) 
                       }
                    </div>
                </div>
            </div>
        )
    }

}

export default AnnouncementDetails;