/**
 * @description 修改头像界面
 */
import React, { useState } from 'react';
import { NavBar, Space, Toast, Button, ImageUploader, Input } from 'antd-mobile'
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'
import { demoSrc, mockUpload, mockUploadFail } from './utils'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import servicePath from '../../config/apiUrl';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';

function UpdateHeadPic() {

    let navigate = useNavigate();

    // 上传头像方法
    const upload = () => {
        let file = document.querySelector('#uploadFile').files[0]
        console.log('file:', file);
        let formData = new FormData()
        // formData.append("lc", 1234567)

        formData.append("uploadFile", file)
        console.log('formData.get(uploadFile):', formData.get('uploadFile'));
        // console.log('formData.get(lc):',formData.get('lc'));
        // console.log('formData:' , formData);

        axios({
            url: servicePath.headPicUpdate,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            formData,
            processData: false,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                <Button size='mini' onClick={upload}>
                    保存
                </Button>
            </Space>
        </div>
    )



    const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画
    const back = () => {
        setShowStatus(false)
    }

    const [fileList, setFileList] = useState([
        {
            url: demoSrc,
        },
    ])
    // console.log(fileList);
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
                        修改头像
                    </NavBar>
                    {/* <ImageUploader
                value={fileList}
                onChange={setFileList}
                upload={mockUpload}
            /> */}
                    图片上传：<input id="uploadFile" type="file" />
                </div>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(UpdateHeadPic)