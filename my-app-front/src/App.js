import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from './pages/login';
import {route_list} from './routing'
import User from './service/user-service.js';
const _user = new User();
class App extends Component {
  constructor(props) {
    super(props);
}
  componentDidMount(){
   this.login();
  }
  login(){
    let params = {
      name:'pip',
      password:'hellopp'
    }
    _user.login(params).then(res=>{
      console.log('res',res)
    }).catch(error=>{
      console.log('error',error)
    })
  }
  render() {
    return (
      <div className="App">
       <Router>
          <Switch>
            <Route path="/login" component={Login} />
            {/* 除了Login这种特殊的路由，其他的.. */}
            <Route path="/" render={(props) => route_list} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
