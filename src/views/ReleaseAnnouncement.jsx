import React,{Component} from 'react';
import styles from '../styles/ReleaseAnnouncement.css';

import XHR from '../utils/request';
import API from '../api/index';

import photoMin from '../asset/photo-min.jpg';
import addphoto from '../asset/ico/photo.png';
import top from '../asset/manager/triangle-top.png';


class ReleaseAnnouncement extends Component{
    constructor(){
        super();
        window.temp = {};               
        this.state = {
            announcementTitle:window.localStorage.getItem('title') || '',
            announcementContent:window.localStorage.getItem('content') || ''
        };
    }
    componentDidMount() {
        document.querySelector('title').innerText = '发布公告';
    }
    historyAnnouncement() {                    //跳转至历史记录
        this.props.history.push('/historyAnnouncement');
    }
    cancelRelease() {
        let mes = "是否保存草稿";
        if(window.confirm(mes) === true) {
            window.localStorage.setItem('title',this.state.announcementTitle);
            window.localStorage.setItem('content',this.state.announcementContent);
           window.history.go(-1);
        }else{
            window.history.go(-1);
        }
    }
    selectImg() {                              //调用相册
        var objUrl = window.ajaxFileUpload(this.files[0]);
    }
    getTitle(ev) {                             //获取标题
        this.setState({announcementTitle: ev.target.value});
    }
    getContent(ev) {                           //获取内容
        this.setState({announcementContent: ev.target.value});
    }
    async announce() {                         //发布公告
        const result = await XHR.post(API.announce,{
            userid:"e7c800b0d173438292dab8cd23be8ba5",
            companyid:"4a44b823fa0b4fb2aa299e55584bca6d",
            title:this.state.announcementTitle,
            content:this.state.announcementContent,
            startDate:"2018-01-02 00:00:00",
	        endDate:"2018-01-03 00:00:00"    
        })
        if(JSON.parse(result).success === 'T'){
            alert("发布成功");
            window.history.go(-1);
        }else{
            alert(JSON.parse(result).msg)
        }
    }
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.cancelRelease(ev)} className={styles.cancel}>取消</div>
                    <div onClick={ev =>this.announce(ev)} className={styles.release}>发布</div>     
                </div>
                <div className={styles.content}>
                    <div className={styles.box}>
                       <input type="text" className={styles.inputBox} placeholder="公告标题" onChange={ev =>this.getTitle(ev)} value={this.state.announcementTitle} />
                    </div>
                    <textarea className={styles.inputBlock} placeholder="公告内容" onChange={ev =>this.getContent(ev)} value={this.state.announcementContent}></textarea>
                    <div className={styles.imgBox}>
                        {/* <img className={styles.img} src={photoMin} alt=""/>                    */}
                    </div>
                    <div className={styles.releaseTime}>公告将发布于:<span>2018年1月18日</span>-<span>2018年1月21日</span></div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.case}>
                        <div onClick={ev =>this.historyAnnouncement(ev)} className={styles.history}>历史公告</div>
                        <div className={styles.photoBox}>
                           <img onClick={ev =>this.selectImg(ev)} className={styles.addphoto} src={addphoto} alt=""/>
                           <input type="file" className={styles.photoBtn} multiple="multiple"/>
                        </div>
                    </div>
                    <div className={styles.selectDate}>选择起止日期<img src={top} alt=""/></div>
                </div>
            </div>
        )
    }
}

export default ReleaseAnnouncement;