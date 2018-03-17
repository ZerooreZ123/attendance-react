import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import styles from '../styles/QrCode.css';


class QrCode extends Component {
  constructor() {
    super();
    this.state = {
      invitationCode:'',
      imgBase64:''
    }
  } 
  componentDidMount() {
    document.querySelector('title').innerText = '公众号二维码';
    setTimeout(() => {
   
      this.setState({invitationCode:decodeURIComponent(this.props.match.params.code)});
      const image = new Image(); 
      const canvas = document.getElementsByTagName('canvas')[0];
      image.src = canvas.toDataURL("image/png");
      this.setState({imgBase64:image.getAttribute('src')});
    }, 0);
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.codeWrap}>
                <div className={this.state.imgBase64?styles.hideCode:styles.code}>
                    <QRCode value={this.state.invitationCode} />
                </div>
                <div className={this.state.imgBase64?styles.code:styles.hideCode}> 
                    <img className={styles.imgSize} src={this.state.imgBase64} alt=""/>
                </div>
                <div className={styles.text}>长按二维码,即可关注公众号</div>
            </div>    
        </div>
      </div>
    );
  }
}

export default QrCode;