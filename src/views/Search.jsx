//搜索
import React,{Component} from 'react';
import styles from '../styles/Search.css';

import cleanUp from '../asset/ico/cleanUp.png';
import cleanButton from '../asset/ico/ClearButton.png';

class Search extends Component {
    constructor() {
        super();
        this.state={

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '搜索';
    }
    render() {
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
                    <img className={styles.recycle} src={cleanUp} alt=""/>
                </div>
                <div className={styles.list}>
                    <div>叶湘伦</div>
                    <div>路小雨</div>
                    <div>18955662211</div>
                </div>
            </div>
        )
    }
    
}
export default Search;