import { history } from 'umi';
import React, { useEffect, useState } from 'react';
import { Form, PageHeader } from 'antd';
import { queryDetail } from '../services';

export default (props) => {
  const { id } = props.match.params;
  const [data, setData] = useState({});

  useEffect(() => {
    queryDetail(id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, [id]);

  return (
    <>
      <PageHeader title="学生信息" onBack={() => history.goBack()} />
      <div>姓名：{data.name}</div>
      <div>性别：{data.gender === 'm' ? '男' : '女'}</div>
      <div>班级：{data.classId}</div>
      <br />
      <div>之后改成form，可编辑学生信息</div>
    </>
  );
};
