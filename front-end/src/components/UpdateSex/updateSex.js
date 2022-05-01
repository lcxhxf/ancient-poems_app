/**
 * @description 修改性别界面
 */
import React, { useState } from 'react';
import { NavBar, Space, Button, List, Selector } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import { options } from './options'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import servicePath from '../../config/apiUrl';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';

function UpdateSex() {

    let navigate = useNavigate();

    // 从localStorage获取用户信息
    let sex = localStorage.getItem('sex')
    let userId = localStorage.getItem('userId')

    const [value, setValue] = useState('')  // 存储用户性别

    const sexUpdate = () => {    // 修改用户性别方法

        let dataProps = {
            'sex': value,
            'userId': userId,
        }
        axios({
            method: 'post',
            url: servicePath.sexUpdate,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                // setIsLoading(false)
                if (res.data.data == '修改用户性别成功') {
                    Toast.show({
                        content: '修改用户性别成功',
                        duration: 1000,
                    })
                    // console.log('res.data.res.changedRows:'+res.data.res.changedRows);
                    if (res.data.res.changedRows > 0) {
                        localStorage.setItem('sex', value)
                        // console.log('设置完之后'+sex);
                    }
                    // console.log('res.data.res:'+res.data.res);
                    //   alert('注册成功')
                    navigate('/index/my/myDetail')
                    // props.history.push('/index/my')
                } else {
                    // message.error('用户名密码错误')
                    Toast.show({
                        content: '修改用户性别失败了',
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
                <Button size='mini' onClick={sexUpdate}>
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
                        修改性别
                    </NavBar>
                    <List header='  '>
                        <List.Item>
                            <Selector
                                options={options}
                                defaultValue={['1']}
                                onChange={(arr, extend) => setValue(Number(arr?.[0]))}
                            />
                        </List.Item>
                    </List>
                </div>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(UpdateSex);