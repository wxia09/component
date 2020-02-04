import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './index.scss';
class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentsRouter: [
                {
                    path: '/carousel',
                    name: 'carousel'
                },
                {
                    path: '/carousel-slider',
                    name: 'carousel-slider'
                }
            ]
        }
    }

    render() {
        return (
            <div style={{padding: '20px'}}>
                <h1>组件列表</h1>
                <ul>
                    {
                        this.state.componentsRouter.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Routes;
