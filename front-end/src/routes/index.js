/**
 * @description 底部tabbar对应的路由文件，四个子路由
 */
import React, { Suspense } from 'react';
import Index from '../application/Index/index';
import Sort from '../application/Sort/sort'
import Find from '../application/Find/find'
import My from '../application/My/my'
import ButtomTab from '../components/ButtomTab/buttomTab';
import { Navigate } from 'react-router-dom';


export default [
  {
    path: "/",
    element: <ButtomTab />,
    children: [
      {
        path: "/",
        element: <Navigate to="/index" />
      },
      {
        path: "/index",
        element: <Index />
      },
      {
        path: "/sort",
        element: <Sort />
      },
      {
        path: "/find",
        element: <Find />
      },
      {
        path: "/my",
        element: <My />
      }
    ]
  }
];