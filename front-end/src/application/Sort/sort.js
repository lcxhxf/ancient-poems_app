import React from 'react';
import { Tabs, IndexBar, List, Grid } from 'antd-mobile'
import './sort.css'

function Sort(props) {
  const getRandomList = (min, max) => {
    return new Array(Math.floor(Math.random() * (max - min) + min)).fill('')
  }

  const groups = [{ title: '类型', items: getRandomList(50, 75).map(() => '诗经') }, { title: '作者', items: getRandomList(50, 75).map(() => '李白') }, { title: '朝代', items: getRandomList(50, 75).map(() => '先秦') }, { title: '形式', items: getRandomList(150, 225).map(() => '诗') }]

  return (
    <div>
      <Tabs>
        <Tabs.Tab title='名句' key='1'>
          <div style={{ height: window.innerHeight }}>
            <IndexBar>
              {groups.map(group => {
                const { title, items } = group
                return (
                  <IndexBar.Panel
                    index={title}
                    title={`${title}`}
                    key={`标题${title}`}
                  >
                    <Grid columns={4} gap={8}>
                    {items.map((item, index) => (
                        <Grid.Item key={index}>
                        <div className='grid-demo-item-block'>{item}</div>
                      </Grid.Item>
                      ))}
                    </Grid>
                  </IndexBar.Panel>
                )
              })}
            </IndexBar>
          </div>
        </Tabs.Tab>
        <Tabs.Tab title='诗文' key='2'>
          诗文
        </Tabs.Tab>
        <Tabs.Tab title='古籍' key='3'>
          古籍
        </Tabs.Tab>
        <Tabs.Tab title='作者' key='4'>
          作者
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default React.memo(Sort);