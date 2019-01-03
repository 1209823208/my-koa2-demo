import React from 'react';
import './index.scss'
import { Link } from 'react-router-dom'
import CityM from '../../service/city-service'
import queryString from 'query-string'
const CityModel = new CityM()
class SearchPlace extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        searchInput:'',
        searchData:[],
        historySearch:[],
        is_first:true,
        city_id:1
     }
    }
    componentDidMount(){
      if(localStorage.getItem('historySearch')){
        const historySearch = JSON.parse(localStorage.getItem('historySearch'));
        this.setState({
          historySearch
        })
      }
      this.getParams();
    }
    getParams() {
      if (this.props) {
        let pathname = this.props.location.pathname;
        if (this.props.location.search) {
          var parsed = queryString.parse(this.props.location.search);
         this.setState({
          city_id:parsed.id
         })
        }
      }
    }
  
    changeHandle=(e)=>{
      this.setState({
        searchInput:e.target.value
      })
    }
    keydownFun=(e)=>{
      if(e.keyCode == "13"){  
        this.setState({
          searchInput:e.target.value
        },()=>{
          this.searchFun()
        })
      }  
    }
    searchFun=()=>{
      let searchContent = this.state.searchInput;
      let params = {
        type:'search',
        city_id:this.state.city_id,
        keyword:searchContent
      }
      this.searchHandle(params);  
    }
    async searchHandle(params){
      const resData = await CityModel.searchPlaceInfo(params)
      this.setState({
        searchData:resData,
        is_first:false
      })
    }
    render() {
      let searchDom =[];
      if(this.state.searchData.length>0){
        searchDom = this.state.searchData.map((item,index)=>{
          return(<li key={index}><Link to={{
            pathname: "/list",
            search: `geohash=${item.latitude},${item.longitude}`,
          }}>{item.address}</Link></li>)
        })
      }
      let historyDom = [];
      if(this.state.historySearch.length>0){
        historyDom = this.state.historySearch.map((item,index)=>{
          return(<li key={index}><Link to={{
            pathname: "/list",
            search: `geohash=${item.latitude},${item.longitude}`,
          }}>{item.address}</Link></li>)
        })
      } 
      return (
        <div className="page-search-place">
          <header>
            <span><i className="fa fa-angle-left" aria-hidden="true"></i></span>
            <a>切换城市</a>
          </header>
          <div className="main-content">
            <section className="search-content">
              <div className="search-detail">
                  <input placeholder="输入学校 商务楼 地址" onChange={this.changeHandle} defaultValue={this.state.searchInput} onKeyDown={this.keydownFun}/>
                  <button onClick={this.searchFun}>提交</button>
              </div>
            </section>
            <section className="history-search">
            {
              this.state.is_first?(
                <div>
                  <h4>搜索历史</h4>
                  {
                    this.state.historySearch.length>0?(
                      <ul>{historyDom}</ul>
                    ): <p className="no-message">暂无历史搜素</p>
                  }
                </div>
              ):(
                <div>{
                  this.state.searchData.length>0?(
                    <ul>{searchDom} </ul>
                  ):<p className="no-message">搜素失败</p>
                }
                </div>
              )
            } 
            </section>
          </div>
        </div>
      );
    }
  }
  export default SearchPlace;