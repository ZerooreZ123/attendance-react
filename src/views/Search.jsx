//搜索
import React,{Component} from 'react';
import styles from '../styles/Search.css';

// import XHR from '../utils/request';
// import API from '../api/index';

import cleanUp from '../asset/ico/cleanUp.png';
import cleanButton from '../asset/ico/ClearButton.png';

class Search extends Component {
    constructor() {
        super();
        this.state={
            searchHistory:['叶湘伦','路小雨',13455667788]
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '搜索';

    }
    empty() {
        this.setState({searchHistory:[]});
    }   
    render() {
        const {searchHistory} = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.searchBox}>
                        <input type="text" placeholder="搜索姓名或手机号"  />
                        <img className={styles.cleanButton}src={cleanButton} alt=""/>
                    </div>
                    <div className={styles.cancel}>取消</div>
                </div>
                <div className={styles.content}>
                    <div>搜索历史</div>
                    <img onClick={ev =>this.empty(ev)} className={styles.recycle} src={cleanUp} alt=""/>
                </div>
                <div className={styles.list}>
                    {
                        searchHistory.map((item,index) =><div key={index}>{item}</div>)
                    }
                </div>
            </div>
        )
    }
    
}
export default Search;