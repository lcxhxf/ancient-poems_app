/**
 * @description 飞花令的对话框
 */
import React, { Fragment, useState } from 'react';
import { Avatar, Popover } from 'antd-mobile'

function DialogBox(props) {
    let headPicPath = localStorage.getItem('headPicPath')

    return (
        <Fragment>
            {
                props.isRight == true
                    ? <div className="" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Popover
                            content={props.content}
                            placement='right'
                            mode='light'
                            trigger='click'
                            visible
                        >
                            <Avatar src={headPicPath} style={{ '--size': '42px', marginRight: '10px' }} />
                        </Popover>
                    </div>
                    : <div className="" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Popover
                            content={props.content}
                            placement='right'
                            mode='light'
                            trigger='click'
                            visible
                        >
                            <Avatar src='http://zengjichaoren.xyz:7001/public/upload/1651474479686hPbn74XEKI9dVqW.png' style={{ '--size': '42px', marginTop: '0.2rem', marginLeft: '10px' }} />
                        </Popover>
                    </div>
            }
        </Fragment>
    )
}

export default DialogBox