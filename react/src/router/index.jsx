import {Route, BrowserRouter, Switch} from 'react-router-dom';
import routes from './routes';
import React , {Component} from 'react';

export default class Router extends Component {
    constructor(props) {
        super(props);
        this.routerArr = [];
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {
                        this.TraversalRouter(routes)
                    }
                </Switch>
            </BrowserRouter>
        )
    }
    TraversalRouter(route) {
        return route.map((item, index) => (
            <this.RouteWithSubRoutes key={index} {...item} />
        ))
    }
    RouteWithSubRoutes(route) {
        return (
            <Route path={route.path} render={props => (
                <route.component {...props} routes={route.children}/>
            )} />
        )
    }
}