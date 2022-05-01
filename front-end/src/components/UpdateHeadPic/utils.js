import axios from 'axios'
import servicePath from '../../config/apiUrl';
let headPicPath = localStorage.getItem('headPicPath')
export const demoSrc = headPicPath

export async function mockUpload(file) {
    // let formData = new FormData()
    // formData.append("uploadFile", file)
    // // formData.append("fileName", file.name)
    // let jsonData = JSON.stringify(formData)
    // console.log('formData:' + jsonData);
    // const config = {
    //     headers: {
    //         "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
    //     }
    // };
    // axios({
    //     method: 'post',
    //     url: servicePath.headPicUpdate,
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data;boundary=" + new Date().getTime() },
    //     withCredentials: true
    // }).then(function (response) {
    //     console.log(response);
    // })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    return {
        url: URL.createObjectURL(file),
    }
}

export async function mockUploadFail() {
    //   await sleep(3000)
    throw new Error('Fail to upload')
}