/**
 * @description 我的浏览历史界面
 */
import React, { useState } from 'react';
import { NavBar, Space, Button, Tabs, List, Image } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import servicePath from '../../config/apiUrl';
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { Container } from './style.js';
import { CSSTransition } from 'react-transition-group';
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd'
import { users } from './users.js'

function MyBrowsing() {

    let navigate = useNavigate();

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


    const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画
    const back = () => {
        setShowStatus(false)
    }


    const goDetail = (e) => {    // 去到某篇诗词的详情页
        console.log(e);
        let data = e.target.innerText.split(/[(\r\n)\r\n]+/)
        navigate('/index/my/myBrowsing/onePoemDetail/' + data[0])
    }


    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                <Button size='mini' >
                    时间排序
                </Button>
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
                        浏览历史
                    </NavBar>
                    <Tabs>
                        <Tabs.Tab title='诗文' key='1'>
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
                                                                    onClick={(e) => {goDetail(e)}}
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
                        <Tabs.Tab title='名句' key='2'>
                            诗文
                        </Tabs.Tab>
                        <Tabs.Tab title='古籍' key='3'>
                            古籍
                        </Tabs.Tab>
                        <Tabs.Tab title='作者' key='4'>
                            <List header='可拖拽排序'>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId='droppable'>
                                        {droppableProvided => (
                                            <div ref={droppableProvided.innerRef}>
                                                {list.map((item, index) => (
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
                                                                    prefix={
                                                                        <Image
                                                                            src={item.avatar}
                                                                            style={{ borderRadius: 20 }}
                                                                            fit='cover'
                                                                            width={40}
                                                                            height={40}
                                                                        />
                                                                    }
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
                    </Tabs>
                </div>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(MyBrowsing);