import { authAxios } from '@/utils/axios';

export function queryList() {
  return authAxios({
    method: 'get',
    url: `/student`,
  });
}

export function queryDetail(id) {
  return authAxios({
    method: 'get',
    url: `/student/${id}`,
  });
}
