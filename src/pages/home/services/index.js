import { authAxios } from '@/utils/axios';

export function queryList() {
  return authAxios({
    method: 'get',
    url: `/student`,
  });
}
