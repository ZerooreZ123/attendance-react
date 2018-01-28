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
                    <div  onClick={ev =>parent.personalInformation(index)} className={styles.single} key={index}>
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

const DeleteImg =({visible,parent}) =>{
    if(visible) {
        return (
            <img onClick={ev =>parent.delete(ev)} className={styles.cleanButton}src={cleanButton} alt=""/> 
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
            searchHistory:[]             //搜索历史
        }
    }
    componentDidMount() {
        // document.querySelector('title').innerText = '搜索';
        this.getOfficeUserList();
        this.searchHistory();
    }
    componentWillUnmount(){
        this.state.searchHistory.push(this.state.inputValue)
        window.localStorage.setItem('searchName',this.state.searchHistory);
    }
    searchHistory() {
        var test=window.localStorage.getItem('searchName');
        if(test){
            this.setState({searchHistory:test.split(',')})
        }else{
            this.setState({searchHistory:[]})
        }
    }
    empty() {
        window.localStorage.removeItem("searchName")
        this.setState({searchHistory:[]});
    }
    delete() {
        this.setState({inputValue:''});
        this.setState({searchState:false});
    }
    personalInformation(i) {
        window.Person = {
            userid:this.state.searchDate[i].userid,
            phone:this.state.searchDate[i].phone,
            name:this.state.searchDate[i].name,
            section:this.state.searchDate[i].officeName
        }

        // this.state.searchHistory.push(this.state.inputValue);
        // this.setState({searchHistory:this.state.searchHistory});
        this.props.history.push('/personalInformation')
    }
    getInputValue(ev) {
        this.setState({inputValue:ev.target.value});
        const list = this.state.departmentStaff;
        const dataResult = [];
        list.forEach(el=>{
            el.staff.forEach(item =>{
                if(ev.target.value && (item.name.match(ev.target.value)) || ev.target.value && item.phone.match(ev.target.value)){
                    this.setState({searchState:true});
                    dataResult.push({
                        name:item.name || '',
                        phone:item.phone || '',
                        officeName:item.officeName || '',
                        userid:item.id || ''
                    })
                }
            })
            if(!ev.target.value) {
                this.setState({searchState:false});
            }
        })
        this.setState({searchDate:dataResult || []});
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
                        {/* <img className={styles.cleanButton}src={cleanButton} alt=""/> */}
                        <DeleteImg visible={inputValue} parent={this}/>
                    </div>
                    <div onClick={ev =>this.delete(ev)} className={styles.cancel}>取消</div>
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