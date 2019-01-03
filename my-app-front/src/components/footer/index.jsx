import React from 'react';
import {TabBar} from 'antd-mobile';
export default class Footer extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        selectedTab:'home',
        tabBarItems:[
            {
                title:"首页",
                key:"home",
                value:'home',
                iconClass:'fa fa-home',
            },
            {
                title:"想法",
                key:"idea",
                value:'idea',
                iconClass:'fa fa-share-alt-square',
            },
            {
                title:"大学",
                key:"university",
                value:'university',
                iconClass:'fa fa-graduation-cap',
            },
            {
                title:"通知",
                key:"notify",
                value:'notify',
                iconClass:'fa fa-bell-o',  
            },
            {
                title:"我的",
                key:"my",
                value:'my',
                iconClass:'fa fa-user-o',  
            }    
        ]
      }
    }
    renderContent(pageText) {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
          Click to show/hide tab-bar
        </div>
      );
    };
    render() {
        let tabList = this.state.tabBarItems.map(item=>{
            return(
                <TabBar.Item
                    title={item.title}
                    key={item.key}
                    icon={<i style={{fontSize:'22px'}} className={item.iconClass}></i>}
                    selectedIcon={<i style={{fontSize:'22px',color:"rgb(51, 163, 244)"}} className={item.iconClass}></i>}
                    selected={this.state.selectedTab === item.value}
                    onPress={() => {
                        this.setState({
                        selectedTab: item.value,
                        });
                    }}
                    >
                </TabBar.Item>
            )
        })
      return (
        <div>
              <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
              >
               {tabList}
          </TabBar>
        </div>
      );
    }
  }