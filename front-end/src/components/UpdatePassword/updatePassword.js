/**
 * @description 修改密码界面
 */
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
import servicePath from '../../config/apiUrl';
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';

function UpdatePassword() {

    let navigate = useNavigate();

    // 从localStorage获取用户信息
    let userName = localStorage.getItem('userName')
    let userId = localStorage.getItem('userId')

    const [password, setPassword] = useState('')    // 存储用户密码
    const [newPassword, setNewPassword] = useState('')  // 存储用户确认密码


    const onfinish = (value) => {
        // console.log(value);
        setPassword(value.curPassword)
        setNewPassword(value.prePassword)

    }

    const passwordUpdate = () => {    // 修改用户名方法

        let dataProps = {
            'password': password,
            'newPassword': newPassword,
            'userId': userId,
        }
        axios({
            method: 'post',
            url: servicePath.passwordUpdate,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                // setIsLoading(false)
                if (res.data.data == '修改用户密码成功') {
                    Toast.show({
                        content: '修改用户密码成功',
                        duration: 1000,
                    })
                    // if (res.data.res.changedRows > 0) {
                    // localStorage.setItem('userName',value)
                    // console.log('设置完之后'+userName);
                    // }
                    // console.log('res.data.res:'+res.data.res);
                    //   alert('注册成功')
                    navigate('/index/my/myDetail')
                    // props.history.push('/index/my')
                } else {
                    // message.error('用户名密码错误')
                    Toast.show({
                        content: '原始密码有误，修改密码失败',
                        duration: 1000,
                    })
                    //   alert('注册失败了呢')
                }
            }
        )
    }

    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
            </Space>
        </div>
    )

    const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画
    const back = () => {
        setShowStatus(false)
    }

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => navigate('/index/my/myDetail')}
        >
            <Container>
                <div className="">
                    <NavBar right={right} onBack={back}>
                        修改密码
                    </NavBar>
                    <Form
                        layout='horizontal'
                        footer={
                            <Button block type='submit' color='primary' size='large' onClick={passwordUpdate}>
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
                            <Input onChange={value => { setPassword(value) }} placeholder='请输入原始密码' />
                        </Form.Item>
                        <Form.Item
                            name='curPassword'
                            label='新密码'
                            rules={[{ required: true, message: '新密码不能为空' }]}
                        >
                            <Input onChange={value => { setNewPassword(value) }} placeholder='请输入新密码' />
                        </Form.Item>
                    </Form>
                </div>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(UpdatePassword);