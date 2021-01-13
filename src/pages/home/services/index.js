import { authAxios } from '@/utils/axios';

// 查询学生列表
export function queryList() {
  return authAxios({
    method: 'get',
    url: `/student`,
  });
}
// 查询详情
export function queryDetail(id) {
  return authAxios({
    method: 'get',
    url: `/student/${id}`,
  });
}
// 新增一条
export function addDetail(data) {
  return authAxios({
    method: 'post',
    url: `/student`,
    data,
  });
}
// 更新一条
export function updateDetail(data) {
  return authAxios({
    method: 'put',
    url: `/student/${data.id}`,
    data,
  });
}
// 删除一条
export function deleteDetail(id) {
  return authAxios({
    method: 'delete',
    url: `/student/${id}`,
  });
}
// 查询班级列表
export function queryClassList() {
  return authAxios({
    method: 'get',
    url: `/class`,
  });
}
