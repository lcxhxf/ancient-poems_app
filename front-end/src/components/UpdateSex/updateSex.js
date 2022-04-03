import React, { useState } from 'react';
import { NavBar, Space, Button, List, Selector } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import { options } from './options'

function UpdateSex() {

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
                修改性别
            </NavBar>
            <List header='  '>
                <List.Item>
                    <Selector
                        options={options}
                        defaultValue={['1']}
                        onChange={(arr, extend) => console.log(arr, extend.items)}
                    />
                </List.Item>
            </List>
        </div>
    )
}

export default React.memo(UpdateSex);