/**
 * @description 修改生日界面
 */
import React, { useState } from 'react';
import { NavBar, Space, Button, Calendar, List } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import './updateBrith.css'
import servicePath from '../../config/apiUrl';
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';

function UpdateBrith() {

    let navigate = useNavigate();

    // 从localStorage获取用户信息
    let personalizedSig = localStorage.getItem('personalizedSig')
    let userId = localStorage.getItem('userId')

    const [value, setValue] = useState('')  // 存储用户生日值
    const defaultSingle = new Date('2022-03-27')


    const birthUpdate = () => {    // 修改用户生日

        let dataProps = {
            'brith': value,
            'userId': userId,
        }
        axios({
            method: 'post',
            url: servicePath.birthUpdate,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                // setIsLoading(false)
                if (res.data.data == '修改用户生日成功') {
                    Toast.show({
                        content: '修改用户生日成功',
                        duration: 1000,
                    })
                    if (res.data.res.changedRows > 0) {
                        localStorage.setItem('brith', value)
                        // console.log('设置完之后'+userName);
                    }
                    // console.log('res.data.res:'+res.data.res);
                    //   alert('注册成功')
                    navigate('/index/my/myDetail')
                    // props.history.push('/index/my')
                } else {
                    // message.error('用户名密码错误')
                    Toast.show({
                        content: '修改用户生日失败',
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
                <Button size='mini' onClick={birthUpdate}>
                    保存
                </Button>
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
                        修改生日
                    </NavBar>
                    <List header='  '>
                        <Calendar
                            selectionMode='single'
                            defaultValue={defaultSingle}
                            onChange={val => {
                                setValue(val)
                                console.log(val)
                            }}
                        />
                    </List>
                </div>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(UpdateBrith);