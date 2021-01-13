import { history } from 'umi';
import React, { useEffect, useState } from 'react';
import { Form, PageHeader, Input, Radio, Select, Button, message } from 'antd';
import {
  queryDetail,
  updateDetail,
  addDetail,
  deleteDetail,
} from '../services';
import styles from './index.less';

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

export default Form.create()((props) => {
  const {
    match: {
      params: { id },
    },
    location: {
      params: { classList },
    },
    form: { getFieldDecorator, validateFields, setFieldsValue },
  } = props;

  useEffect(() => {
    init(id);
  }, [id]);

  function init(id) {
    if (id && id !== 'add') {
      queryDetail(id).then((res) => {
        if (res.status === 200) {
          const { name, gender, classId } = res.data;
          setFieldsValue({ name, gender, classId });
        }
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const url = id === 'add' ? addDetail : updateDetail;
        const params = id === 'add' ? { ...values } : { id, ...values };
        url(params).then((res) => {
          if (res.status === 200) {
            message.success('保存成功');
            history.goBack();
          } else {
            message.success('保存失败');
          }
        });
      }
    });
  }

  function handleDelete() {
    deleteDetail(id).then((res) => {
      if (res.status === 200) {
        message.success('删除成功');
        history.goBack();
      } else {
        message.success('删除失败');
      }
    });
  }

  return (
    <>
      <PageHeader
        title="学生信息"
        onBack={() => history.goBack()}
        extra={
          id && id !== 'add'
            ? [
                <Button type="dashed" icon="delete" onClick={handleDelete}>
                  删除
                </Button>,
              ]
            : false
        }
      />
      <Form className={styles['student-form']} {...formItemLayout}>
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: `请输入姓名`,
              },
            ],
          })(<Input placeholder="请输入姓名" />)}
        </Form.Item>
        <Form.Item label="性别">
          {getFieldDecorator('gender', {
            rules: [
              {
                required: true,
                message: `请选择性别`,
              },
            ],
          })(
            <Radio.Group>
              <Radio value="m">男</Radio>
              <Radio value="f">女</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="班级">
          {getFieldDecorator('classId', {
            rules: [
              {
                required: true,
                message: `请选择班级`,
              },
            ],
          })(
            <Select placeholder="请选择班级">
              {classList &&
                classList.length &&
                classList.map((item) => (
                  <Option value={String(item.id)}>{item.name}</Option>
                ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" icon="save" onClick={handleSubmit}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});
