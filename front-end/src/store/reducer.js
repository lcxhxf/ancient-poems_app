const defaultState = {      // 默认数据
    itemCount: 0,
    poemList: [[], [], [], [], [], [], [], [], [], [], [], [], []],
    searchPoemList: [],
    key: '2',
    index: 0,
    feihualing:[]
}

export default (state = defaultState, action) => {  // 就是一个方法函数
    if (action.type === 'changePoemList') {
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.poemList = action.value
        newState.itemCount = action.itemCount
        newState.key = action.key
        return newState
    }
    if (action.type === 'changeSearchPoemList') {
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.searchPoemList = action.value
        return newState
    }
    if (action.type === 'changeIndex') {
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.index = action.index
        return newState
    }
    if (action.type === 'changeFeiHuaLing') {
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.feihualing = action.feihualing
        return newState
    }
    return state
}