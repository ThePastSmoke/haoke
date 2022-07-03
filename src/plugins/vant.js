import {
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Tabbar,
  TabbarItem,
  Search,
  Icon,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Image,
  Form,
  Field
} from 'vant'
const elements = [
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Tabbar,
  TabbarItem,
  Search,
  Icon,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Image,
  Form,
  Field
]
export default function (Vue) {
  elements.forEach((item) => {
    Vue.use(item)
  })
}
