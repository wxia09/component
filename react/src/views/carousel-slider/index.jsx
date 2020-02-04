import CarouseSlider from "../../components/carousel-slider";
import React from "react";
import items from './items';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div style={{width: '800px', margin: '20px auto'}}>
        <CarouseSlider items={items} ></CarouseSlider>
      </div>
    );
  }
}
