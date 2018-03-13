import React,{Component} from 'react';
import DayPicker from 'react-day-picker';
import Toast from '../components/Toast';
import Alert from '../components/Alert';

import styles from '../styles/ReleaseAnnouncement.css';

import XHR from '../utils/request';
import API from '../api/index';
// import {server} from '../api/index';
// import {admin ,server} from '../api/route';

import X from '../asset/ico/ClearButton.png';
import addphoto from '../asset/ico/photo.png';
import top from '../asset/manager/triangle-top.png';
import down from '../asset/manager/downBlue.png';

// const Icon = ({direction})  => {
//     if (direction === true) {
//       return <img className={styles.icon} src={top} alt=""/>;
//     } else {
//       return <img className={styles.icon} src={down} alt=""/>;
//     }
// }


class ReleaseAnnouncement extends Component{
    constructor(){
        super();
        window.temp = {};               
        this.state = {
            tipState:false,           //tip状态
            secondTime:(new Date()).getTime(),             //秒
            alertState:false,            //alert状态
            // iconState:false,           //图标状态
            chooseDay:'',             //结束选择时间
            selectedDay:'',           //开始选择时间
            mask:false,               //日历开始遮罩
            copyMask:false,
            imgBox:[],                //图片盒子
            imgSrcConcat:[],          //拼接字符串
            announcementTitle:window.localStorage.getItem('title') || '',
            announcementContent:window.localStorage.getItem('content') || ''
        };
    }
    componentDidMount() {
        document.querySelector('title').innerText = '发布公告';
        this.startDate();
        this.backAlert();
    }
    componentWillUnmount() {
    }
    historyAnnouncement() {                    //跳转至历史记录
        this.props.history.push('/historyAnnouncement');
        // this.cancelRelease();
    }
    cancelRelease() {
        this.setState({alertState:true});
    }
    selectBtn(dataState) {
        if(dataState){
            window.localStorage.setItem('title',this.state.announcementTitle);
            window.localStorage.setItem('content',this.state.announcementContent);
            window.location.href = window.server + '/AttendanceFront/index.html#/userCenter/'+window.sessionStorage.getItem('loginName')+'/'+window.sessionStorage.getItem('companyid');
            // this.props.history.push('/attendanceData')
            // window.history.go(-1);
        }else{
            window.location.href = window.server + '/AttendanceFront/index.html#/userCenter/'+window.sessionStorage.getItem('loginName')+'/'+window.sessionStorage.getItem('companyid');
            // this.props.history.push('/attendanceData')
            // window.history.go(-1);
        }
    }
    startDate() {
        var date = new Date();
        this.setState({selectedDay:date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()});
        this.setState({chooseDay:date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()});
    }
    backAlert(){
        const current = window.location.href; 
        window.addEventListener("popstate", (e)=> {
            this.setState({alertState:true});
            console.log(window.location.href);
            if (current !== window.location.href) {
                window.location.href = current;
                // this.setState({alertState:true});
            }
        }, false);
    }
    handleDayClick(day) {
        var myDate = new Date(day);
        this.setState({secondTime:myDate.getTime()})
        this.setState({selectedDay:myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()});
        this.hideMask1();
    }
    selectDayClick(day) {
        var myDate = new Date(day);
        if(this.state.secondTime <= myDate.getTime()) {
            this.setState({chooseDay:myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()});
            this.setState({copyMask:false});
            this.hideMask2();
        }else{
            this.hideMask2();
            this.setState({tipState:true});
            setTimeout(()=>{
                this.setState({tipState:false})
            },2000)
        }

    }
    preClockInRemind(day) {
        setTimeout(()=>this.handleDayClick(day), 0);
    }
    selectTime(day) {
        setTimeout(()=>this.selectDayClick(day), 0);
    }
    showMask1() {
        this.setState({mask:true})
        // this.setState({iconState:false});
    }
    hideMask1() {
        this.setState({mask:false});
        // this.setState({iconState:true});
        setTimeout(()=>this.showMask2(),500)
    }
    showMask2() {
        this.setState({copyMask:true})
        // this.setState({iconState:false});
    }
    hideMask2() {
        this.setState({copyMask:false});
        // this.setState({iconState:true});
    }
    delete(i) {
        this.state.imgBox.splice(i,1);
        this.state.imgSrcConcat.splice(i,1);
        this.setState({imgBox:this.state.imgBox});
        this.setState({imgSrcConcat:this.state.imgSrcConcat});
    }
    getBase64(callback) {            //获取图片

        var data = this.refs.files.files;
        var file =[];
        for(var i in data){
            if (data.hasOwnProperty(i)) {
                file.push(data[i])
            }
        }
        file.forEach(el =>{
            if (window.FileReader) {
                var fr = new FileReader();
                fr.onloadend = function(e) {
                    var result = e.target.result.split(",");
                    callback(result[1])
                }
                fr.readAsDataURL(el);
            } else {
                alert("NO FileReader!");
            }
        })
    }
    getTitle(ev) {                             //获取标题
        this.setState({announcementTitle: ev.target.value});
    }
    getContent(ev) {                           //获取内容
        this.setState({announcementContent: ev.target.value});
    }
    async upload(stringBase64) {               //选择图片
        const result = await XHR.post(window.admin + API.upload,{imgStr:stringBase64});
        if(JSON.parse(result).success === 'T') {
            const imgSrc = window.server + JSON.parse(result).data.slice(1);
            this.state.imgSrcConcat.push(JSON.parse(result).data)
            this.state.imgBox.push(imgSrc);
            this.setState({imgBox:this.state.imgBox});
            this.setState({imgSrcConcat:this.state.imgSrcConcat});
        }else{
            alert(JSON.parse(result).msg)
        }
    }
    async announce() {                         //发布公告
        localStorage.clear();
        if(this.state.imgBox.length>0) {
            const result = await XHR.post(window.admin + API.announce,{
                userid:window.sessionStorage.getItem('id'),
                companyid:window.sessionStorage.getItem('companyid'),
                title:this.state.announcementTitle,
                content:this.state.announcementContent,
                image:this.state.imgSrcConcat.join(''),
                startDate:this.state.selectedDay + " 00:00:00",
                endDate: this.state.chooseDay+  " 00:00:00"    
            })
            if(JSON.parse(result).success === 'T'){
                window.sessionStorage.setItem('backTip',true)
                this.props.history.push('/historyAnnouncement')
            }else{
                alert(JSON.parse(result).msg)
            }
        }else{
            const result = await XHR.post(window.admin + API.announce,{
                userid:window.sessionStorage.getItem('id'),
                companyid:window.sessionStorage.getItem('companyid'),
                title:this.state.announcementTitle,
                content:this.state.announcementContent,
                startDate:this.state.selectedDay + " 00:00:00",
                endDate: this.state.chooseDay+  " 00:00:00"    
            })
            if(JSON.parse(result).success === 'T'){
                // alert("发布成功");
                window.sessionStorage.setItem('backTip',true)
                this.props.history.push('/historyAnnouncement')
            }else{
                alert(JSON.parse(result).msg)
            }
        }
    }
    render() {
        const {mask,copyMask,imgBox,alertState,tipState} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.cancelRelease(ev)} className={styles.cancel}>取消</div>
                    <div onClick={ev =>this.announce(ev)} className={this.state.chooseDay?styles.release:styles.noRelease}>发布</div>     
                </div>
                <div className={styles.content}>
                    <div className={styles.box}>
                       <input className={styles.inputBox} type="text" placeholder="公告标题" onChange={ev =>this.getTitle(ev)} value={this.state.announcementTitle} />
                    </div>
                    <textarea className={styles.inputBlock} placeholder="公告内容" onChange={ev =>this.getContent(ev)} value={this.state.announcementContent}></textarea>
                    <div className={styles.imgBox}>
                        {
                            imgBox.map((item,index) => (
                                <div className={styles.singleImg} key={index}>
                                    <img  className={styles.img} src={item} alt=""/>
                                    <img onClick={ev =>this.delete(index)}  className={styles.x} src={X} alt=""/>
                                </div>
                          
                            ))
                        }                   
                    </div>
                </div>
                <div className={styles.dateBox}>
                        <div className={styles.releaseTime}>公告起止日期:<span onClick={ev =>this.showMask1(ev)} className={styles.buttonSlect}>{this.state.selectedDay}</span><img className={styles.icon} src={down} alt=""/>-<span onClick={ev =>this.showMask2(ev)} className={styles.buttonSlect1}>{this.state.chooseDay}</span><img className={styles.icon} src={down} alt=""/></div>
                    </div>
                <div className={styles.footer}>
                        <div onClick={ev =>this.historyAnnouncement(ev)} className={styles.history}>历史公告</div>
                        <div className={styles.photoBox}>
                           <img className={styles.addphoto} src={addphoto} alt=""/>
                           <input ref="files" onChange={ev => this.getBase64(base64 => this.upload(base64))} type="file" className={styles.photoBtn} multiple="multiple"/>
                        </div>
                    {/* <div onClick={ev =>this.showMask2(ev)} className={styles.selectDate}>选择起止日期<Icon direction={iconState}/></div> */}
                </div>
                <div className={mask === false? styles.hideMask:styles.showMask}>
                   <div className={styles.maskBox}>
                     <DayPicker onDayClick={ev =>this.preClockInRemind(ev)} />
                    </div>
                </div>
                <div className={copyMask === false? styles.hideMask:styles.showMask}>
                   <div className={styles.maskBox}>
                     <DayPicker onDayClick={ev =>this.selectTime(ev)} />
                    </div>
                </div>
                <Alert text='是否保存草稿' onSelect={ev =>this.selectBtn(ev)} isShow={alertState}/>
                <Toast isShow={tipState} text="结束日期必须在开始日期之后或同一天"/>
            </div>
        )
    }
}

export default ReleaseAnnouncement;