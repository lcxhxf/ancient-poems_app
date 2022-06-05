/**
 * @description 诗词卡片组件，用来展示一首诗词的内容
 */
import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { Card, Toast, Picker, Popover } from 'antd-mobile'
import { HeartOutline, AddSquareOutline, RightOutline, SoundOutline, SendOutline, DownlandOutline, HeartFill, TeamFill, MessageFill, AddressBookFill, MailFill } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom'
import Clipboard from 'clipboard'  // 复制库
import NativeShare from 'nativeshare' // 浏览器分享库
import './poemCard.css'
import store from '../../store';
import axios from 'axios'
import servicePath from '../../config/apiUrl';

function PoemCard(props) {

    const param = useParams()           // 获取路由参数
    // console.log('param:',param);
    const location = useLocation()      // 获取路由路径
    //   console.log('使用useLocation获取的location', location.pathname)

    const basicColumns = [
        [
            // { label: '诗单一', value: '诗单一' },
            // { label: '诗单二', value: '诗单二' },
            // { label: '诗单三', value: '诗单三' },
            // { label: '诗单四', value: '诗单四' },
            // { label: '诗单五', value: '诗单五' },
        ],
    ]
    const [poemList, setPoemList] = useState([])
    poemList.map((item, index) => { basicColumns[0].push({ label: item.title, value: index }) })



    let [isCollect, setIsColect] = useState(false)  // 控制是否收藏
    let dataProps = {}    // 请求发送的对象参数
    let navigate = useNavigate();
    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')

    const Init = () => {
        let dataProps = {
            'userId': userId,
        }
        axios({
            method: 'post',
            url: servicePath.CheckList,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                // setIsLoading(false)
                if (res.data.result == '查看成功') {
                    // Toast.show({
                    //     content: '查看成功',
                    //     duration: 1000,
                    // })
                    setPoemList(res.data.res)
                } else {
                    // message.error('用户名密码错误')
                    Toast.show({
                        content: '查询失败',
                        duration: 1000,
                    })
                    //   alert('注册失败了呢')
                }
            }
        )
        if (props.collection == 1) {
            setIsColect(!isCollect)
        }
    }
    useEffect(() => {
        Init()
    }, [])

    const onHeaderClick = () => {       // 进入诗词详情页
        // console.log('location.pathname:', location.pathname);
        dataProps = {   // 请求的数据格式
            "poemId": props.poemId,
            "userId": userId
        }
        axios({
            method: 'post',
            url: servicePath.AddHistory,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                if (res.data.result == '插入历史数据成功') {
                    Toast.show({
                        content: '插入历史数据成功',
                        duration: 1000,
                    })
                } else {
                    // Toast.show({
                    //     content: '收藏失败',
                    //     duration: 1000,
                    // })
                }
            }
        )
        if (location.pathname == '/index/index/search') {
            navigate('/index/index/search/searchPoemDetail/' + props.id)
        } else if (location.pathname == '/index/index') {
            navigate('/index/index/poemDetail/' + props.id)
        } else {
            navigate('/index/index/sort/sortDetail/' + param.type + '/' + props.id)
        }
    }

    const onBodyClick = () => {
        Toast.show('点击了卡片Body区域')
    }
    const collect = () => {     // 收藏方法
        if( token == null) {
            Toast.show({
                content: '请先登录',
                duration: 1000,
            })
            return
        }
        if (isCollect == false) {
            dataProps = {   // 请求的数据格式
                "collectionId": props.poemId,
                "userId": userId
            }
            axios({
                method: 'post',
                url: servicePath.AddCollection,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.result == '收藏成功') {
                        Toast.show({
                            content: '收藏成功',
                            duration: 1000,
                        })
                        setIsColect(!isCollect)
                    } else {
                        Toast.show({
                            content: '收藏失败',
                            duration: 1000,
                        })
                    }
                }
            )
        } else {
            Toast.show('取消收藏')
            setIsColect(!isCollect)
        }

    }

    const addPoemList = async () => {     // 加入诗单方法
        if( token == null) {
            Toast.show({
                content: '请先登录',
                duration: 1000,
            })
            return
        }
        const value = await Picker.prompt({
            columns: basicColumns,
        })
        dataProps = {   // 请求的数据格式
            "userId": userId,
            "listId": Number(value) + 1,
            "poemId": props.poemId
        }
        axios({
            method: 'post',
            url: servicePath.AddPoemToList,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                if (res.data.result == '添加诗单成功') {
                    Toast.show({
                        content: '添加诗单成功',
                        duration: 1000,
                    })
                } else {
                    Toast.show({
                        content: '添加诗单失败',
                        duration: 1000,
                    })
                }
            }
        )
        // Toast.show(`添加到 ${value}`)
    }

    // 分享到QQ好友
    const shareToQQFriend = () => {
        if (token == null) {
            Toast.show({
                content: '请先登录',
                duration: 1000,
            })
        } else {
            nativeShare.call('qqFriend')
        }

    }
    // 分享到微信好友
    const shareToWeiXinFriend = () => {
        if (token == null) {
            Toast.show({
                content: '请先登录',
                duration: 1000,
            })
        } else {
            nativeShare.call('weibo')
        }
    }
    // 分享到QQ空间
    const shareToQQSpace = () => {
        if (token == null) {
            Toast.show({
                content: '请先登录',
                duration: 1000,
            })
        } else {
            nativeShare.call('qZone')
        }

    }
    const actions = [       // 分享类型
        { key: 'scan', icon: <TeamFill onClick={shareToQQFriend} />, text: '分享给QQ好友' },
        { key: 'payment', icon: <MessageFill onClick={shareToWeiXinFriend} />, text: '分享给微博' },
        { key: 'bus', icon: <AddressBookFill onClick={shareToQQSpace} />, text: '分享到QQ空间' }
    ]
    const [isCopied, setIsCopied] = useState(false);
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }
    const copy = () => {    //复制诗词到剪贴板
        copyTextToClipboard(props.content)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
        Toast.show('已复制到剪贴板')
    }

    const [showPop, setShowPop] = useState(false)
    const audio = useMemo(() => new Audio(`http://tts.youdao.com/fanyivoice?word=${props.content}&le=zh&keyfrom=speaker-target`), [`http://tts.youdao.com/fanyivoice?word=${props.content}&le=zh&keyfrom=speaker-target`]);
    const isShowPop = () => {
        // let audio = new Audio(`http://tts.youdao.com/fanyivoice?word=${props.content}&le=zh&keyfrom=speaker-target`)
        // let audio = new Audio(`https://fanyi.sogou.com/reventondc/synthesis?text=${props.content}&speed=1&lang=zh-CHS&from=translateweb&speaker=1`)
        if( token == null) {
            Toast.show({
                content: '请先登录',
                duration: 1000,
            })
            return
        }
        if (!showPop) {
            Toast.show('正在播放音频')
            audio.play()
        } else {
            Toast.show('已关闭音频')
            audio.pause()
        }
        props.isShowPop(!showPop)
        setShowPop(!showPop)
    }

    // 分享功能设置
    var nativeShare = new NativeShare()
    // 如果你需要在微信浏览器中分享，那么你需要设置额外的微信配置
    // 特别提示一下微信分享有一个坑，不要分享安全域名以外的链接(具体见jssdk文档)，否则会导致你配置的文案无效
    // 创建实例应该带参数
    var nativeShare = new NativeShare({
        wechatConfig: {
            appId: '',
            timestamp: '',
            nonceStr: '',
            signature: '',
        },
        // 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
        // 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
        syncDescToTag: false,
        syncIconToTag: false,
        syncTitleToTag: false,
    })

    // 你也可以在setConfig方法中设置配置参数
    nativeShare.setConfig({
        wechatConfig: {
            appId: '',
            timestamp: '',
            nonceStr: '',
            signature: '',
        }
    })


    // 设置分享文案
    nativeShare.setShareData({
        icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
        link: 'https://github.com/fa-ge/NativeShare',
        title: 'NativeShare',
        desc: 'NativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
        from: '@fa-ge',
    })


    return (
        <Fragment key={props.id}>
            <Card
                title={
                    <div style={{ fontWeight: '800' }}>
                        {props.title}
                    </div>
                }
                extra={<RightOutline />}
                onBodyClick={onBodyClick}
                onHeaderClick={onHeaderClick}
                style={{ borderRadius: '16px', marginTop: '.1rem', lineHeight: '.25rem' }}
                key={props.id}
            >
                <div className='content1'>
                    <h1 className="content1-poet">{props.poet}</h1>
                    <h1 className="content1-poem">{props.content}</h1>
                </div>
                <div className='footer' onClick={e => e.stopPropagation()}>
                    {isCollect == false ? <HeartOutline onClick={collect} /> : <HeartFill onClick={collect} />}
                    <AddSquareOutline onClick={addPoemList} />
                    <Popover.Menu
                        actions={actions}
                        placement='bottom-start'
                        // onAction={node => Toast.show(`选择了 ${node.text}`)}
                        trigger='click'
                    >
                        <SendOutline />
                    </Popover.Menu>
                    <DownlandOutline onClick={copy} />
                    <SoundOutline onClick={isShowPop} />
                    <button className="btn" data-clipboard-text="copyValue" style={{ display: "none" }}>点我复制</button>
                </div>
            </Card>
        </Fragment>
    )
}

export default React.memo(PoemCard)