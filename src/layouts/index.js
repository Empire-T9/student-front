import React, { useState } from 'react';
import SiderMenu from './sider-menu';
import { Layout, BackTop } from 'antd';
import logo from '../../public/favicon.png';
import { getMenuData } from './menu.js';

const { Content } = Layout;

export default (props) => {
  const { children, location } = props;
  const [menus] = useState(getMenuData());
  const [collapsed, setCollapsed] = useState(false);

  function onCollapse() {
    setCollapsed(!collapsed);
  }

  return (
    <Layout style={{ height: '100%' }}>
      <SiderMenu
        logo={logo}
        collapsed={collapsed}
        onCollapse={onCollapse}
        menuData={menus}
        location={location}
      />
      <Layout
        style={{
          paddingLeft: collapsed ? 80 : 200,
          transition: 'padding-left 0.3s ease',
          minHeight: '100vh',
        }}
      >
        <Content
          style={{
            margin: 16,
            padding: 16,
            background: '#fff',
            overflow: 'auto',
          }}
        >
          <div>{children}</div>
          <BackTop />
        </Content>
      </Layout>
    </Layout>
  );
};
