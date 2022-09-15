import {
  NavBar,
  Form,
  Field,
  Button,
  Search,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  DropdownMenu,
  DropdownItem,
  Tabbar,
  TabbarItem,
  Icon,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Col,
  Row,
  IndexBar,
  IndexAnchor,
  Tab,
  Tabs,
  TreeSelect,
  Picker
} from 'vant'
const componentVant = [
  NavBar,
  Form,
  Field,
  Button,
  Search,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  DropdownMenu,
  DropdownItem,
  Tabbar,
  TabbarItem,
  Icon,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Col,
  Row,
  IndexBar,
  IndexAnchor,
  Tab,
  Tabs,
  TreeSelect,
  Picker
]

const registerVant = (Vue) => {
  componentVant.forEach((component) => Vue.use(component))
}

export default registerVant
