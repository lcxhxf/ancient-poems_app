/**
 * @description 诗词卡片组件，用来展示一首诗词的内容
 */
import React, { Fragment, useEffect, useState } from 'react';
import { Card, Toast, Picker, Popover } from 'antd-mobile'
import { HeartOutline, AddSquareOutline, RightOutline, SoundOutline, SendOutline, DownlandOutline, HeartFill, TeamFill, MessageFill, AddressBookFill, MailFill } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom'
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
        // [
        //   { label: '上午', value: 'am' },
        //   { label: '下午', value: 'pm' },
        // ],
    ]
    const [poemList,setPoemList] = useState([])
    poemList.map((item,index) => {basicColumns[0].push({label: item.title, value: item.title })})
    
    

    let [isCollect, setIsColect] = useState(false)  // 控制是否收藏
    let dataProps = {}    // 请求发送的对象参数
    let navigate = useNavigate();
    let userId = localStorage.getItem('userId')

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
        if(props.collection == 1) {
            setIsColect(!isCollect)
        }
    }
    useEffect(() => {
        Init()
    },[])

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
        const value = await Picker.prompt({
            columns: basicColumns,
        })
        Toast.show(`添加到 ${value}`)
    }

    const actions = [       // 分享类型
        { key: 'scan', icon: <TeamFill />, text: '分享给QQ好友' },
        { key: 'payment', icon: <MessageFill />, text: '分享给微信好友' },
        { key: 'bus', icon: <AddressBookFill />, text: '分享到QQ空间' },
        { key: 'assistant', icon: <MailFill />, text: '分享到朋友圈' },
    ]
    const copy = () => {    //复制诗词到剪贴板
        Toast.show('已复制到剪贴板')
    }

    const [showPop, setShowPop] = useState(false)
    const isShowPop = () => {
        if (!showPop) {
            Toast.show('正在播放音频')
        } else {
            Toast.show('已关闭音频')
        }
        props.isShowPop(!showPop)
        setShowPop(!showPop)
    }
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
                        onAction={node => Toast.show(`选择了 ${node.text}`)}
                        trigger='click'
                    >
                        <SendOutline />
                    </Popover.Menu>
                    <DownlandOutline onClick={copy} />
                    <SoundOutline onClick={isShowPop} />
                    {/* <Button
            color='primary'
            onClick={() => Toast.show('点击了底部按钮')}
          >
            底部按钮
          </Button> */}
                </div>
            </Card>
        </Fragment>
    )
}

export default React.memo(PoemCard)