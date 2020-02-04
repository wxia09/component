import Index from "@views";
import Carousel from "@views/carousel";
import Slider from "@views/carousel-slider";
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
  }
])();
