import React, { useState } from 'react';
import { NavBar, Space, Button, Input, List } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';

function UpdateUserName() {

    let navigate = useNavigate();
    let userName = localStorage.getItem('userName')
    const [value, setValue] = useState('')

    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                <Button size='mini'>
                    保存
                </Button>
            </Space>
        </div>
    )

    const back = () => {
        navigate('/index/my/myDetail')
    }

    return (
        <div className="">
            <NavBar right={right} onBack={back}>
                修改用户名
            </NavBar>
            <List header={'现在的用户名：' + userName}>
                <List.Item>
                    <Input
                        placeholder='请输入新的用户名'
                        value={value}
                        onChange={val => {
                            setValue(val)
                        }}
                    />
                </List.Item>

            </List>
        </div>
    )
}

export default React.memo(UpdateUserName);