import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { Table, PageHeader } from 'antd';
import { queryList } from './services';
import { ROUTE_HOME } from './constants';

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

  function goTo(record) {
    const { id } = record;
    history.push(`${ROUTE_HOME}/${id}`);
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      render: (value, record) => <a onClick={() => goTo(record)}>{value}</a>,
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
      <PageHeader title="学生列表" />
      <Table dataSource={data} columns={columns} bordered />
    </>
  );
};
