import React,{Component} from 'react';
import styles from '../styles/AnnouncementDetails.css';

import XHR from '../utils/request';
import API from '../api/index';
import {server} from '../api/index';

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
    async noticeDetails() {
        const result = await XHR.post(API.noticeDetails,{id:window.sessionStorage.getItem('listId')});
        this.setState({dataSource:JSON.parse(result).data});
        if(JSON.parse(result).data.hasOwnProperty('image')){
            const ret = JSON.parse(result).data.image.slice(1).split('|');
            this.setState({imgBox:ret});   
        }
         
    }
    render(){
        const {dataSource,imgBox} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.caption}>{dataSource.title}</div>
                    <div className={styles.text}>{dataSource.content}</div>
                    <div className={styles.photoBox}>
                       {
                          imgBox.map((item,index) => <img key={index} src={server+item} alt=""/>) 
                       }
                    </div>
                </div>
            </div>
        )
    }

}

export default AnnouncementDetails;