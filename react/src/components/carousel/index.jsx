import React, { Component } from "react";
// import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
// import Test from "../../views/Test";
import "./index.scss";
import PropTypes from "prop-types";
// 当props为对象时候, 不能直接输出、不能直接修改, 否则报错
export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      listIndex: 1,
      translateX: 0,
      transition: true,
      itemsLen: 0,
      list: [],
      listLen: 0,
      timer: 0,
      intervalTimer: 0
    };
    this.initList = this.initList.bind(this);
    this.$emit = this.$emit.bind(this);
    this.changeView = this.changeView.bind(this);
    this.autoPlay = this.autoPlay.bind(this);
    this.clearPlay = this.clearPlay.bind(this);
    this.handlerIndex = this.handlerIndex.bind(this);
    this.handlerDir = this.handlerDir.bind(this);

  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    interval: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string,
    auto: PropTypes.bool,
    autoInterval: PropTypes.number,
    hideDir: PropTypes.bool,
    isReloadPlay: PropTypes.bool,
    clickEach: PropTypes.bool,
    onchange: PropTypes.func
  };
  static defaultProps = {
    width: "800px",
    height: "450px",
    interval: 500,
    auto: true,
    autoInterval: 5000,
    hideDir: true,
    isReloadPlay: false,
    clickEach: true,
    onchange: () => {},
    title: () => {},
    count: () => {}
  };

  initList() {
    const props = this.props;
    let itemsLen = props.items.length - 1;
    let list = [props.items[itemsLen], ...props.items, props.items[0]];
    let listIndex = this.state.listIndex;
    this.setState(
      {
        itemsLen,
        list,
        listLen: list.length,
        translateX: listIndex * -800,
        index: 0,
        listIndex: 1
      },
      () => {
        this.autoPlay();
      }
    );
  }
  componentDidMount() {
    this.initList();
    // $nextTick
    // 方法会在组件已经被渲染到 DOM 中后运行   - 挂载
  }
  componentWillUnmount() {
    // 卸载触发
  }
  $emit(event, msg) {
    if (!event && event !== 0) return new Error("event不能为空");
    return this.props[event](msg);
  }
  changeView(index, oldIndex) {
    const state = this.state;
    let transition = true;
    let translateX = 0;
    let timer = 0;
    if (oldIndex === 0 && index !== 1 && index !== index - oldIndex) {
      timer = setTimeout(() => {
        transition = false;
        translateX = -(index + 1) * 800;
        this.setState({
          transition,
          translateX
        });
      }, 500);
    } else if (oldIndex === state.itemsLen && index === 0) {
      translateX = -(state.listLen - 1) * 800;
      timer = setTimeout(() => {
        transition = false;
        translateX = -1 * 800;
        this.setState({
          transition,
          translateX
        });
      }, 500);
    } else {
      translateX = (index + 1) * -800;
    }
    this.setState(
      {
        transition,
        translateX,
        timer
      },
      () => {
        this.$emit("onchange", index);
      }
    );
  }
  autoPlay() {
    this.clearPlay();
    if (this.props.auto) {
      this.setState({
        intervalTimer: setInterval(() => {
          const state = this.state;
          let oldIndex = state.index;
          let index = oldIndex;
          index = index >= state.itemsLen ? 0 : ++index;
          this.setState(
            {
              index
            },
            () => {
              this.changeView(index, oldIndex);
            }
          );
        }, this.props.autoInterval)
      });
    }
  }
  clearPlay() {
    clearInterval(this.state.intervalTimer);
  }
  handlerIndex(index) {
    let oldIndex = this.state.index;
    this.setState(
      {
        index
      },
      () => {
        this.changeView(index, oldIndex);
      }
    );
  }
  handlerDir(dir) {
    const state = this.state;
    let oldIndex = state.index;
    let index = oldIndex;
    if (dir === "next") {
      index = index === state.itemsLen ? 0 : ++index;
    } else {
      index = index <= 0 ? state.itemsLen : --index;
    }
    this.setState(
      {
        index
      },
      () => {
        this.changeView(index, oldIndex);
      }
    );
  }
  render() {
    const state = this.state;
    const props = this.props;
    return (
      <section className="wrap">
        <div
          style={{
            width: props.width,
            height: props.height,
            overflow: "hidden"
          }}
        >
          <div
            className="carousel-img"
            style={{
              width: state.listLen * 100 + "%",
              transform: `translateX(${state.translateX}px)`,
              transition: state.transition
                ? `all ${props.interval / 1000}s ease`
                : ""
            }}
          >
            {state.list.map((item, index) => (
              // 这里有个slot
              <div
                className="item"
                key={index}
                style={{
                  background: `url(${item.src}) no-repeat center center/100% 100%`,
                  color: "#fff"
                }}
              >
                {this.props.title(item.title)}
              </div>
            ))}
          </div>
          <div
            className="wrap-btn"
            onMouseEnter={this.clearPlay.bind(this)}
            onMouseLeave={this.autoPlay.bind(this)}
            onClick={this.$emit("onchange", this.state.index)}
          >
            <div style={{ flex: 1 }} />
            {props.hideDir ? (
              <div className="carouse-btn-direction" v-if="!">
                <p onClick={this.handlerDir.bind(this, "prev")}>&lt;</p>
                <p onClick={this.handlerDir.bind(this, "next")}>&gt;</p>
              </div>
            ) : (
              ""
            )}
            <div style={{ flex: 1 }} />
            <div className="carouse-btn">
              <section>
                <p style={{ flex: 1 }} />
                {props.clickEach ? (
                  <div style={{ display: "flex" }}>
                    {new Array(state.itemsLen + 1)
                      .fill("x")
                      .map((item, index) => (
                        <span
                          key={index * 100}
                          className={[index === state.index ? "active" : ""]}
                          onClick={this.handlerIndex.bind(this, index)}
                        />
                      ))}
                  </div>
                ) : (
                  ""
                )}
                <p style={{ flex: 1 }} />
                {this.props.count({
                  currentIndex: state.index,
                  total: state.itemsLen
                })}
              </section>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
