/**
 * 定义sidebar和header中的菜单项
 * 一些约定:（没有用到第三方样式，所以目前还没实现）
 * 1.菜单一般最多3层;
 * 2.只有"叶子"节点才能跳转;
 * 3.所有的key都不能重复;
 *
 * Created by huangfushan on 2019-08-13 15:22
 */
const headerMenus = [
  { path: '/', name: '首页' },
  { path: '/mall', name: '平台商城' },
  { path: '/journey', name: '美好旅途' },
  { path: '/about', name: '关于我们' },
];

export {
  headerMenus,
};
