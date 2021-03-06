import React from 'react';
import { Link } from 'react-router-dom'
import './index.scss'
import ShopService from '../../service/shop-service'
import CityService from '../../service/city-service'
import {environment} from '../../environments/environment'
import queryString from 'query-string'
// import {bodyTouchEvent} from '../../common/scroll'
const ImgPrefix = environment.ImgPrefix
const ListImgfix = environment.ListImgfix
const ShopModel = new ShopService()
const CityModel = new CityService()
export default class ShopList extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        categoryData:[],
        shopList:[],
        is_loading:false,
        offset:0,
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        is_all:false,
        latitude:31.32062,
        longitude:121.389028,
        pois:null
     }
    }
    componentWillMount(){
      this.getParams();
    }
    componentDidMount(){
      this.getCategorylist()
      this.getShopList();
      this.bodyTouchEvent();
    }
    getParams() {
      if (this.props) {
        if (this.props.location.search) {
          let search = queryString.parse(this.props.location.search),
          parsed = search.geohash,
          latitude = parsed.split(',')[0],
          longitude=parsed.split(',')[1];
          this.setState({
              latitude,
              longitude
         })
         this.getPois(parsed);
        }
      }
    }
    // 根据地理位置获取地址信息
    async getPois(parsed){
      const pois =  await CityModel.getPois(parsed);
      this.setState({
        pois
      })
      let historySearch = [];
      if(localStorage.getItem('historySearch')){
        historySearch = JSON.parse(localStorage.getItem('historySearch'));
        if(historySearch.length>10){
          historySearch.shift()
        }
        let flag = historySearch.some((val)=>{
          return val.address===pois.address
        })
        if(!flag){
           historySearch.push(pois)
        }
        localStorage.setItem('historySearch',JSON.stringify(historySearch))
      }else{
        historySearch.push(pois)
        localStorage.setItem('historySearch',JSON.stringify(historySearch))
      }
    }
    // 获取分类信息
   async getCategorylist(){
      const categoryData = await ShopModel.getCategorylist();
      this.setState({
        categoryData
      },()=>{
        // this.categoryTouchEvent();
      })
  }
  // 获取商品信息
  async getShopList(){
    let params = {
        'latitude':this.state.latitude,
        'longitude':this.state.longitude,
        'offset':this.state.offset,
        'limit':20,
        'keyword':'',
        'restaurant_category_id':'',
    }
    const shopList = await ShopModel.getShopList(params);
    let newShopList = [...this.state.shopList,...shopList];
    if(shopList.length<20){
      this.setState({
        is_all :true
      }) 
    }
    this.setState({
      shopList:newShopList,
      preventRepeatReuqest:false,
    })
  }
  // 分类左滑右滑事件
  categoryTouchEvent(){
      const slide_box = document.getElementById('category-list');
      let startX,endX,moveX;
      slide_box.addEventListener('touchstart', function (e) {
        var event = encodeURIComponent || window.event;
        event.preventDefault();
        startX = event.targetTouches[0].pageX;
      });
      slide_box.addEventListener('touchmove', function (e) {
          var event = e || window.event;
          event.preventDefault();
          endX = event.targetTouches[0].pageX;
      });
      slide_box.addEventListener('touchend', function (e) {
          var event = e || window.event;
          event.preventDefault();
          setTimeout(()=>{
            touch_if();
          },500)    
      });
     //判断左滑右滑
     let touch_if = function () {
        moveX = startX - endX;//滑动距离
        if (moveX > 30) {//左滑
            console.log('左滑');
            document.getElementsByClassName('round-content')[0].children[0].classList.remove('active');
            document.getElementsByClassName('round-content')[0].children[1].classList.add('active');
            document.getElementById('category-list').children[0].style.marginTop="-50%"
        } else if (moveX < -30) {//右滑
          console.log('右滑');
          document.getElementsByClassName('round-content')[0].children[1].classList.remove('active');
          document.getElementsByClassName('round-content')[0].children[0].classList.add('active');
          document.getElementById('category-list').children[0].style.marginTop="0"
        }
    };
  }
  //滚动条在Y轴上的滚动距离
  bodyTouchEvent() {
    let _this=this;
    const slide_box = document.body;
    let startY, endY, moveY;
    slide_box.addEventListener('touchstart', function (e) {
        var event = e || window.event;
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
              event.preventDefault();
          }
        }
        startY = event.targetTouches[0].pageY;
    });
    slide_box.addEventListener('touchmove', function (e) {
        var event = e || window.event;
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
              event.preventDefault();
          }
        }
        endY = event.targetTouches[0].pageY;
    });
    slide_box.addEventListener('touchend', function (e) {
        var event = e || window.event;
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
              event.preventDefault();
          }
        }
        moveY = endY - startY; //滑动距离
          if(moveY<0&&_this.getScrollTop() + _this.getWindowHeight() +50>_this.getScrollHeight()){
            if(_this.state.preventRepeatReuqest ||_this.state.is_all){
              return;
            }else{
                let offset = _this.state.offset;
                _this.setState({
                  preventRepeatReuqest:true,
                  offset:offset+1
                },()=>{
                  _this.getShopList()
                })
             
            }
        }
    });
    // pc 端
    window.addEventListener('scroll',_this.pcScrollEvent)
  }

  //pc端滚动事件
  pcScrollEvent=(e)=>{
    var event = e || window.event;
    event.preventDefault();
    if(this.getScrollTop() + this.getWindowHeight() +50>this.getScrollHeight()){
      if(this.state.preventRepeatReuqest||this.state.is_all){
        return;
      }else{
        let offset = this.state.offset;
        this.setState({
          preventRepeatReuqest:true,
          offset:offset+1
        },()=>{
          this.getShopList()
        })
      }
    }
  }
  // 滚动高度
  getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
  //文档的总高度
  getScrollHeight() {
    var scrollHeight = 0,
        bSH =0,
        dSH=0;
    if (document.body) {
        bSH = document.body.scrollHeight;
    }
    if (document.documentElement) {
        dSH = document.documentElement.scrollHeight;
    }
    scrollHeight = (bSH - dSH > 0) ? bSH : dSH;
    return scrollHeight;
  }
  // 浏览器视图的高度
  getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }
  render() {
      let categoryDom;
      if(this.state.categoryData.length>0){
        categoryDom = this.state.categoryData.map((item,index)=>{
          return(
            <li key={index}>
              <Link to={{
                pathname: "/category-list",
                search: `?geohash=${this.state.latitude},${this.state.longitude}&&title=${item.title}`,
              }}>
                  <img src={ImgPrefix+item.image_url}/>
                  <span>{item.title}</span>
                </Link>
            </li>
          )
        })
      }
      let shopDom;
      if(this.state.shopList.length>0){
        shopDom = this.state.shopList.map((item,index)=>{
          return(
              <div className="shop-item" key={index}>
                <img src={ListImgfix+item.image_path}/> 
                <div className="shop-content">
                  <h4 className="title">{item.name}</h4>
                  <section className="detail">
                    <div className="star-detail">
                      <span><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></span>
                      <span>{item.rating}</span>
                      <span>月售{item.recent_order_num}单</span>
                    </div>
                    <div className="delivery-method">
                      <span>蜂鸟专送</span>
                      <span>准时达</span>
                    </div>
                  </section>
                  <section className="distance-content">
                    <span>¥{item.float_minimum_order_amount}起送／配送费¥{item.float_delivery_fee}</span>
                    <span>{item.distance}km／<i>{item.order_lead_time}</i></span>
                  </section>
                </div>
              </div>
          )
        })
      }
      return (
        <div className="page-list">
          <header>
            <a href="/" className="search-btn"><i className="fa fa-search" aria-hidden="true"></i></a>
            <span className="current-place">{this.state.pois&&this.state.pois.name?this.state.pois.name:''}</span>
            <a href="javascript:void(0)" className="login-register-btn">登录|注册</a>
          </header>
          <nav className="category-list">
              <div id="category-list">
                <ul>{categoryDom}</ul>
              </div>
              <div className="round-content">
                <span className="active"></span><span></span>
              </div>
          </nav>
          <section className="shop-list">
              <h4><i className="fa fa-home" aria-hidden="true"></i><span>附近商家</span></h4>
              {
                this.state.preventRepeatReuqest?<i className="fa-li fa fa-spinner fa-spin"></i>:
                shopDom}
              {
                this.state.is_all?<p>没有更多了</p>:''
              }
              <p></p>
          </section>
        </div>
      );
    }
  }