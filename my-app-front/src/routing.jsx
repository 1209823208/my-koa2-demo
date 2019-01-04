import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
const Loading = () => <div>Loading...</div>;

const LayoutIndex = Loadable({
	loader: () => import('./components/layout'),
	loading: Loading,
});
const ErrorPage = Loadable({
	loader: () => import('./pages/error'),
	loading: Loading,
});
const Home = Loadable({
	loader: () => import('./pages/home'),
	loading: Loading,
});
const List = Loadable({
	loader: () => import('./pages/list'),
	loading: Loading,
});
const SearchPlace = Loadable({
	loader: () => import('./pages/searchPlace'),
	loading: Loading,
});
const CategoryList = Loadable({
	loader:()=>import('./pages/categoryList'),
	loading:Loading
})

export const route_list = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/list" component={List} />
        <Route path="/search-place" component={SearchPlace} />
        <Route path="/category-list" component={CategoryList} />

        {/* 路由从上向下匹配，匹配成功 break,匹配不到就执行最后一行ErrorPage页面 */}
        <Route component={ErrorPage} />
    </Switch>
);
