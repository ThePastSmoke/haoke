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
  Field,
  Toast,
  Dialog,
  DropdownMenu,
  DropdownItem,
  IndexBar,
  IndexAnchor,
  Card,
  Tag,
  Area,
  Popup,
  Picker,
  Uploader
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
  Field,
  Toast,
  Dialog,
  DropdownMenu,
  DropdownItem,
  IndexBar,
  IndexAnchor,
  Card,
  Tag,
  Area,
  Popup,
  Picker,
  Uploader
]
export default function (Vue) {
  elements.forEach((item) => {
    Vue.use(item)
  })
}
