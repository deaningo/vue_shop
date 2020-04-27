import Vue from 'vue'
import {
        Button,Form,FormItem,Input,Message,container,header,aside,main,menu,submenu,MenuItem,RadioButton,RadioGroup,Footer,DropdownMenu,Dropdown,DropdownItem,
        Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,Switch,Pagination,Dialog,MessageBox,Tag,Tree,Select,Option
    } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(container)
Vue.use(header)
Vue.use(aside)
Vue.use(main)
Vue.use(menu);
Vue.use(submenu);
Vue.use(MenuItem);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Footer);
Vue.use(DropdownMenu);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
