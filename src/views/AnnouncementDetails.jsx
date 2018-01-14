import React,{Component} from 'react';
import styles from '../styles/AnnouncementDetails.css';

import XHR from '../utils/request';
import API from '../api/index';

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