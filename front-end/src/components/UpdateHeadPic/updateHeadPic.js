import React, { useState } from 'react';
import { NavBar, Space, Toast, Button, ImageUploader } from 'antd-mobile'
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'
import { demoSrc, mockUpload, mockUploadFail } from './utils'
import { useNavigate } from 'react-router-dom';

function UpdateHeadPic() {

    let navigate = useNavigate();
    
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

    const [fileList, setFileList] = useState([
        {
            url: demoSrc,
        },
    ])
    console.log(fileList);
    return (
        <div className="">
            <NavBar right={right} onBack={back}>
                修改头像
            </NavBar>
            <ImageUploader
                value={fileList}
                onChange={setFileList}
                upload={mockUpload}
            />

        </div>
    )
}

export default React.memo(UpdateHeadPic)