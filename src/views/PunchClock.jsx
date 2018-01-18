import React, { Component } from 'react';
import styles from '../styles/PunchClock.css';

import XHR from '../utils/request';
import API from '../api/index';

import delete_1 from '../asset/ico/close.png';
import person from '../asset/punchClock/person-2.png';
import clock from '../asset/punchClock/loction-2.png';
import notice from '../asset/punchClock/notice.png';
import warn from '../asset/punchClock/abnormal.png';
import load from '../asset/punchClock/load.png';
import successMin from '../asset/punchClock/successMin.png';
import success from '../asset/punchClock/success.png';
// import rankingListIco from '../asset/punchClock/rankingListIco.png';
// import headPortrait from '../asset/userCenter/headPortrait.png';
// import X from '../asset/punchClock/X.png';
// import up from '../asset/punchClock/up.png';
// import down from '../asset/punchClock/down.png';



// const Mask = ({visible,parent,information}) => {
//   if (visible) {
//     return (
//       <div className={styles.mask}>
//         <div className={styles.maskBox}>
//           <div className={styles.maskHeader}>
//               <div className={styles.maskTitle}><div className={styles.titleText}>一月排行榜</div></div>
//               <img  onClick={ev =>parent.hideMask(ev)}src={X} className={styles.x}  alt=""/>
//           </div>
//           <div className={styles.own}>
//                <div className={styles.ownInfo}><img src={headPortrait} className={styles.touXiang} alt=""/><span className={styles.ownName}>王大宏</span> <span className={styles.num}>30</span><img  className={styles.up} src={up} alt=""/><span className={styles.numUp}>2</span></div>
//                <div className={styles.allTime}>140小时50分钟</div>
//           </div>
//           <div className={styles.chartsList}>
//             {
//               information.map((item,index) =>
//               <div className={styles.personal} key={index}>
//                 <div><span>{index+1}</span><span className={styles.personalName}>{item.name}</span><span className={styles.branch}>{item.officeName}</span></div>
//                 <div className={styles.allTime}>{item.duration}</div>
//               </div>
//               )
//             }
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return null;
//   }
// }


class PunchClock extends Component {
    constructor() {
        super();
        this.state = {
          h:'',                    //时
          m:'',                    //分
          s:'',                    //秒
          month:'',                //月
          day:'',                  //日
          weekday:'',              //周几
          prompt:1,                //考勤机状态
          noticeState:true,        //通知显示
          // mask:false,              //排行榜遮罩
          // dataList:[],             //排行榜数据
          normalDay:''

        };
      }
    componentDidMount() {
        document.querySelector('title').innerText = '考勤打卡';
        // this.getNormalDays();
        this.showTime();
    }
    userCenter() {                    //切换至个人中心
      this.props.history.push('/userCenter/' +this.props.match.params.loginName);
    }
    AnnouncementDetails(ev) {         //切换至公告详情
      ev.stopPropagation();
      this.props.history.push('/announcementDetails');
    }                        
    showTime() {                      //刷新当前时间/1秒
      setInterval(ev =>this.getTime(ev),1000)
    }
    hideMask() {
      this.setState({ mask: false }); //隐藏
    }
    showMask() {                      
      this.setState({ mask: true });  //显示
      this.rankingList();
    }
    refresh() {                       //刷新页面
      this.setState({prompt:0})
    }
    noteceDelete() {                  //删除通知
      this.setState({noticeState:false});
    }
    getTime() {                       //获取当前时/分/秒/月/日/星期
      var data = new Date();
      this.setState({h:data.getHours()<10?'0'+data.getHours():data.getHours()});
      this.setState({m:data.getMinutes()<10?'0'+data.getMinutes():data.getMinutes()});
      this.setState({s:data.getSeconds()<10?'0'+data.getSeconds():data.getSeconds()});
      this.setState({month:data.getMonth()+1});
      this.setState({day:data.getDate()});
      switch(data.getDay()) {
        case 0:
            this.setState({weekday:'日'});
            break;
        case 1:
            this.setState({weekday:'一'});
            break;
        case 2:
            this.setState({weekday:'二'});
            break;
        case 3:
            this.setState({weekday:'三'});
            break;
        case 4:
            this.setState({weekday:'四'});
            break;
        case 5:
            this.setState({weekday:'五'});
            break;
        default:
            this.setState({week:'六'});
      }
      
    }
    async clockIn() {                //员工打卡
      const result = await XHR.post(API.clockIn,{loginName:this.props.match.params.loginName});
      if(JSON.parse(result).success === "T") {
        this.setState({prompt:3})
      }else{
        this.setState({prompt:2})
      }
    }
    // async rankingList() {            //获取排行榜
    //   const result = await XHR.post(API.rankingList,{companyid:"4a44b823fa0b4fb2aa299e55584bca6d"});
    //   this.setState({dataList:JSON.parse(result).data || []});
     
    // }
    // async getNormalDays() {         //获取正常打卡天数
    //   const result = await XHR.post(API.getTime,{loginName:"18550117460"})
    //   this.setState({normalDay:JSON.parse(result).data});
    // }
    render() {
      const {prompt,h,m,s,noticeState,normalDay} = this.state;
      const Notice = props => {
        if(noticeState){
          return(
            <div className={styles.noticeBoard}>
              <img className={styles.noticeImg} src={notice} alt=""/>
              <span onClick={ev =>this.AnnouncementDetails(ev)} className={styles.noticeText}>元旦放假通知,放假具体时间为30、31、1号</span>
              <img onClick={ev =>this.noteceDelete(ev)} className={styles.noteceDelete} src={delete_1} alt=""/>
            </div>
          )
          }else{
            return null
        }
      } 
      const ClockPage = props => {
        if(prompt ===0) {            //搜索中
          return (
            <div className={styles.content}>
              <div className={styles.clickClock}>
                <div className={styles.ring}></div>
                <div className={styles.clickButton}>
                  <div className={styles.clockOn}>打卡</div>
                  <div className={styles.clockDate}>{h}:{m}:{s}</div>
                </div>
              </div>
              <div className={styles.prompt}>
                <img className={styles.promptImg} src={load} alt=""/><span className={styles.text}>正在搜索考勤机...</span>
              </div>
              <div className={styles.refreshHide}>刷新页面</div>
              <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
            </div>
          )
        }else if(prompt === 1){      //可打卡
          return (
            <div className={styles.content}>
              <div className={styles.clickClock}>
                <div className={styles.circular}></div>
                <div onClick={ev =>this.clockIn(ev)} className={styles.clickButton}>
                  <div className={styles.clockCan}>打卡</div>
                  <div className={styles.clockDate}>{h}:{m}:{s}</div>
                </div>
              </div>
              <div className={styles.prompt}>可以打卡了</div>
              <div className={styles.refreshHide}>刷新页面</div>
              <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
            </div>
          )
        }else if(prompt === 2) {     //打卡异常
          return (
            <div className={styles.content}>
              <div className={styles.clickClock}>
                <div className={styles.circular}></div>
                <div className={styles.clickButton}>
                  <div className={styles.clockOn}>打卡</div>
                  <div className={styles.clockDate}>{h}:{m}:{s}</div>
                </div>
              </div>
              <div className={styles.prompt}>
                <img className={styles.promptImg} src={warn} alt=""/><span className={styles.text}>网络连接异常,蓝牙未打开</span>
              </div>
              <div onClick={ev =>this.refresh(ev)} className={styles.refreshShow}>刷新页面</div>
              <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
            </div>
          )
        }else{                      //打卡成功
          return (
            <div className={styles.content}>
              <div className={styles.clickClock}>
                <img className={styles.cardFinish} src={success} alt=""/>
                <div className={styles.cardTime}>
                  <div className={styles.clockDate}>{h}:{m}:{s}</div>
                </div>
              </div>
              <div className={styles.prompt}>
                <img className={styles.promptImg} src={successMin} alt=""/><span className={styles.text}>打卡成功!</span>
              </div>
              <div className={styles.refreshHide}>刷新页面</div>
              <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
            </div>
          )
        }
      }
      return (
        <div className={styles.container}>
          {/* <div className={styles.headerTip}>
              <div className={styles.time}><span>连续正常打卡{normalDay}天</span></div>
              <div onClick={ev =>this.showMask(ev)} className={styles.rankingList}><img className={styles.rankingListImg} src={rankingListIco} alt=""/><span className={styles.rankingListText}>排行榜</span></div>
          </div> */}
          <Notice></Notice>
          <ClockPage></ClockPage>
          <div className={styles.tabBox}>
            <div className={styles.tab}>
              <img className={styles.tabImg} src={clock} alt=""/>
              <div>考勤打卡</div>
            </div>
            <div className={styles.tab} onClick={ev =>this.userCenter(ev)} >
              <img className={styles.tabImg} src={person} alt=""/>
              <div>个人中心</div>
            </div>
          </div>
          {/* <Mask visible={this.state.mask} parent={this} information={this.state.dataList}></Mask> */}
        </div>
      );
    }

}
 export  default PunchClock;