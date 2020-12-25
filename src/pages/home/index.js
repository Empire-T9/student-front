import React, { useEffect, useState } from 'react';
import { queryList } from './services';

export default () => {
  const [data, setData] = useState();
  useEffect(() => {
    queryList().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, []);
  return (
    <div>
      <div>home page</div>
      <div>{data}</div>
    </div>
  );
};
