import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import CSSTransitionGroup from 'react-addons-css-transition-group'

import PunchClock from './views/PunchClock';
import UserCenter from './views/UserCenter';
import RevisionDepartment from './views/RevisionDepartment';
import CardReminding from './views/CardReminding';
import AttendanceRecord from './views/AttendanceRecord';
import ExportData from './views/ExportData';
import HistoryAnnouncement from './views/HistoryAnnouncement';
import InviteCode from './views/InviteCode';
import InviteCodeDetail from './views/InviteCodeDetail';
import ShareInviteCode from './views/ShareInviteCode';
import AnnouncementDetails from './views/AnnouncementDetails';
import ReleaseAnnouncement from './views/ReleaseAnnouncement';
import AddAttendanceMachine from './views/AddAttendanceMachine';
import Search from './views/Search';
import AttendanceData from './views/AttendanceData';
import Department from './views/Department';
import EnterpriseManager from './views/EnterpriseManager';
import EditProfile from './views/EditProfile';
import PersonalInformation from './views/PersonalInformation';
import EmployeeInformation from './views/EmployeeInformation';
import AttendanceManagement from './views/AttendanceManagement';
import OrdinaryEnterorise from './views/OrdinaryEnterorise';
import Backstagelogon from './views/Backstagelogon';
import PersonalRegister from './views/PersonalRegister';
import EnterpriseRegistration from './views/EnterpriseRegistration';
import WriteInformation from './views/WriteInformation';
import Prompt from './views/Prompt';
import PersonalRecord from './views/PersonalRecord';
import PersonExport from './views/PersonExport';



class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route render={props => {
            let animateCls = '';
            let leaveTime = 0.1;
            if(props.history.action === 'PUSH'){
              animateCls = 'left';
              leaveTime = 250;
            }
            return (
              <CSSTransitionGroup
                transitionName={animateCls}
                transitionEnter={true}
                transitionLeave={true}
                transitionEnterTimeout={250}
                transitionLeaveTimeout={leaveTime}
              >
                <div key={props.location.pathname}>
                  <Route location={props.location} exact path="/punchClock/:loginName" component={PunchClock} />
                  <Route location={props.location} exact path="/userCenter/:loginName" component={UserCenter}/>
                  <Route location={props.location} exact path="/revisionDepartment" component={RevisionDepartment}/>
                  <Route location={props.location} exact path="/cardReminding" component={CardReminding}/>
                  <Route location={props.location} exact path="/attendanceRecord/:companyid/:loginName" component={AttendanceRecord}/>
                  <Route location={props.location} exact path="/exportData" component={ExportData}/>
                  <Route location={props.location} exact path="/historyAnnouncement" component={HistoryAnnouncement}/>
                  <Route location={props.location} exact path="/inviteCode" component={InviteCode}/>
                  <Route location={props.location} exact path="/inviteCodeDetail" component={InviteCodeDetail}/>
                  <Route location={props.location} exact path="/announcementDetails" component={AnnouncementDetails}/>
                  <Route location={props.location} exact path="/shareInviteCode" component={ShareInviteCode}/>
                  <Route location={props.location} exact path="/releaseAnnouncement" component={ReleaseAnnouncement}/>
                  <Route location={props.location} exact path="/addAttendanceMachine" component={AddAttendanceMachine}/>
                  <Route location={props.location} exact path="/search" component={Search}/>
                  <Route location={props.location} exact path="/attendanceData" component={AttendanceData}/>
                  <Route location={props.location} exact path="/department" component={Department}/>
                  <Route location={props.location} exact path="/enterpriseManager" component={EnterpriseManager}/>
                  <Route location={props.location} exact path="/editProfile" component={EditProfile}/>
                  <Route location={props.location} exact path="/personalInformation" component={PersonalInformation}/>
                  <Route location={props.location} exact path="/employeeInformation" component={EmployeeInformation}/>
                  <Route location={props.location} exact path="/attendanceManagement" component={AttendanceManagement}/>
                  <Route location={props.location} exact path="/ordinaryEnterorise" component={OrdinaryEnterorise}/>
                  <Route location={props.location} exact path="/backstagelogon" component={Backstagelogon}/>
                  <Route location={props.location} exact path="/personalRegister/:companyid/:loginName" component={PersonalRegister}/>
                  <Route location={props.location} exact path="/enterpriseRegistration/:serialNumber/:loginName" component={EnterpriseRegistration}/>
                  <Route location={props.location} exact path="/writeInformation" component={WriteInformation}/>
                  <Route location={props.location} exact path="/prompt/:msg" component={Prompt}/>
                  <Route location={props.location} exact path="/personalRecord" component={PersonalRecord}/>
                  <Route location={props.location} exact path="/personExport" component={PersonExport}/>
                </div>
              </CSSTransitionGroup>
            )
          }} />
        </Router>
      </div>
    );
  }
}

export default App;
