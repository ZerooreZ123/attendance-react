import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import CSSTransitionGroup from 'react-addons-css-transition-group'

import PunchClock from './views/PunchClock';
import UserCenter from './views/UserCenter';

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
