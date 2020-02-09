import Toast from "./index.vue";
import Vue from "vue";

const MessageConstructor = Vue.extend(Toast);
let instances = [];
let instance;
let seed = 1;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function isVNode(node) {
  return (
    node !== null &&
    typeof node === "object" &&
    hasOwn(node, "componentOptions")
  );
}
const Message = function(options) {
  options = options || {};
  if (typeof options === "string") {
    options = {
      message: options
    };
  }
  let userClose = options.onClose;
  let id = "message" + seed++;

  options.onClose = function() {
    Message.close(id, userClose);
  };
  instance = new MessageConstructor({
    data: {
      ...options
    }
  });
  // instance.onClose = options.onClose;
  instance.id = id;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  let verticalOffset = options.offset || 20;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 20;
  });
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance;
};

["info", "success", "error", "warning"].forEach(type => {
  Message[type] = options => {
    options.type = type;
    return Message(options);
  };
});

Message.close = (id, userClose) => {
  let len = instances.length;
  let index = -1;
  let removeHeight;
  for (let i = 0; i < len; i) {
    if (id === instances[i].id) {
      removeHeight = instances[i].$el.offsetHeight;
      index = i;
      if (typeof userClose === "function") {
        userClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  if (index === -1 || len <= 1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el;
    dom.style["bottom"] =
      parseInt(dom.style["bottom"], 10) - removeHeight - 20 + "px";
  }
};
Message.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};
function registryToast() {
  Vue.prototype.$message = Message;
}

export default registryToast;
