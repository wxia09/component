import Index from "@views/index";
import Carousel from "@views/carousel";
import Slider from "@views/carousel-slider";
import Message from "@views/message";
export default (() => [
  {
    path: "/",
    component: Index
  },
  {
    path: "/carousel",
    component: Carousel
  },
  {
    path: "/slider",
    component: Slider
  },
  {
    path: "/message",
    component: Message
  }
])();
