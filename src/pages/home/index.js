import React, { useEffect, useState } from 'react';
import { queryList } from './services';
import { Table } from 'antd';

export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    queryList().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, []);
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (value) => (value === 'm' ? '男' : '女'),
    },
    {
      title: '班级',
      dataIndex: 'classId',
    },
    {
      title: '小组',
      dataIndex: 'groupId',
    },
    {
      title: '位置',
      dataIndex: 'position',
    },
  ];
  return (
    <>
      <Table dataSource={data} columns={columns} bordered />
    </>
  );
};
