import React, { Component } from 'react';
// import XHR from '../utils/request';
// import API, { admin } from '../api/index';


class MainPage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
    document.querySelector('title').innerText = '主页';
  }

  render() {
    return (
      <div>
        <div>Hello World</div>
      </div>
    );
  }
}

export default MainPage;
