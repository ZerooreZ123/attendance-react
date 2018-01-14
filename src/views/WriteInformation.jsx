import React,{Component} from 'react';

import styles from '../styles/WriteInformation.css';

class WriteInformation extends Component {
  constructor() {
    super();
    this.state = {
      inputValue:'',         //姓名
      inputText:'',          //公司名
    }
}
componentDidMount() {
    document.querySelector('title').innerText = '填写资料'; 
}
ShareInviteCode() {
  if(this.state.inputValue && this.state.inputText) {
    this.props.history.push('./shareInviteCode');
  }else{
    return null
  }
}
getCompany(ev) {
    this.setState({inputText:ev.target.value});
}
getName(ev) {
    this.setState({inputValue:ev.target.value});
} 
render() {
    const {inputValue,inputText} = this.state;
    return (
      <div className = {styles.container}>
        <div className = {styles.getCode}>
          <input onChange={ev =>this.getCompany(ev)} type="text" placeholder = "公司名" value={inputText}/>
          <div className={styles.prompt}>必填</div>
        </div>

        <div className = {styles.getCode}>
          <input onChange={ev =>this.getName(ev)} type="text" placeholder = "姓名" value={inputValue}/>
          <div className={styles.prompt}>必填</div>
        </div>

        <div className={styles.next}>
          <div onClick={ev =>this.ShareInviteCode(ev)} className = {(inputValue && inputText) ? styles.nextCan:styles.nextStep}>完成</div>
        </div>
      </div>
    );
  }
}

export default WriteInformation;