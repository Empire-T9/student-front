import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { Table, PageHeader, Button } from 'antd';
import { queryList, queryClassList } from './services';
import { ROUTE_HOME } from './constants';

export default () => {
  const [data, setData] = useState([]);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    queryClassList().then((res) => {
      if (res.status === 200) {
        setClassList(res.data);
        queryList().then((res) => {
          if (res.status === 200) {
            setData(res.data);
          }
        });
      }
    });
  }, []);

  function goTo(record) {
    const { id } = record;
    history.push({ pathname: `${ROUTE_HOME}/${id}`, params: { classList } });
  }
  function handleAdd() {
    history.push({ pathname: `${ROUTE_HOME}/add`, params: { classList } });
  }
  function renderClass(value) {
    const classItem = classList.find((item) => item.id === Number(value));
    return classItem?.name;
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
      render: (value) => renderClass(value),
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
      <PageHeader
        title="学生列表"
        extra={[
          <Button type="primary" icon="plus" onClick={handleAdd}>
            新增
          </Button>,
        ]}
      />
      <Table dataSource={data} columns={columns} bordered />
    </>
  );
};
