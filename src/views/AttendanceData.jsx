//员工考勤记录（普通管理员）
import React, { Component } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import Picker from 'react-mobile-picker';
import moment from 'moment';

import styles from '../styles/AttendanceData.css';

import XHR from '../utils/request';
import API from '../api/index';

import data from '../asset/statePrompt/data.png';
import top from '../asset/manager/triangle-top.png';
import spread from '../asset/manager/spread.png'
import search from '../asset/manager/search.png';

const MaskAttendance = ({ list, parent, tabIndex, divisionIndx, optionGroups, valueGroups, Value, dateIndex,optionTeams,valueTeams}) => {   //部门列表组件
    if (tabIndex === 1) {
        return (
            <div className={styles.departmentBox}>
                {
                    list.map((item, index) =>
                        <div onClick={ev => parent.clickTerm(index)} className={divisionIndx === index ? styles.selectTerm : styles.term} key={index}>{item.name}</div>
                    )
                }
                <div className={styles.clearBoth}></div>
            </div>
        );
    } else {
        if (dateIndex === 0) {
            return (
                <div>
                    <InfiniteCalendar
                        width={320} height={170}
                        locale={{
                            headerFormat: 'MM D',
                            weekdays: ["日", "一", "二", "三", "四", "五", "六"]
                        }}
                        onSelect={parent.selectDay}
                    />
                </div>
            )
        } else if (dateIndex === 1) {
            return (
                <div>
                    <Picker
                        optionGroups={optionGroups}
                        valueGroups={valueGroups}
                        onChange={parent.handleChange}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <Picker
                        optionGroups={optionTeams}
                        valueGroups={valueTeams}
                        onChange={parent.selectChange}
                    />
                </div>
            )
        }    
    }
}
class AttendanceData extends Component {
    constructor() {
        super();
        this.state = {
            Value: '',
            date: new Date(),
            section: [],                 //部门列表
            departmentName:'全部',      //默认部门
            departmentIndex: '',         //部门的索引值
            departmentId: '',            //部门Id
            maskDate: false,             //默认不显示日历
            currentIndex: 0,             //日月年展示模块索引
            showState: 0,                //默认展示全部
            tabIndex: 0,                 //选择tab的索引
            startTime: moment().format('YYYY-MM-DD'),     //开始时间(传参)
            endTime: moment().format('YYYY-MM-DD'),       //结束时间(传参)
            record: [],                  //展示打卡记录
            abnormalRecord:[],           //异常打卡记录
            personDetail:false,           //个人打卡记录状态
            personData:[],                //个人打卡数据
            dataSource: [],               //月统计打卡记录
            yearSource: [],               //年统计打卡记录
            toggleIndex: '',              //切换选择时间与部门的索引值
            maskToggle: 0,                //默认不展示mask
            selectDate: moment().format('YYYY-MM-DD'),   //日历选择
            selectMonth:'',                //月份选择
            selectYear:'',                 //年份选择
            valueGroups: {                //月组件
                data: moment().format('YYYY-MM')
            },
            optionGroups: {
                data: []
            },
            valueYears:{                 //年组件
                data:moment().format('YYYY')
            },
            optionYears:{
                data:[]
            }

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '员工考勤记录';
        this.getOfficeList();
        this.getRecords(this.state.startTime,this.state.endTime);
    }
    getYear() {                           //获取年份
        var myDate = new Date();
        var startYear = myDate.getFullYear();//起始年份
        var endYear = myDate.getFullYear() + 10;//结束年份
        var list = []
        for (var i = startYear; i < endYear; i++) {
            list.push(i);
        }
        this.setState({
            optionYears: {
                data:list
            }
        })
      
    }
    getMonth() {                          //获取年+月份
        var myDate = new Date();
        var startYear = myDate.getFullYear() - 1;//起始年份
        var endYear = myDate.getFullYear() + 10;//结束年份
        var list = []
        for (var i = startYear; i < endYear; i++) {
            list.push(i);
        }
        var Months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var result = [];
        list.forEach(ev =>
            Months.forEach(el => {
                result.push(ev + '-' + el )
            })
        )
        this.setState({
            optionGroups: {
                data: result
            }
        })
    }
    search() {                     //跳转至搜索页面
        this.props.history.push('/search');
    }
    export() {                       //跳转至导出页面
        if(this.state.currentIndex === 0) {
            window.Data = {
                time:this.state.selectDate,
                section:this.state.departmentName
            }
            this.props.history.push('/exportData');
        }else if(this.state.currentIndex === 1) {
            window.Data = {
                time:this.state.selectMonth,
                section:this.state.departmentName
            }
            this.props.history.push('/exportData'); 
        }else{
            window.Data = {
                time:this.state.selectYear,
                section:this.state.departmentName
            }
            this.props.history.push('/exportData'); 
        }

    }
    selectTime(i) {                  //设置日月年展示模块索引值
        this.setState({ currentIndex: i });
        if (i === 0) {
            // this.setState({defaultTime:this.state.selectDate})
            this.setState({departmentName:'全部'})
            this.getRecords(this.state.startTime,this.state.endTime);
        } else if (i === 1) {
            this.setState({departmentName:'全部'});
            this.setState({selectMonth:moment().format("YYYY-MM")});
            this.getStatisticalInfo(moment().startOf('month').format("YYYY-MM-DD"),moment().endOf('month').format("YYYY-MM-DD"));
            this.getMonth();
        }else{
            this.setState({departmentName:'全部'});
            this.setState({selectYear:moment().format("YYYY")});
            this.getYarnInfomation(moment().format("YYYY") + '-01-01',moment().format("YYYY") + '-12-31');
            this.getYear();
        }
    }
    personalInformation(i) {            //个人打卡记录
        this.setState({personDetail:true});
        this.setState({departmentName:this.state.dataSource[i].name});
        this.getPersonRecords(this.state.valueGroups.data + '-1',moment(this.state.valueGroups.data).endOf('month').format('YYYY-MM-DD'),this.state.dataSource[i].userid)
    }
    selectDay = (date) => {          //日历日期选择
        var d = new Date(date);
        var dateTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        this.setState({selectDate:dateTime});
    }
    handleChange = (name, value) => { //月日期选择
        this.setState({ valueGroups: { data: value } });
    }
    selectChange = (name,value) => {  //年日期选择
        this.setState({ valueYears: { data: value } });
    }
    showMask() {                     //显示mask  
        this.setState({ maskToggle: 1 })
    }
    hideMask() {                     //隐藏mask
        this.setState({ maskToggle: 0 });
    }
    showAll() {                      //展示所有
        this.setState({ showState: 0 });
        this.setState({ tabIndex: 0 });
    }
    showAbnormal() {                 //展示异常
        this.setState({ showState: 1 });
        this.setState({ tabIndex: 1 });
        this.Abnormal(this.state.startTime,this.state.endTime);
    }
    // showNotAbsenteeism() {            //展示全勤
    //     this.setState({ showState: 2 });
    //     this.setState({ tabIndex: 2 });
    // }
    choiceTab(i) {                   //组件切换部门与时间索引
        this.setState({ toggleIndex: i });
        this.setState({ mask: true });

    }
    choice(i) {                      //选择部门
        this.setState({ departmentIndex: i })
        this.setState({ departmentName: this.state.section[i].name });
        this.setState({ departmentId: this.state.section[i].id });

    }
    clickTerm(i) {                   //设置部门索引、名字、Id  
        this.setState({ departmentIndex: i })
        this.setState({ departmentName: this.state.section[i].name });
        this.setState({ departmentId: this.state.section[i].id });
    }
    async getOfficeList() {          //部门列表
        const result = await XHR.post(API.getOfficeList, { companyid:window.sessionStorage.getItem("companyid") });
        const sectionList = [];
        JSON.parse(result).data.forEach((item, index) => {
            sectionList.push({
                name: item.name,
                id: item.id
            })
        });
        sectionList.push({
            name:'其他',
            id: 'officeid'
        })
        this.setState({ section: sectionList });
    }

    determineDepartment() {    //确认选择
        if(this.state.currentIndex === 0) {      //日子
            if(this.state.tabIndex === 0){       //全部
                this.getRecords(this.state.selectDate,this.state.selectDate,this.state.departmentId)
            }else{                               //异常
                this.Abnormal(this.state.selectDate,this.state.selectDate,this.state.departmentId)
            }
           
        }else if(this.state.currentIndex === 1) { //月期
            this.setState({selectMonth:this.state.valueGroups.data})
            this.getStatisticalInfo(this.state.valueGroups.data + '-1',moment(this.state.valueGroups.data).endOf('month').format('YYYY-MM-DD'),this.state.departmentId)
        }else{                                    //年份
            this.setState({selectYear:this.state.valueYears.data})
            this.getYarnInfomation(this.state.valueYears.data +'-01-01',this.state.valueYears.data + '-12-31',this.state.departmentId )
        }
        this.hideMask();
    }
    async getPersonRecords(startTime,endTime,userId) {            //获取个人打卡记录
        const result = await XHR.post(API.getRecords,{
            companyid:window.sessionStorage.getItem("companyid"),
            beginDate:startTime,    
            endDate:endTime,
            userids:userId    
        })
        const dataResult = [];
        
        JSON.parse(result).data.forEach((ev,i) =>{
            dataResult.push({
                dateDay:ev.date.slice(0,10),
                week:ev.week,
                goState:(ev.gotoWork+'').length<10 ? ev.gotoWork:ev.gotoWork.split('/')[1],
                goTime:(ev.gotoWork + '').length<10 ? ev.gotoWork:ev.gotoWork.split('/')[0],
                backState:(ev.getoffWork+'').length<10 ? ev.getoffWork:ev.getoffWork.split('/')[1],
                backTime:(ev.getoffWork +'').length<10 ? ev.getoffWork:ev.getoffWork.split('/')[0]
            })
        })
        
        this.setState({personData:dataResult || []});
        console.log(this.setState.personData)

    }
    async Abnormal(startTime,endTime,officeId) {            //获取异常全部员工某日考勤记录
        const result = await XHR.post(API.getRecords, {
            companyid:window.sessionStorage.getItem("companyid"),
            beginDate:startTime,
            endDate:endTime,
            officeid:officeId,
            abnormity:"abnormity"  
        })
        window.time = this.state.startTime;
        const dataResult = [];
        
        JSON.parse(result).data.forEach((ev,i) =>{
            dataResult.push({
                userName:ev.userName,
                goState:(ev.gotoWork+'').length<10 ? ev.gotoWork:ev.gotoWork.split('/')[1],
                goTime:(ev.gotoWork + '').length<10 ? ev.gotoWork:ev.gotoWork.split('/')[0],
                backState:(ev.getoffWork+'').length<10 ? ev.getoffWork:ev.getoffWork.split('/')[1],
                backTime:(ev.getoffWork +'').length<10 ? ev.getoffWork:ev.getoffWork.split('/')[0]
            })
        })
        this.setState({ abnormalRecord: dataResult || [] } );
    }

    async getRecords(startTime,endTime,officeId) {            //获取全部员工某日考勤记录
        const result = await XHR.post(API.getRecords, {
            companyid:window.sessionStorage.getItem("companyid"),
            beginDate:startTime,
            endDate:endTime,
            officeid:officeId
        })
        window.time = this.state.startTime;
        const dataResult = [];
        
        JSON.parse(result).data.forEach((ev,i) =>{
            dataResult.push({
                userName:ev.userName,
                goState:(ev.gotoWork+'').length<10 ? ev.gotoWork:ev.gotoWork.split('/')[1],
                goTime:(ev.gotoWork + '').length<10 ? ev.gotoWork:ev.gotoWork.split('/')[0],
                backState:(ev.getoffWork+'').length<10 ? ev.getoffWork:ev.getoffWork.split('/')[1],
                backTime:(ev.getoffWork +'').length<10 ? ev.getoffWork:ev.getoffWork.split('/')[0]
            })
        })
        this.setState({ record: dataResult || [] } );
    }
    async getStatisticalInfo(startTime,endTime,officeId) {     //获取全部员工考勤记录统计
        const result = await XHR.post(API.getStatisticalInfo, {
            companyid:window.sessionStorage.getItem("companyid"),
            beginDate: startTime,
            endDate: endTime,
            officeid:officeId
        })
        const data = JSON.parse(result).data || [];
        const list = [];
        data.forEach((ev, index) => {
            list.push({
                userid:ev.userid,
                name: ev.userName,
                already: ev.clockIn,
                total: ev.totalClockIn,
                normal: ev.normal,
                abnormal: ev.anomaly
            })
        })
        this.setState({ dataSource: list });
    }
    async getYarnInfomation(startTime,endTime,officeId) {     //获取全部员工考勤记录统计
        const result = await XHR.post(API.getStatisticalInfo, {
            companyid:window.sessionStorage.getItem("companyid"),
            beginDate: startTime,
            endDate: endTime,
            officeid:officeId
        })
        const data = JSON.parse(result).data || [];
        const list = [];
        data.forEach((ev, index) => {
            list.push({
                name: ev.userName,
                already: ev.clockIn,
                total: ev.totalClockIn,
                normal: ev.normal,
                abnormal: ev.anomaly
            })
        })
        this.setState({ yearSource: list });
    }
    render() {
        const { record, currentIndex,yearSource,dataSource, tabIndex, section, departmentIndex, departmentName, toggleIndex, maskToggle, optionGroups, valueGroups,selectYear,selectDate,valueYears,optionYears,abnormalRecord,personDetail,personData,selectMonth} = this.state;
        const timeSlot = ['日', '月', '年'];
        const list = ['时间', '部门']
        const DateChange = props => {              //日期显示内容
            if (currentIndex === 0) {              //日
                if(tabIndex === 0) {              //全部
                    if(record.length>0) {          //有数据
                        return (
                            <div className={styles.detailsList}>
                                {
                                    record.map((item, index) =>
                                        <div className={styles.item} key={index}>
                                            <div className={styles.name}>{item.userName}</div>
                                            <div className={styles.work}>
                                                <div className={styles.gotoWork}>上班: <span className={item.goState === '正常' ? styles.fontColor: styles.redColor}>{item.goState}</span></div>
                                                <div className={styles.punchTime}>{item.goTime}</div>
                                            </div>
                                            <div className={styles.work}>
                                                <div className={styles.gooffWork}>下班: <span className={ item.backState === '正常' ? styles.fontColor: styles.redColor}>{item.backState}</span></div>
                                                <div className={styles.punchTime}>{item.backTime}</div>
                                            </div>
                                        </div>
                                    )
                                }
                                 <div className={styles.footer}>
                                    <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                                        <span>{selectDate}</span>/<span>{departmentName}</span>
                                        <img className={styles.top} src={top} alt="" />
                                    </div>
                                    <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                                </div>
                            </div>
                        );
                    }else{
                        return (
                            <div className={styles.blankBox}>
                                 <div className={styles.box}>
                                    <img className={styles.blankImg} src={data} alt='' />
                                    <div className={styles.font}>暂无考勤记录</div>
                                 </div>
                                 <div className={styles.footer}>
                                    <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                                        <span>{selectDate}</span>/<span>{departmentName}</span>
                                        <img className={styles.top} src={top} alt="" />
                                    </div>
                                    <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                                </div>
                            </div>
                        )
                    }
                    
                }else{                           //异常
                    if(abnormalRecord.length>0) {
                        return (
                            <div className={styles.detailsList}>
                                {
                                    abnormalRecord.map((item, index) =>
                                        <div className={styles.item} key={index}>
                                            <div className={styles.name}>{item.userName}</div>
                                            <div className={styles.work}>
                                                <div className={styles.gotoWork}>上班: <span className={item.goState === '正常' ? styles.fontColor: styles.redColor}>{item.goState}</span></div>
                                                <div className={styles.punchTime}>{item.goTime}</div>
                                            </div>
                                            <div className={styles.work}>
                                                <div className={styles.gooffWork}>下班: <span className={ item.backState === '正常' ? styles.fontColor: styles.redColor}>{item.backState}</span></div>
                                                <div className={styles.punchTime}>{item.backTime}</div>
                                            </div>
                                        </div>
                                    )
                                }
                                 <div className={styles.footer}>
                                    <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                                        <span>{selectDate}</span>/<span>{departmentName}</span>
                                        <img className={styles.top} src={top} alt="" />
                                    </div>
                                    <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                                </div>
                            </div>
                        );
                    }else{
                        return (
                            <div className={styles.blankBox}>
                                 <div className={styles.box}>
                                    <img className={styles.blankImg} src={data} alt='' />
                                    <div className={styles.font}>暂无考勤记录</div>
                                 </div>
                                 <div className={styles.footer}>
                                    <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                                        <span>{selectDate}</span>/<span>{departmentName}</span>
                                        <img className={styles.top} src={top} alt="" />
                                    </div>
                                    <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                                 </div>
                            </div>
                        )
                    }
                    
                }
               
            } else if (currentIndex === 1) {           //月期显示内容
                if(personDetail === false) {           //展示统计
                    if(dataSource.length>0) {
                        return (
                            <div className={styles.detailsList}>
                                {
                                    dataSource.map((item, index) =>
                                        <div className={styles.item} key={index}>
                                             <div className={styles.displayDate}><span>{item.dateDay}</span> <span>{item.week}</span></div>
                                            <div className={styles.nameBox}>
                                                <div className={styles.personName}>{item.name}</div>
                                                <div onClick={ev => this.personalInformation(index)} className={styles.detail}>详情</div>
                                            </div>
                                            <div className={styles.totalDay}>
                                                <div className={styles.totalDay}>已打卡: <span>{item.already}</span> (共需{item.total}天)</div>
                                            </div>
                                            <div className={styles.work}>
                                                <div className={styles.gooffWork}>正常: <span className={styles.fontColor}>{item.normal}天</span></div>
                                                <div className={styles.punchTime}>异常：<span className={styles.redColor}>{item.abnormal}天</span></div>
                                            </div>
                                        </div>
                                    )
                                }
                                 <div className={styles.footer}>
                                    <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                                        <span>{selectMonth}</span>/<span>{departmentName}</span>
                                        <img className={styles.top} src={top} alt="" />
                                    </div>
                                    <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                                </div>
                            </div>
                        )   
                    }else{
                        return (
                            <div className={styles.blankBox}>
                                 <div className={styles.box}>
                                    <img className={styles.blankImg} src={data} alt='' />
                                    <div className={styles.font}>暂无考勤记录</div>
                                 </div>
                                 <div className={styles.footer}>
                                    <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                                        <span>{selectMonth}</span>/<span>{departmentName}</span>
                                        <img className={styles.top} src={top} alt="" />
                                    </div>
                                    <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                                 </div>
                            </div>
                        )
                    }    
                }else{                                //展示个人
                    if(personData.length>0) {
                        return (
                            <div className={styles.detailsList}>
                            {
                                personData.map((item,index) =>
                                    <div className={styles.item} key={index}>
                                        <div className={styles.displayDate}><span>{item.dateDay}</span> <span>{item.week}</span></div>
                                        <div className={styles.work}>
                                            <div className={styles.gotoWork}>上班:<span className={item.goState === '正常' ? styles.fontColor: styles.redColor}>{item.goState}</span></div>
                                            <div className={styles.punchTime}>{item.goTime}</div>
                                        </div>
                                        <div className={styles.work}>
                                            <div className={styles.gooffWork}>下班:<span className={ item.backState === '正常' ? styles.fontColor: styles.redColor}>{item.backState}</span></div>
                                            <div className={styles.punchTime}>{item.backTime}</div>
                                        </div>
                                    </div>
                                )
                            }
                             <div className={styles.footer}>
                                <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                                    <span>{selectMonth}</span>/<span>{departmentName}</span>
                                    <img className={styles.top} src={top} alt="" />
                                </div>
                                <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                            </div>
                        </div>   
                        )
                    }else{
                        return (
                            <div className={styles.blankBox}>
                                 <div className={styles.box}>
                                    <img className={styles.blankImg} src={data} alt='' />
                                    <div className={styles.font}>暂无考勤记录</div>
                                 </div>
                                 <div className={styles.footer}>
                                    <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                                        <span>{selectMonth}</span>/<span>{departmentName}</span>
                                        <img className={styles.top} src={top} alt="" />
                                    </div>
                                    <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                                </div>
                            </div>
                        )
                    }
                }
               
            } else {                                   //年
                if(yearSource.length>0) {
                    return (
                        <div className={styles.detailsList}>
                            {
                                yearSource.map((item, index) =>
                                    <div className={styles.item} key={index}>
                                        <div className={styles.nameBox}>
                                            <div className={styles.personName}>{item.name}</div>
                                            <div onClick={ev => this.personalInformation(ev)} className={styles.detail}></div>
                                        </div>
                                        <div className={styles.totalDay}>
                                            <div className={styles.totalDay}>已打卡: <span>{item.already}</span> (共需{item.total}天)</div>
                                        </div>
                                        <div className={styles.work}>
                                            <div className={styles.gooffWork}>正常: <span className={styles.fontColor}>{item.normal}天</span></div>
                                            <div className={styles.punchTime}>异常：<span className={styles.redColor}>{item.abnormal}天</span></div>
                                        </div>
                                    </div>
                                )
                            }
                             <div className={styles.footer}>
                                <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                                    <span>{selectYear}</span>/<span>{departmentName}</span>
                                    <img className={styles.top} src={top} alt="" />
                                </div>
                                <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                            </div>
                        </div>
                    );
                }else{
                    return (
                        <div className={styles.blankBox}>
                             <div className={styles.box}>
                                <img className={styles.blankImg} src={data} alt='' />
                                <div className={styles.font}>暂无考勤记录</div>
                             </div>
                             <div className={styles.footer}>
                                <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                                    <span>{selectYear}</span>/<span>{departmentName}</span>
                                    <img className={styles.top} src={top} alt="" />
                                </div>
                                <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                            </div>
                        </div>
                    )
                }
               
            }
        }
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <div onClick={ev => this.showAll(ev)} className={tabIndex === 0 ? styles.currentTab : styles.tab}>全部</div>
                        <div onClick={ev => this.showAbnormal(ev)} className={tabIndex === 1 ? styles.currentTab : styles.tab}>异常</div>
                        {/* <div onClick={ev => this.showNotAbsenteeism(ev)} className={tabIndex === 2 ? styles.currentTab : styles.tab}>全勤</div> */}
                    </div>
                    <img onClick={ev => this.search(ev)} className={styles.searchImg} src={search} alt="" />
                </div>
                <div className={styles.timetable}>
                    {
                        timeSlot.map((item, index) => <div onClick={ev => this.selectTime(index)} key={index} className={currentIndex === index ? styles.currentMonth : styles.noMonth}>{item}</div>)
                    }
                </div>
                <DateChange></DateChange>
                {/* <div className={styles.footer}>
                    <div className={styles.brief} onClick={ev => this.showMask(ev)}>
                        <span>{currentIndex ===0?selectDate: defaultTime}</span>/<span>{departmentName}</span>
                        <img className={styles.top} src={top} alt="" />
                    </div>
                    <div onClick={ev => this.export(ev)} className={styles.exportData}>导出数据</div>
                </div> */}
                <div className={maskToggle === 0 ? styles.hideMask : styles.mask}>
                    <div className={styles.maskBox}>
                        <div className={styles.operation}>
                            <img onClick={ev => this.hideMask(ev)} className={styles.spread} src={spread} alt="" />
                        </div>
                        <div className={styles.determine} onClick={ev => this.determineDepartment(ev)}>确定</div>
                        <div className={styles.toggleBox}>
                            {
                                list.map((item, index) => <div key={index} onClick={ev => this.choiceTab(index)} className={toggleIndex === index ? styles.selectTimeTab : styles.timeTab}>{item}</div>)
                            }
                        </div>
                        <div>
                            <MaskAttendance
                                parent={this}
                                tabIndex={toggleIndex}
                                list={section}
                                divisionIndx={departmentIndex}
                                optionGroups={optionGroups}
                                valueGroups={valueGroups}
                                Value={this.state.date}
                                dateIndex={currentIndex}
                                optionTeams={optionYears}
                                valueTeams={valueYears}
                            />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default AttendanceData;