import React, {useState} from 'react';
import { SearchBar, List, JumboTabs, PullToRefresh } from 'antd-mobile'
var Mock = require('mockjs')

function Index(props) {
  var Random = Mock.Random
  const groups = Array(26)
  .fill('')
  .map((_, i) => (Random.csentence(14, 20)))
  const [data, setData] = useState(['雨打梨花深闭门，忘了青春，误了青春。','春宵一刻值千金，花有清香月有阴。','人面不知何处去，桃花依旧笑春风。','山有木兮木有枝，心悦君兮君不知。','人生若只如初见，何事秋风悲画扇。','十年生死两茫茫，不思量，自难忘。','曾经沧海难为水，除却巫山不是云。','玲珑骰子安红豆，入骨相思知不知。','只愿君心似我心，定不负相思意。','平生不会相思，才会相思，便害相思。','愿得一心人，白头不相离。','山无陵，江水为竭。冬雷震震，夏雨雪。天地合，乃敢与君绝。','入我相思门，知我相思苦。','去年今日此门中，人面桃花相映红。','桃之夭夭，灼灼其华。','竹外桃花三两枝，春江水暖鸭先知。','明月几时有？把酒问青天。'])
  const [data1,setData1] = useState(groups)
  console.log(data1);
 
  return (
    <div>
      <List>
        <List.Item>
          <SearchBar placeholder='搜索' />
        </List.Item>
      </List>
      <JumboTabs defaultActiveKey='1'>
        <JumboTabs.Tab title='足迹' description='' key='1'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            <List style={{ minHeight: '100vh' }}>
              {data.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='推荐' description='' key='2'>
        <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data1])
            }}
          >
            <List style={{ minHeight: '100vh' }}>
              {data1.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='春天名句' description='' key='3'>
          3
        </JumboTabs.Tab>
        <JumboTabs.Tab title='李白的诗文' description='' key='4'>
          4
        </JumboTabs.Tab>
        <JumboTabs.Tab title='夏天名句' description='' key='5'>
          5
        </JumboTabs.Tab>
        <JumboTabs.Tab
          title='乐府'
          description=''
          key='6'
        >
          6
        </JumboTabs.Tab>
        <JumboTabs.Tab title='苏轼的诗文' description='' key='7'>
          7
        </JumboTabs.Tab>
        <JumboTabs.Tab title='李清照的诗文' description='' key='8'>
          8
        </JumboTabs.Tab>
        <JumboTabs.Tab title='杜甫的诗文' description='' key='9'>
          9
        </JumboTabs.Tab>
        <JumboTabs.Tab title='劝学诗文' description='' key='10'>
          10
        </JumboTabs.Tab>
        <JumboTabs.Tab title='送别诗文' description='' key='11'>
          11
        </JumboTabs.Tab>
        <JumboTabs.Tab title='辛弃疾的诗文' description='' key='12'>
          12
        </JumboTabs.Tab>
      </JumboTabs>
    </div>
  )
}

export default React.memo(Index);