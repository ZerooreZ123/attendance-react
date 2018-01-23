import React,{Component} from 'react';

import XHR from '../utils/request';
// import API from '../api/index';

class InviteCode extends Component {
  constructor() {
    super();
    this.state = {
      result:''
    }
  }
  componentDidMount() {
    this.getWX();
  }
  scan() {                         //扫一扫
    // window.wx.config(this.state.result);
    // console.log(this.state.result);
    window.wx.config({
        debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx361547ce36eb2185', // 必填，公众号的唯一标识
        timestamp: 1516691995, // 必填，生成签名的时间戳
        nonceStr: '555555', // 必填，生成签名的随机串
        signature: '7be3b1f30c6e00468bd91c591ce865fd7ae693c6',// 必填，签名
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
    });
    window.wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            console.log(res);
            // alert(JSON.parse(result))
        }
    });
}
  async getWX() {
    const result = await XHR.post("http://www.junl.cn/AM/f/yk/api/getSignature.do");
    if(JSON.parse(result).success === 'T') {
      this.setState({
         result:{
            timestamp:JSON.parse(result).data.timestamp,
            nonceStr:JSON.parse(result).data.noncestr,
            signature:JSON.parse(result).data.signature
         }  
      })
    }
  }
  render() {
    var divStyle = {
      position:'fixed',
      top:'20px',
      left:'20px',
      background: 'blue',
      wdith: '70px',
      height: '40px',
      display: 'inline-block'
  };
    return (
      <div >
         <div onClick={ev =>this.scan(ev)} style={divStyle}>扫一扫</div>
      </div>
    );
  }
}

export default InviteCode;

