//员工个人资料修改
import React,{Component} from 'react';
import styles from '../styles/EditProfile.css';

import back from '../asset/ico/back.png';
import upBlue from '../asset/manager/triangle-top.png';
import downBlue from '../asset/manager/downBlue.png';


const Direction = (props) => {
    if (props.checked === true) {
      return <img  className={styles.top} src={downBlue} alt=""/>;
    } else {
      return <img  className={styles.top} src={upBlue} alt=""/>;
    }
}

class EditProfile extends Component{
    constructor() {
        super();
        this.state={
            mask:false,
            section:['人事部','采购部','行政部','业务部','研发部','技术部','智慧园区']
        }
    }
    componentDidMount() {
        document.querySelector('title').innerText = '修改资料';
    }
    showDepartment() {
        this.setState({mask:true});
    }
    hideDepartment() {
        this.setState({mask:false});
    }
    backMove() {
        this.props.history.push('/employeeInformation');
     }
    render() {
        const {section} = this.state;
        const Exhibition = props => {
            if (this.state.mask) {
                return (
                    <div className={styles.mask}>
                        <div className={styles.maskBox}>
                            <div className={styles.departmentBox}>
                                {
                                    section.map((item,index) =>
                                        <div onClick={ev =>this.hideDepartment(ev)} className={styles.term} key={index}>{item}</div>
                                    )
                                }
                                <div className={styles.clearBoth}></div>
                            </div>
                        </div>
                    </div>
                );
            } else {
              return null;
            }
        }
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={ev =>this.backMove(ev)} className={styles.back}><img className={styles.backImg} src={back} alt=""/>员工资料</div>
                    <div className={styles.title}>修改资料</div>
                    <div onClick={ev =>this.hideDepartment(ev)} className={styles.confirm}>确定</div>     
                </div>
                <div className={styles.content}>
                    <div className={styles.information}>
                        <input className={styles.name} type="text" defaultValue='叶湘伦' />
                        <div className={styles.department}>智慧部门</div>
                    </div>
                </div>
                <div onClick={ev =>this.showDepartment(ev)} className={styles.selectDepartment}>选择部门<Direction checked={true}/></div>
                <Exhibition></Exhibition>
            </div>
        )
    }

}

export default EditProfile;