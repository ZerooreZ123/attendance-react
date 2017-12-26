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
import AnnouncementDetails from './views/AnnouncementDetails';
import ReleaseAnnouncement from './views/ReleaseAnnouncement';
import AddAttendanceMachine from './views/AddAttendanceMachine';
import Search from './views/Search';

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
                  <Route location={props.location} exact path="/punchClock" component={PunchClock} />
                  <Route location={props.location} exact path="/userCenter" component={UserCenter}/>
                  <Route location={props.location} exact path="/revisionDepartment" component={RevisionDepartment}/>
                  <Route location={props.location} exact path="/cardReminding" component={CardReminding}/>
                  <Route location={props.location} exact path="/attendanceRecord" component={AttendanceRecord}/>
                  <Route location={props.location} exact path="/exportData" component={ExportData}/>
                  <Route location={props.location} exact path="/historyAnnouncement" component={HistoryAnnouncement}/>
                  <Route location={props.location} exact path="/announcementDetails" component={AnnouncementDetails}/>
                  <Route location={props.location} exact path="/releaseAnnouncement" component={ReleaseAnnouncement}/>
                  <Route location={props.location} exact path="/addAttendanceMachine" component={AddAttendanceMachine}/>
                  <Route location={props.location} exact path="/search" component={Search}/>
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
