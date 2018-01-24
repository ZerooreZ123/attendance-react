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
const Notice =({noticeState,parent,title})=> {
  if (noticeState) {
    return (
      <div className={styles.noticeBoard}>
        <img className={styles.noticeImg} src={notice} alt="" />
        <span onClick={ev => parent.AnnouncementDetails(ev)} className={styles.noticeText}>{title}</span>
        <img onClick={ev => parent.noteceDelete(ev)} className={styles.noteceDelete} src={delete_1} alt="" />
      </div>
    )
  } else {
    return null
  }
}

class PunchClock extends Component {
  constructor() {
    super();
    this.state = {
      h: '',                    //时
      m: '',                    //分
      s: '',                    //秒
      result:{},
      prompt: 0,                //考勤机状态
      noticeState: true,        //通知显示
      noticeTitle:'',           //公告标题
      // mask:false,              //排行榜遮罩
      // dataList:[],             //排行榜数据
      normalDay: ''

    };
  }
  componentDidMount() {
    // document.querySelector('title').innerText = '考勤打卡';
    // this.getNormalDays();
    this.showTime();
    this.noticeList();
    // this.searchIbeacons();
  }
  userCenter() {                    //切换至个人中心
    this.props.history.push('/userCenter/' + this.props.match.params.loginName);
  }
  AnnouncementDetails(ev) {         //切换至公告详情
    ev.stopPropagation();
    this.props.history.push('/HistoryAnnouncement');
  }
  showTime() {                      //刷新当前时间/1秒
    setInterval(ev => this.getTime(ev), 1000)
  }
  hideMask() {
    this.setState({ mask: false }); //隐藏
  }
  showMask() {
    this.setState({ mask: true });  //显示
    this.rankingList();
  }
  refresh() {                       //刷新页面
    this.setState({ prompt: 0 })
  }
  noteceDelete() {                  //删除通知
    this.setState({ noticeState: false });
  }
  getTime() {                       //获取当前时/分/秒/月/日/星期
    var data = new Date();
    this.setState({ h: data.getHours() < 10 ? '0' + data.getHours() : data.getHours() });
    this.setState({ m: data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes() });
    this.setState({ s: data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds() });
  }
  async searchIbeacons() {
    const result = await XHR.post(API.getSignature);
    if(JSON.parse(result).success === 'T') {
      this.setState({
         result:{
            timestamp:JSON.parse(result).data.timestamp,
            nonceStr:JSON.parse(result).data.noncestr,
            signature:JSON.parse(result).data.signature
         }  
      })
    }
    window.wx.config({
      debug:true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx361547ce36eb2185', // 必填，公众号的唯一标识
      timestamp:this.state.result.timestamp, // 必填，生成签名的时间戳
      nonceStr:this.state.result.nonceStr, // 必填，生成签名的随机串
      signature:this.state.result.signature,// 必填，签名
      jsApiList: ['startMonitoringBeacons'] // 必填，需要使用的JS接口列表
    });
    window.wx.onSearchBeacons({
      complete:function(argv){
      //回调函数，可以数组形式取得该商家注册的在周边的相关设备列表
         if(argv.length>0) {
             alert("hahah")
         }else{
           alert('eeeee')
         }
      }
    });
    // window.wx.startSearchBeacons({
    //   ticket: "",
    //   complete: function (argv) {
    //         //开启查找完成后的回调函数

    //         console.log(argv)
    //         // 监听iBeacon信号
    //         window.wx.onSearchBeacons({
    //           complete:function(argv){
    //           //回调函数，可以数组形式取得该商家注册的在周边的相关设备列表
    //           }
    //         });

    //   }
    // });
  }

  // // 超时停止扫描
  // setTimeout(function () {
  //   wx.stopSearchBeacons({
  //     complete:function(res){
  //     //关闭查找完成后的回调函数
  //     }
  //   }), 5000);

  async noticeList() {
    const result = await XHR.post(API.noticeList,{companyid:window.sessionStorage.getItem('companyid')});
    if(JSON.parse(result).data.length>0) {
      this.setState({noticeTitle:JSON.parse(result).data[0].title});
    }else{
      this.setState({noticeState:false})
    }

}
  async clockIn() {                //员工打卡
    const result = await XHR.post(API.clockIn, { loginName: this.props.match.params.loginName });
    if (JSON.parse(result).success === "T") {
      this.setState({ prompt: 3 })
    } else {
      this.setState({ prompt: 2 })
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
    const { prompt, h, m, s, noticeState,noticeTitle} = this.state
    const ClockPage = props => {
      if (prompt === 0) {            //搜索中
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
              <img className={styles.promptImg} src={load} alt="" /><span className={styles.text}>正在搜索考勤机...</span>
            </div>
            <div className={styles.refreshHide}>刷新页面</div>
            <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
          </div>
        )
      } else if (prompt === 1) {      //可打卡
        return (
          <div className={styles.content}>
            <div className={styles.clickClock}>
              <div className={styles.circular}></div>
              <div onClick={ev => this.clockIn(ev)} className={styles.clickButton}>
                <div className={styles.clockCan}>打卡</div>
                <div className={styles.clockDate}>{h}:{m}:{s}</div>
              </div>
            </div>
            <div className={styles.prompt}>可以打卡了</div>
            <div className={styles.refreshHide}>刷新页面</div>
            <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
          </div>
        )
      } else if (prompt === 2) {     //打卡异常
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
              <img className={styles.promptImg} src={warn} alt="" /><span className={styles.text}>网络连接异常,蓝牙未打开</span>
            </div>
            <div onClick={ev => this.refresh(ev)} className={styles.refreshShow}>刷新页面</div>
            <div className={styles.promptText}>搜索考勤机时请保证网络连接正常,蓝牙为开启状态哦!</div>
          </div>
        )
      } else {                      //打卡成功
        return (
          <div className={styles.content}>
            <div className={styles.clickClock}>
              <img className={styles.cardFinish} src={success} alt="" />
              <div className={styles.cardTime}>
                <div className={styles.clockDate}>{h}:{m}:{s}</div>
              </div>
            </div>
            <div className={styles.prompt}>
              <img className={styles.promptImg} src={successMin} alt="" /><span className={styles.text}>打卡成功!</span>
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
        <Notice noticeState={noticeState} parent={this} title={noticeTitle}></Notice>
        <ClockPage></ClockPage>
        <div className={styles.tabBox}>
          <div className={styles.tab}>
            <img className={styles.tabImg} src={clock} alt="" />
            <div>考勤打卡</div>
          </div>
          <div className={styles.tab} onClick={ev => this.userCenter(ev)} >
            <img className={styles.tabImg} src={person} alt="" />
            <div>个人中心</div>
          </div>
        </div>
        {/* <Mask visible={this.state.mask} parent={this} information={this.state.dataList}></Mask> */}
      </div>
    );
  }

}
export default PunchClock;