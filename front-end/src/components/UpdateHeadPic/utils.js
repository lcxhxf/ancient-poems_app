
let headPicPath = localStorage.getItem('headPicPath')
export const demoSrc = headPicPath

export async function mockUpload(file) {
    //   await sleep(3000000)
    return {
        url: URL.createObjectURL(file),
    }
}

export async function mockUploadFail() {
    //   await sleep(3000)
    throw new Error('Fail to upload')
}