import React, { useState } from 'react';
import {
    NavBar, Space, Form,
    Input,
    Button,
    TextArea,
    Stepper,
    Switch,
} from 'antd-mobile'
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {

    let navigate = useNavigate();
    let userName = localStorage.getItem('userName')
    const [value, setValue] = useState('')

    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
            </Space>
        </div>
    )

    const back = () => {
        navigate('/index/my/myDetail')
    }

    return (
        <div className="">
            <NavBar right={right} onBack={back}>
                修改密码
            </NavBar>
            <Form
                layout='horizontal'
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <Form.Header>    </Form.Header>
                <Form.Item
                    name='prePassword'
                    label='原始密码'
                    rules={[{ required: true, message: '原始密码不能为空' }]}
                >
                    <Input onChange={console.log} placeholder='请输入原始密码' />
                </Form.Item>
                <Form.Item
                    name='curPassword'
                    label='新密码'
                    rules={[{ required: true, message: '新密码不能为空' }]}
                >
                    <Input onChange={console.log} placeholder='请输入新密码' />
                </Form.Item>
            </Form>
        </div>
    )
}

export default React.memo(UpdatePassword);