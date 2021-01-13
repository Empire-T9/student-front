import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { Table, PageHeader, Button, Select, Modal, Tag, Icon } from 'antd';
import { queryList, queryClassList } from './services';
import { ROUTE_HOME } from './constants';

const { Option } = Select;

export default () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [classList, setClassList] = useState([]);
  const [classId, setClassId] = useState('1');
  const [gender, setGender] = useState('');

  useEffect(() => {
    queryClassList().then((res) => {
      if (res.status === 200) {
        setClassList(res.data);
        queryStudentList({ classId });
      }
    });
  }, []);

  function queryStudentList(params = {}) {
    queryList(params).then((res) => {
      if (res.status === 200) {
        setData(res.data);
        setCount(res.data.length);
      }
    });
  }
  function goTo(record) {
    const { id } = record;
    history.push({ pathname: `${ROUTE_HOME}/${id}`, params: { classList } });
  }
  function handleAdd() {
    history.push({ pathname: `${ROUTE_HOME}/add`, params: { classList } });
  }
  function handleRandom() {
    const length = data.length;
    const index = Math.floor(Math.random() * length);
    const student = data[index];
    console.log(JSON.stringify(student));
    Modal.info({
      title: '恭喜你，中奖啦！',
      content: (
        <h1>
          <Icon
            type="smile"
            theme="twoTone"
            twoToneColor={student.gender === 'f' ? '#eb2f96' : null}
          />
          &nbsp;&nbsp;
          {student.name}
        </h1>
      ),
      onOk() {},
    });
  }
  function onChangeClass(value) {
    setClassId(value);
    queryStudentList({ classId: value, gender });
  }
  function onChangeGender(value) {
    setGender(value);
    queryStudentList({ classId, gender: value });
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
          <Select
            placeholder="请选择班级"
            style={{ width: 150 }}
            allowClear
            onChange={onChangeClass}
            value={classId}
          >
            {classList &&
              classList.length &&
              classList.map((item) => (
                <Option key={item.id} value={String(item.id)}>
                  {item.name}
                </Option>
              ))}
          </Select>,
          <Select
            placeholder="请选择性别"
            style={{ width: 150 }}
            allowClear
            onChange={onChangeGender}
          >
            <Option value="m">男</Option>
            <Option value="f">女</Option>
          </Select>,
          <div style={{ display: 'inline-flex' }}>
            共&nbsp;<Tag color="#2db7f5">{count}</Tag>人
          </div>,
          <Button type="primary" icon="smile" onClick={() => handleRandom()}>
            抽签
          </Button>,
          <Button icon="plus" onClick={handleAdd}>
            新增
          </Button>,
        ]}
      />
      <Table dataSource={data} columns={columns} bordered pagination={false} />
    </>
  );
};
