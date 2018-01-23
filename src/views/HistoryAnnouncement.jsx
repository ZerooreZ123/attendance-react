import React,{Component} from 'react';
import styles from '../styles/HistoryAnnouncement.css';

import XHR from '../utils/request';
import API from '../api/index';
import {server} from '../api/index';

import dataImg from '../asset/statePrompt/data.png';

const Module =({imgHave,data,parent}) =>{
    if(data.length>0) {
        return(
            <div className={styles.content}>
                {
                    data.map((ev,index) =>
                        <div className={styles.item} key={index} onClick={ev =>parent.announcementDetail(index)}>
                            <div className={styles.itemText}>
                                <div className={styles.caption}>{ev.title}</div>
                                <div className={styles.itemContent}>{ev.content}</div>
                                <div className={styles.itemDate}>{ev.createDate}</div>
                            </div>
                            <img className={ ev.hasOwnProperty('image')?styles.itemImg:styles.hideImg}src={ev.image} alt=""/>
                        </div>
                    )
                }
            </div>
        )   
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
            dataSource:[],
            img:''
        }
    }
    componentDidMount() {
        // document.querySelector('title').innerText = '历史公告';
        this.noticeList();
    }
    announcementDetail(i) {
        window.sessionStorage.setItem('listId', this.state.dataSource[i].id);
        this.props.history.push('/announcementDetails');
    }
    releaseAnnouncement() {
        this.props.history.push('/releaseAnnouncement');
    }
    async noticeList() {
        const result = await XHR.post(API.noticeList,{companyid:window.sessionStorage.getItem('companyid')});
        const ret = [];
        JSON.parse(result).data.forEach((item,index) =>{
            ret.push({
                id:item.id,
                title:item.title,
                content:item.content,
                createDate:item.createDate.slice(0,10).replace(/-/g,'.'),
            })
            if(item.hasOwnProperty('image')) {
                this.setState({img:true})
               ret[index].image = server + item.image.slice(1).split('|')[0];
            }
        })
        this.setState({dataSource:ret});
        console.log(this.state.dataSource);

    }
    render() {
        const {dataSource,img} = this.state;
        return(
            <div className={styles.container}>
                <Module imgHave={img} data={dataSource} parent={this}/>
                <div onClick={ev =>this.releaseAnnouncement(ev)} className={styles.release}>发布公告</div>
            </div>
        )
    }
}
export default HistoryAnnouncement;
