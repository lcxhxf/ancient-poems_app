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
        let userId = localStorage.getItem('userId')
        // formData.append("lc", 1234567)

        formData.append("uploadFile", file)
        formData.append("userId", userId)
        // console.log('formData.get(uploadFile):', formData.get('uploadFile'));
        // console.log('formData.get(lc):',formData.get('lc'));
        // console.log('formData:' , formData);

        axios.post(servicePath.headPicUpdate, formData)
        .then(function (response) {
            localStorage.setItem('headPicPath',response.data.url)
            navigate('/index/my/myDetail')
            console.log(response);
        })
        .catch(function (error) {
            // console.log(error);
        });
        
        // axios({
        //     url: servicePath.headPicUpdate,
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data;charset=utf-8'
        //     },
        //     formData,
        //     processData: false
        // })
        //     .then(function (response) {
        //         navigate('/index/my/myDetail')
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

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
                    图片上传：<input id="uploadFile" type="file" name="file" />

                    {/* <form
                        method="POST"
                        action="http://127.0.0.1:7001/headPicUpdate"
                        encType="multipart/form-data"
                    >
                        图片上传：<input name="file" id="uploadFile" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" multiple />
                        <button type="submit" onClick={upload}>Upload</button>
                    </form> */}

                    {/* <form action="http://127.0.0.1:7001/headPicUpdate" method="post" encType="multipart/form-data">
                        <input type="file" name="file" />
                        <input type="submit" value="上传" />
                    </form> */}
                </div>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(UpdateHeadPic)