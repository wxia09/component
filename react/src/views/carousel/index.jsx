import Carousel from '../../components/carousel';
import React from "react";
import items from './items';
export default class App extends React.Component {
    render() {
        return (
            <div style={{height: '450px', width: '800px', margin: 'auto'}}>
                <Carousel items={items} />
            </div>
        )
    }
}
