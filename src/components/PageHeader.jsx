import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined ,HeartOutlined,HomeOutlined ,PlusSquareOutlined} from '@ant-design/icons';
import React from 'react'
import logo from '../images/m.jpg'

const { SubMenu } = Menu;

class PageHeader extends React.Component {
  state = {
    current: 'mail',
  };
  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        {/* <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item> */}
        <img src={logo} alt="logo" className="movielens-logo-img"/>
        <Menu.Item key="home_page" icon={<HomeOutlined />}>
        <a href="#/"  rel="noopener noreferrer">
            首页
        </a>
        </Menu.Item>
        <Menu.Item key="pick_groups" icon={<PlusSquareOutlined />}>
        <a href="#/profile/settings/pick-groups"  rel="noopener noreferrer">
            选择分组
        </a>
        </Menu.Item>
        <Menu.Item key="my_rating" icon={<HeartOutlined />}>
        <a href="#/profile/about-your-ratings"  rel="noopener noreferrer">
            我的评分
        </a>
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="切换推荐模式">
            <Menu.Item key="setting:1">模式1</Menu.Item>
            <Menu.Item key="setting:2">模式2</Menu.Item>
            <Menu.Item key="setting:3">模式3</Menu.Item>
        </SubMenu>
        
      </Menu>
    );
  }
}


export default PageHeader