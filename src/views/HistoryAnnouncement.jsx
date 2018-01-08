import React,{Component} from 'react';
import styles from '../styles/HistoryAnnouncement.css';

import XHR from '../utils/request';
import API from '../api/index';

import backImg from '../asset/ico/back.png';

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
    backMove() {
        window.history.go(-1);
    }
    releaseAnnouncement() {
        this.props.history.push('/releaseAnnouncement');
    }
    async noticeList() {
        const admin = 'http://192.168.1.46:18080/'
        const result = await XHR.post(API.noticeList,{companyid:"4a44b823fa0b4fb2aa299e55584bca6d"});
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
                <div className={styles.header}>
                    <img onClick={ev =>this.backMove(ev)} className={styles.back} src={backImg} alt=""/>
                    <div className={styles.title}>历史公告</div>
                    <div onClick={ev =>this.releaseAnnouncement(ev)} className={styles.release}>发布公告</div>
                </div>
                <div className={styles.content}>
                    {
                        dataSource.map((ev,index) =>
                            <div className={styles.item} key={index}>
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
            </div>
        )
    }
}
export default HistoryAnnouncement;
