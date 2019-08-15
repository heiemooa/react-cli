/**
 * 缓存
 * Created by huangfushan on 2019-08-12 09:06
 */

//设置缓存
export const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  localStorage.setItem(name, content);
};

//获取缓存
export const getStorage = name => {
  if (!name) return;
  return localStorage.getItem(name);
};

//清除缓存
export const removeStorage = name => {
  if (!name) return;
  return localStorage.removeItem(name);
};
