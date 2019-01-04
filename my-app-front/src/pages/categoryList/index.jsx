
import  React from 'react';
import './index.scss'
export default class CategoryList extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="category-page">
                <header>
                    <a><i className="fa fa-angle-left" aria-hidden="true"></i></a>
                    <span>甜品饮食</span>
                </header>
                <section className="oprate-type">
                    <span>分类</span>
                    <span>排序</span>
                    <span>筛选</span>
                </section>
            </div>
        )
    }

}
