import React,{Component} from 'react';
import styles from '../styles/HistoryAnnouncement.css';

import XHR from '../utils/request';
import API from '../api/index';

import dataImg from '../asset/statePrompt/data.png';

const Module =({imgState,data,parent}) =>{
    if(data.length>0) {
        if(imgState){
            return(
                <div className={styles.content}>
                    {
                        data.map((ev,index) =>
                            <div className={styles.item} key={index} onClick={ev =>parent.announcementDetail()}>
                                <div className={styles.itemText}>
                                    <div className={styles.caption}>{ev.title}</div>
                                    <div className={styles.itemContent}>{ev.content}</div>
                                    <div className={styles.itemDate}>{ev.createDate}</div>
                                </div>
                                <img className={styles.itemImg}src={ev.image} alt=""/>
                            </div>
                        )
                    }
                </div>
            )   
        }else{
            return(
                <div className={styles.content}>
                    {
                        data.map((ev,index) =>
                            <div className={styles.item} key={index}  onClick={ev =>parent.announcementDetail()}>
                                <div>
                                    <div className={styles.caption}>{ev.title}</div>
                                    <div className={styles.itemContent}>{ev.content}</div>
                                    <div className={styles.itemDate}>{ev.createDate}</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            )   
        }
    }else{
        return (
            <div className={styles.blankBox}>
                 <div className={styles.box}>
                    <img className={styles.blankImg} src={dataImg} alt='' />
                    <div className={styles.font}>暂无公告</div>
                 </div>
            </div>
        )
    }
    
}

class HistoryAnnouncement extends Component{
    constructor() {
        super();
        this.state = {
            dataSource:[]
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '历史公告';
        this.noticeList();
    }
    announcementDetail() {
        this.props.history.push('/announcementDetails');
    }
    releaseAnnouncement() {
        this.props.history.push('/releaseAnnouncement');
    }
    async noticeList() {
        const admin = 'http://192.168.1.46:18080/'
        const result = await XHR.post(API.noticeList,{companyid:window.sessionStorage.getItem('companyid')});
        const ret = [];
        JSON.parse(result).data.forEach((item,index) =>{
            ret.push({
                title:item.title,
                content:item.content,
                createDate:item.createDate.slice(0,10).replace(/-/g,'.'),
            })
            if(item.image) {
               ret[index].image =admin + item.image.slice(2).split('|')[0];
            }
        })
        this.setState({dataSource:ret});

    }
    render() {
        const {dataSource} = this.state;
        return(
            <div className={styles.container}>
                <Module imgState={dataSource.image} data={dataSource} parent={this}/>
                <div onClick={ev =>this.releaseAnnouncement(ev)} className={styles.release}>发布公告</div>
            </div>
        )
    }
}
export default HistoryAnnouncement;
