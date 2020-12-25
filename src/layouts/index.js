import React, { useState, useEffect } from 'react';
import SiderMenu from './sider-menu';
import { Layout, BackTop, Icon } from 'antd';
import logo from '../../public/favicon.png';

const { Content } = Layout;
const ICON_LIST = {
  home: 'appstore',
  list: 'appstore',
};

export default (props) => {
  const {
    children,
    location,
    route: { routes },
  } = props;
  const [menus, setMenus] = useState([]);
  const [key, setKey] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  console.log(routes);

  function calcRoutes(list, parentNode) {
    return list.filter((item) => {
      if (item.parentNode === parentNode) {
        item.children = calcRoutes(list, item.name);
        item.icon = parentNode === '/' ? ICON_LIST[item.name] : null;
        return true;
      }
      return false;
    });
  }
  function initRoutes(routes) {
    const routesTemp = routes.filter(
      (item) => item.path !== '/' && item.path !== '/index.html',
    );
    routesTemp.forEach((item) => {
      const pathArr = item.path.split('/');
      item.name = pathArr[pathArr.length - 1];
      item.parentNode = pathArr[pathArr.length - 2] || '/';
      pathArr.pop();
      item.authority = pathArr.join('/');
      delete item.component;
      delete item.exact;
    });
    const list = calcRoutes(routesTemp, '/').reverse();
    setMenus(list);
    setKey(Math.random());
  }
  function onCollapse() {
    setCollapsed(!collapsed);
  }

  useEffect(() => {
    initRoutes(JSON.parse(JSON.stringify(routes)));
  }, []);

  return (
    <Layout style={{ height: '100%' }}>
      <SiderMenu
        key={key}
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
