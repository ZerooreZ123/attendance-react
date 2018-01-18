//搜索
import React,{Component} from 'react';
import styles from '../styles/Search.css';

import XHR from '../utils/request';
import API from '../api/index';

import cleanUp from '../asset/ico/cleanUp.png';
import cleanButton from '../asset/ico/ClearButton.png';

const SearchList =({visible,parent,allPerson}) =>{
    if(visible){
       return (
        <div className={styles.substance}>
            <div className={styles.personnel}>
                {
                    allPerson.map((item,index) =>
                    <div  onClick={ev =>parent.personalInformation(ev)} className={styles.single} key={index}>
                        <div className={styles.information}>
                            <div className={styles.name}>{item.name}</div>
                            <div className={styles.phone}>{item.phone}</div>
                        </div>
                    </div>
                )
                }
            </div>
        </div>    
       )
    }else{
        return null
    }
}

class Search extends Component {
    constructor() {
        super();
        this.state={
            searchDate:'',               //搜索数据
            searchState:false,           //搜索状态
            inputValue:'',               //搜索关键字
            departmentStaff:[],          //部门及对应部门人员
            searchHistory:[]
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '搜索';
        this.getOfficeUserList();

    }
    empty() {
        this.setState({searchHistory:[]});
    }
    personalInformation() {
        this.props.history.push('/personalInformation')
    }
    getInputValue(ev) {
        this.setState({inputValue:ev.target.value});
        const list = this.state.departmentStaff;
        const dataResult = [];
        const historyList = [];
        historyList.push(ev.target.value)
        this.setState({searchHistory:historyList})

        list.forEach(el=>{
            el.staff.forEach(item =>{
                if(ev.target.value && item.name.match(ev.target.value)){
                    this.setState({searchState:true});
                    dataResult.push({
                        name:item.name || ''
                    })
                }
                // else if(ev.target.value && item.phone.match(ev.target.value)){
                //     dataResult.push({
                //         phone:item.phone || ''
                //     })
                // }else{
                //     return []
                // }   
            })
            if(!ev.target.value) {
                this.setState({searchState:false});
            }
        })
        this.setState({searchDate:dataResult || []});
        console.log(this.state.searchDate);
    }
    async getOfficeUserList() {                //获取全部部门及部门人员列表
        const result = await XHR.post(API.getOfficeUserList,{companyid:window.sessionStorage.getItem('companyid')});
        const dataSource = JSON.parse(result).data;
        const userList = [];
        for(var i in dataSource) {
            userList.push({
                department:i,
                staff:dataSource[i]
           })
        }
        this.setState({departmentStaff:userList});
    }
    render() {
        const {searchHistory,inputValue,searchState,searchDate} = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.searchBox}>
                        <input onChange={ev =>this.getInputValue(ev)} type="text" placeholder="搜索姓名或手机号" value={inputValue}  />
                        <img className={styles.cleanButton}src={cleanButton} alt=""/>
                    </div>
                    <div className={styles.cancel}>取消</div>
                </div>
                <div className={searchState === false? styles.showContent:styles.hideContent}>
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
                <SearchList visible={searchState} parent={this} allPerson={searchDate} />
            </div>
        )
    }
    
}
export default Search;