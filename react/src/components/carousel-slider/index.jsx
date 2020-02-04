import React from "./node_modules/react";
import "./index.scss";
import propTypes from "./node_modules/prop-types";
export default class CarouselSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      wrapWidth: 0,
      showCount: 0,
      transformX: 0
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.handlerIndex = this.hanlderIndex.bind(this);
    this.$emit = this.$emit.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.changeTransformX = this.changeTransformX.bind(this);
  }
  static propTypes = {
    items: propTypes.array.isRequired,
    transition: propTypes.number,
    dirChange: propTypes.bool,
    onchange: propTypes.func
  };
  static defaultProps = {
    transition: 500,
    dirChange: true,
    onchange: () => {}
  };
  prev() {
    let index = this.state.index;
    index = index <= 0 ? this.props.items.length - 1 : --index;
    this.setState(
      {
        index
      },
      () => {
        this.changeTransformX();
      }
    );
  }
  next() {
    let index = this.state.index;
    index = index >= this.props.items.length - 1 ? 0 : ++index;
    this.setState(
      {
        index
      },
      () => {
        this.changeTransformX();
      }
    );
  }
  hanlderIndex(index) {
    this.setState(
      {
        index
      },
      () => {
        this.changeTransformX();
      }
    );
  }
  changeTransformX() {
    let transformX = 0;
    const props = this.props;
    const state = this.state;
    let index = state.index;
    let itemsLen = props.items.length;
    if (index < state.showCount) {
      transformX = 0;
    } else if (index >= itemsLen - state.showCount) {
      transformX = -itemsLen * 100 + state.wrapWidth;
    } else if (index >= state.showCount) {
      transformX = -(index - state.showCount || 1) * 100;
    }
    this.setState(
      {
        transformX
      },
      () => {
        this.$emit("onchange", index);
      }
    );
  }
  $emit(event, msg) {
    if (!event && event !== 0) return new Error("event不能为空");
    return this.props[event](msg);
  }
  getWidth(ele, attr) {
    return parseFloat(getComputedStyle(ele)[attr]);
  }
  render() {
    const props = this.props;
    const state = this.state;
    let styleWrap = {
      display: "flex",
      width: props.items.length * 100 + "px",
      transition: `all ${props.transition / 1000}s ease`,
      transform: `translateX(${state.transformX}px)`
    };
    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {props.dirChange ? (
          <div
            className="pre dir"
            style={{ marginRight: "10px" }}
            onClick={this.prev}
          >
            &lt;
          </div>
        ) : (
          ""
        )}
        <div
          className="items"
          style={{ flex: 1, height: "100%", overflowY: "auto" }}
          ref="wrap"
        >
          <ul className="item" style={styleWrap}>
            {props.items.map((item, i) => (
              <li
                className={i === state.index ? "active" : ""}
                style={{
                  width: "100px",
                  height: "100%",
                  background: "rgba(0, 0, 0, .5)",
                  marginRight: "10px",
                  cursor: "pointer"
                }}
                onClick={this.hanlderIndex.bind(this, i)}
                key={i}
              >
                <img
                  src={item.src}
                  alt=""
                  style={{ width: "100%", height: "95%" }}
                />
                <p style={{ textAlign: "center" }}>{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
        {props.dirChange ? (
          <div
            className="next dir"
            style={{ marginLeft: "10px" }}
            onClick={this.next}
          >
            &gt;
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
  componentDidMount() {
    let wrapWidth = this.getWidth(this.refs.wrap, "width");
    let showCount = Math.round(wrapWidth / 100 / 2);
    this.setState({
      wrapWidth,
      showCount
    });
  }
}
