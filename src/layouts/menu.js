/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

const menuData = [
  {
    name: '学生列表',
    path: 'home',
    icon: 'usergroup-add',
  },
  {
    name: '列表页管理',
    path: 'list',
    icon: 'appstore',
    children: [
      {
        name: '列表页一',
        path: 'list/user',
        icon: 'menu',
      },
    ],
  },
];

function formatter(data, parentAuthority, parentPath = '/') {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority,
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
