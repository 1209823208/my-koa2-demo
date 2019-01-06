import React from 'react'
import './index.scss'
import CityService from '../../service/city-service'
import { Link } from 'react-router-dom'
const CityModel = new CityService()
export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        currentCityInfo:{
          abbr: "",
          area_code: "",
          id: 1,
          is_map: true,
          latitude: 31.23037,
          longitude: 121.473701,
          name: "",
          pinyin: "",
          sort: 1
        },
        hotCityInfo:[],
        allCityInfo:null
     }
    }
    componentDidMount(){
      this.getCityAllInfo()

    }
    async getCityAllInfo(){
     const allData =  await CityModel.getCityAllInfo()
     this.setState({
      currentCityInfo:allData.currentCityInfo,
      hotCityInfo:allData.hotCityInfo,
      allCityInfo:allData.allCityInfo,
     })
    }
   
    render() {
      let hot_city_container = this.state.hotCityInfo.map((item,index)=>{
        return(
          <li key={index}><Link to={{
            pathname: "/search-place",
            search: `id=${item.id}`,
          }}>{item.name}</Link></li>
        )
      })
      let getAllData=()=>{
        let allCity = [];
        let i = -1;
        if(this.state.allCityInfo){
          for(let [k,v] of Object.entries(this.state.allCityInfo)){
            i++
            let m = (
              <li className="parent-style-li" key={k}>
              <h4 className="city_title">{k}-{i}</h4>
                  <ul>
                    {
                        v.map(item=>{return (<li key={item.id}><Link to={{
                          pathname: "/search-place",
                          search: `id=${item.id}`,
                        }}>{item.name}</Link></li>)})
                    }
                </ul>
              </li>
            )
            allCity.push(m)
          }
        }
        return allCity;
      }
      return (
        <div className="page-home">
            <header>
              <a href="javascript:void(0)"><span>登录|注册</span></a>   
            </header>
            <nav className="city-nav">
              <div className="class-tip">
                <span>当前定位城市：</span>
                <span>{this.state.currentCityInfo.name}</span>
              </div>
              <a href="javascript:void(0)" className="guess-city">
                <span><i className="fa fa-angle-right" aria-hidden="true"></i></span>
              </a>
            </nav>
            <div className="main-content">
              <section id="hot_city_container">
                  <h4 className="city_title">热门城市</h4>
                  <ul>{hot_city_container}</ul>
              </section>
              <section className="group_city_container">
              <ul>
               {getAllData()}
              </ul>
            </section>
            </div>
        </div>
      );
    }
  }