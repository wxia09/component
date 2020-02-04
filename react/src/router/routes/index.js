import Carousel from "../../views/carousel";
import carouselSlider from "../../views/carousel-slider";
import Index from "../../views/index";
import Test from "../../views/Test";
export default (() => {
  return [
    {
      path: "/",
      component: Index,
      exact: true
    },
    {
      path: "/carousel",
      component: Carousel,
      children: [
        {
          path: "/carousel/1",
          component: Test
        }
      ]
    },
    {
      path: '/carousel-slider',
      component: carouselSlider,
      exact: true
    }
  ];
})();
