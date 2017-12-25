//考勤记录（个人）
import React,{Component} from 'react';
import styles from '../styles/UserCenter.css';

class AttendanceRecord extends Component{
    constructor() {
        super();
        this.state={

        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '考勤记录';
    }

    render() {
        return(
            <div>
                666
            </div>
        )
    }
}
export default AttendanceRecord;