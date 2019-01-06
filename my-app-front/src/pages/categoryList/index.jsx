import  React from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import $ from  'jquery'
import Category from '@service/category-service'
import {environment} from '@environments/environment'
import { PullToRefresh, ListView, Button } from 'antd-mobile'
import queryString from 'query-string'
import './index.scss'
const CategoryService = new Category()
const ImgPrefix=environment.ImgPrefix
const data = [
    {
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: 'Meet hotel',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: 'McDonald\'s invites you',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      title: 'Eat the week',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
  ];
const NUM_ROWS = 20;
let pageIndex = 0;
// 下拉刷新
function genData(pIndex = 0) {
const dataArr = [],currentNums = pIndex * NUM_ROWS,len=data.length;
// for (let i = 0; i <NUM_ROWS && currentNums+i<len; i++) {
//     dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
// }

for (let i = 0; i <NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
}
return dataArr;
}
export default class CategoryList extends React.Component {
    constructor(props){
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });      
        this.state={
            sort_container:[{
                id:'zhineng',
                icon:'fa-sort-amount-asc',
                name:'智能排序'
            },{
                id:'distance',
                icon:'fa-truck',
                name:'距离最近'
            },{
                id:'num',
                icon:'fa-fire',
                name:'销量最高'
            },{
                id:'price',
                icon:'fa-y-combinator',
                name:'起送价最低'
            },{
                id:'super',
                icon:'fa-calendar-o',
                name:'配送速度最快'
            },{
                id:'star',
                icon:'fa-star',
                name:'评分最高'
            }],
            category_container:[],
            second_category_container:[],
            current_category_id:0,
            properties:[],
            filter_params:{
                properties:[],
                sort_id:'',
                category_id:0
            },
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            latitude:31.32062,
            longitude:121.389028,
            title:''
        }
    }
    componentDidMount(){
        // 获取参数
        this.getParams()
        $(".category_title").each(function(){
            $(this).click(function() {
                if( $(this).siblings('section').hasClass('active')){
                    $(this).siblings('section').removeClass('active');
                }else{
                    $(this).siblings('section').addClass('active');
                    $(this).parent('.sort_item').siblings().find(".oprate-item").removeClass('active')
                }
            });
        })
        let properties=this.state.properties,_this=this;
        $(".filter_li").each(function(){
            $(this).click(function(){
                let val = $(this).attr('data-id')
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    properties.slice(properties.indexOf(val),1);
                }else{
                    $(this).addClass('active');
                    properties.push(val)
                }
                _this.setState({
                    properties
                })
            })
        })
        //初始化分页数据
        this.initPageData()
        // 获取分类数据
        this.getCategoryList();
    }
    getParams() {
        if (this.props) {
          if (this.props.location.search) {
            let search = queryString.parse(this.props.location.search),
            parsed = search.geohash,
            title = search.title,
            latitude = parsed.split(',')[0],
            longitude=parsed.split(',')[1];
            this.setState({
                latitude,
                longitude,
                title
           })
           
          }
        }
      }
    properCancle(e){
        let filter_params = this.state.filter_params;
        filter_params.properties = [];
        this.setState({
            properties:[],
            filter_params
        },()=>{
            console.log('pro',this.state.filter_params)
        })
        $(e.currentTarget).parents('.oprate-item').removeClass('active');
    }
    properSave(e){
        let filter_params = this.state.filter_params;
        filter_params.properties = this.state.properties;
        this.setState({
            filter_params
        },()=>{
            console.log('pro',this.state.filter_params)
        })
        $(e.currentTarget).parents('.oprate-item').removeClass('active');
    }
    componentDidUpdate(){
       let _this = this;
        $(".category_left_li").each(function() {
            $(this).click(function() {
                _this.getSecondCategoryList($(this).attr('data-parent-id'))
                $(this).addClass("category_active").siblings().removeClass("category_active");
            });
        });
    }
    async getCategoryList(){
        let params = {
            level:1
        }
       let resData = await CategoryService.getCategoryList(params)
        this.setState({
            category_container:resData,
            current_category_id:resData[0]['id']
        },()=>{
            this.getSecondCategoryList(resData[0]['id'])
        })
    }
    async getSecondCategoryList(parent_id){
        let params = {
            parent_id
        }
       let resData = await CategoryService.getCategoryList(params)
        this.setState({
            second_category_container:resData   
        })
    }
    sortFun(e,id){
        let filter_params = this.state.filter_params
        filter_params.sort_id = id;
        this.setState({
            filter_params
        },()=>{
            console.log('filter_params',this.state.filter_params)
        })
        $(e.currentTarget).addClass('select').siblings('.sort-list-li').removeClass('select')
        $(e.currentTarget).parents('.oprate-item').removeClass('active');
        
    }
    categoryHandle(e,id){
        let filter_params = this.state.filter_params
        filter_params.category_id = id;
        this.setState({
            filter_params
        },()=>{
            console.log('filter_params',this.state.filter_params)
        })
        $(e.currentTarget).parents('.oprate-item').removeClass('active');
    }
  
    // 初始化分页数据
    initPageData(){
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        setTimeout(() => {
          this.rData = genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(genData()),
            height: hei,
            refreshing: false,
            isLoading: false,
          });
        }, 1500);
    }
    //到达底部加载数据
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        this.setState({ isLoading: true });
        setTimeout(() => {
          this.rData = [...this.rData, ...genData(++pageIndex)];
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 1000);
      };
    render(){
        let sort_container = this.state.sort_container.map((item,index)=>{
            return (
                <li className="sort-list-li" key={index} onClick={(e)=>this.sortFun(e,item.id)}>
                    <i className={`fa icon ${item.icon}`} aria-hidden="true"></i>
                    <p className="sort-select">
                        <span>{item.name}</span>
                    </p>
                </li>
            )
        })
        let category_container = this.state.category_container.map((item,index)=>{
            let activeClass = item.id===this.state.current_category_id?'category_active':'';
            return(                      
                <li className={`category_left_li ${activeClass}`} key={index} data-parent-id = {item.id}>
                    <section>
                        {
                            item.image_url?<img className="icon" src={ImgPrefix+'/'+item.image_url+'.png'}/>:''
                        }
                        <span>{item.name}</span>
                    </section>
                    <section className="num-container">
                        <span>{item.count}</span>
                        {
                            item.image_url? <i className="fa fa-angle-right" aria-hidden="true"></i>:''
                        }
                    </section>
                </li>
            )
        })
        let second_category_container = this.state.second_category_container.map((item,index)=>{
            return(
                    <li className="category_right_li" key={index} onClick={(e)=>this.categoryHandle(e,item.id)}>
                        <span>{item.name}</span>
                        <span>{item.count}</span>
                    </li>
            )
        })

        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
          if (index < 0) {
            // this.setState({
            //     hasMore:false
            // })
            index = data.length - 1
          }
          const obj = data[index--];
          return (
            <div key={rowID}>
              <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
                <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
                <div style={{ display: 'inline-block' }}>
                  <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}-{rowData}</div>
                  <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
                </div>
              </div>
            </div>
          );
        };
        return(
            <div className="category-page">
                <header>
                    <Link className='goBack' to={{
                        pathname: "/list",
                        search: `?geohash=${this.state.latitude},${this.state.longitude}`,
                    }}>
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </Link>
                    <span>{this.state.title}</span>
                </header>
                <section className="oprate-type">
                    <div className="sort_item">
                        <div className="category_title">分类</div>
                        <section className="category_container oprate-item">
                            <section className="category_left">
                                <ul>
                                    {category_container}
                                </ul>
                            </section>
                            <section className="category_right">
                                <ul>
                                    {second_category_container}
                                </ul>
                            </section>
                        </section>
                    </div>
                    <div className="sort_item">
                        <div className="category_title">排序</div>
                        <section className="sort-container oprate-item">
                            <ul className="sort-list-container">
                                {sort_container}
                            </ul>
                        </section>
                    </div>
                    <div className="sort_item">
                        <div className="category_title">筛选</div>
                        <section className="filter-container oprate-item">
                            {/* <section>
                                <p className="filter_header_style">配送方式</p>
                                <ul className="filter_ul">
                                    <li className="filter_li">蜂鸟专送</li>
                                </ul>
                            </section> */}
                            <section>
                                <p className="filter_header_style">商家属性(可多选)</p>
                                <ul className="filter_ul">
                                    <li className="filter_li" data-id="pinpai">品牌商家</li>
                                    <li className="filter_li" data-id="waibao">外卖保</li>
                                    <li className="filter_li" data-id="zhunshi">准时达</li>
                                    <li className="filter_li" data-id="new">新店</li>
                                    <li className="filter_li" data-id="pay">在线支付</li>
                                    <li className="filter_li" data-id="fapiao">开发票</li>
                                </ul>
                            </section>
                            <section  className="btns">
                                <button onClick={(e)=>this.properCancle(e)}>清空</button>
                                <button onClick={(e)=>this.properSave(e)}>确定</button>
                            </section>
                        </section>
                    </div>
                </section>
                <section>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                             {this.state.isLoading ? 'Loading...' : 'Loaded'}
                            </div>)}
                    renderRow={row}
                    style={{
                    height: this.state.height,
                    border: '1px solid #ddd',
                    margin: '5px 0',
                    }}
                    onEndReached={this.onEndReached}
                />
                </section>
            </div>
        )
    }

}
