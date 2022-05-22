/**
 * @description 我的诗单界面
 */
import React, { useState, useEffect } from 'react';
import { NavBar, Space, List, Dialog, ActionSheet, Tabs, Image } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import servicePath from '../../config/apiUrl';
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { Container, ButtonColor } from './style';
import { CSSTransition } from 'react-transition-group';
import { MoreOutline } from 'antd-mobile-icons'
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd'
import { users } from './users.js'

function MyPoemList() {

    let navigate = useNavigate();

    let userId = localStorage.getItem('userId')
    const [value, setValue] = useState('')  // 存储用户名
    const [visible, setVisible] = useState(false)       // 控制面板是否显示
    const [poemList, setPoemList] = useState([])    // tabs数据 [{ id: 1, title: '默认诗单' }, { id: 2, title: '我的最爱' }, { id: 3, title: '最近在看' }]
    const [key,setKey] = useState(1)    // 设置当前tab的key
    const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画
    const back = () => {
        setShowStatus(false)
    }

    // 动作面板
    const actions = [
        {
            text: '添加诗单',
            key: 'copy',
            onClick: async () => {
                const result = await Dialog.confirm({ content: '确定要删除吗？' })
                if (result) {
                    Toast.show('执行了删除操作')
                }
            },
        },
        {
            text: '修改诗单',
            key: 'edit', 
            onClick: async () => {
                const result = await Dialog.confirm({ content: '确定要删除吗？' })
                if (result) {
                    Toast.show('执行了删除操作')
                }
            },
        },
        {
            text: '删除诗单',
            key: 'delete',
            onClick: async () => {
                const result = await Dialog.confirm({ content: '确定要删除吗？' })
                if (result) {
                    poemList.splice(key-1,1)
                    setVisible(!visible)
                    // setKey(poemList[1].id)
                }
            },
        },
    ]
    

    //拖拽相关的方法
    const reorder = (
        list,
        startIndex,
        endIndex
    ) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const [list, setList] = useState(users)
    const [list1, setList1] = useState([{id:'1',name:'静夜思',description:'李白'},{id:'2',name:'水调歌头',description:'苏轼'},{id:'3',name:'泊秦淮',description:'杜甫'}])
    const onDragEnd = (result) => {
        if (!result.destination) return
        const newList = reorder(list, result.source.index, result.destination.index)
        setList([...newList])
    }
    const onDragEnd1 = (result) => {
        if (!result.destination) return
        const newList = reorder(list1, result.source.index, result.destination.index)
        setList1([...newList])
    }


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
                    Toast.show({
                        content: '查看成功',
                        duration: 1000,
                    })
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
    }
    useEffect(() => {
        Init()
    },[])


    const queryPoemListPoems = (key) => {
        console.log(key);
        setKey(key)
        let dataProps = {
            'userId': userId,
            "listId": Number(key)+1
        }
        axios({
            method: 'post',
            url: servicePath.CheckPoemList,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                // setIsLoading(false)
                if (res.data.result == '查看诗单列表成功') {
                    // Toast.show({
                    //     content: '查看成功',
                    //     duration: 1000,
                    // })
                    setList1(res.data.res)
                } else {
                    // message.error('用户名密码错误')
                    Toast.show({
                        content: '查看诗单列表失败',
                        duration: 1000,
                    })
                    //   alert('注册失败了呢')
                }
            }
        )
    }
    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                <MoreOutline onClick={() => setVisible(true)} />
            </Space>
        </div>
    )
    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => navigate('/index/my')}
        >
            <Container>
                <div className="">
                    <NavBar right={right} onBack={back}>
                        我的诗单
                    </NavBar>
                    <Tabs defaultActiveKey='0' onChange={queryPoemListPoems}>
                        {
                            poemList?.map((item, index) => {
                                return <Tabs.Tab title={item.title} key={index}>
                                    <List header='可拖拽排序'>
                                <DragDropContext onDragEnd={onDragEnd1}>
                                    <Droppable droppableId='droppable'>
                                        {droppableProvided => (
                                            <div ref={droppableProvided.innerRef}>
                                                {list1.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    opacity: snapshot.isDragging ? 0.8 : 1,
                                                                }}
                                                            >
                                                                <List.Item
                                                                    key={item.name}
                                                                    description={item.description}
                                                                >
                                                                    {item.name}
                                                                </List.Item>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {droppableProvided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </List>
                                </Tabs.Tab>
                            })
                        }
                    </Tabs>
                    <ButtonColor>
                        <ActionSheet
                            visible={visible}
                            actions={actions}
                            onClose={() => setVisible(false)}
                            onAction={action => {
                                if (action.key === 'edit' || action.key === 'copy') {
                                    Toast.show(`点击了${action.text}`)
                                }
                            }}
                            afterClose={() => {
                                // Toast.show('动作面板已关闭')
                            }}
                        />
                    </ButtonColor>
                </div>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(MyPoemList);