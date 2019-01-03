import React from 'react';

import {Tabs} from 'antd-mobile';
import './index.scss';
export default class SearchBarExample extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        value: '',
        hideSearch:false,
        tabs: [
            { title: '关注' },
            { title: '推荐' },
            { title: '热榜' },
            { title: '视频' }
          ]   
        };
    this.handleChangeFun = this.handleChangeFun.bind(this);
  }
  clear = () => {
    this.setState({ 
        value: '',
        hideSearch:false
     });
  };
  onFocusFun=()=>{
      this.setState({
        hideSearch:true
      })
  }
  onBlurFun=()=>{
    this.setState({
        hideSearch:false
      })
  }
  handleChangeFun(event){
    this.setState({value: event.target.value});
  }
  handelSearchFun=()=>{
    this.setState({
        hideSearch:false
      })
  }
  render() {
      let searBar;
      if(this.state.hideSearch){
        searBar = ( <div className="search-bar-content">
                <i className="fa fa-arrow-left" onClick={this.handelSearchFun} ></i>
                <input placeholder="search" className="search-input search-input-show" style={{borderRightWidth:0}} 
                value={this.state.value} 
                onChange={this.handleChangeFun}/>
                {this.state.value?<i className="fa fa-close" onClick={this.clear}/>:null}
            </div>)
      }else{
        searBar = (
            <div className="search-bar-content" >
            <i className="fa fa-search"></i>
            <input placeholder="search" className="search-input" 
                onFocus={this.onFocusFun} 
                value={this.state.value} 
                onChange={this.handleChangeFun}/>
            <span><i className="fa fa-pencil fa-fw" style={{marginRight: "5px"}}></i>提问</span>
          </div>
        )
      }
    return (<div>
        {searBar}
        <div className="home-tab-content">
            <Tabs tabs={this.state.tabs}
                initialPage={1}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <div className="tabs-class">
                        <div style={{height:'1000px'}}>Content of first tab</div>
                </div>
                <div className="tabs-class">
                    Content of second tab
                </div>
                <div className="tabs-class">
                    Content of third tab
                </div>
                <div className="tabs-class">
                    Content of four tab
                </div>
            </Tabs>
        </div>
        
    </div>);
  }
}