import React, { useState } from 'react';
import { NavBar, Space, Button, Calendar, List } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import './updateBrith.css'

function UpdateBrith() {

    let navigate = useNavigate();
    let personalizedSig = localStorage.getItem('personalizedSig')
    const [value, setValue] = useState('')
    const defaultSingle = new Date('2022-03-27')
    

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
                修改生日
            </NavBar>
            <List header='  '>
                <Calendar
                    selectionMode='single'
                    defaultValue={defaultSingle}
                    onChange={val => {
                        console.log(val)
                    }}
                />
            </List>
        </div>
    )
}

export default React.memo(UpdateBrith);