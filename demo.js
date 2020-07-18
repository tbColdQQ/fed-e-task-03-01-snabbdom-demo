import { init } from '../../build/package/init.js'
import clazz from '../../build/package/modules/class.js'
import style from '../../build/package/modules/style.js'
import listeners from '../../build/package/modules/eventlisteners.js'
import {h} from '../../build/package/h.js'

const patch = init([clazz, style, listeners])

let listVNode = null
let id = 4
let data = [
    { name: '张三', age: 40, top: 0, id: 1 },
    { name: '李四', age: 22, top: 0, id: 2 },
    { name: '王五', age: 35, top: 0, id: 3 },
    { name: '赵六', age: 12, top: 0, id: 4 }
]

const delFn = id => {
    console.log('delFn--->', id)
    data = data.filter(item => item.id != id)
    if(listVNode == null) {
        listVNode = document.querySelector(".list")
    }
    listVNode = patch(listVNode, initList(data))
}

const initList = list => {
    return h("div.list", list.map((item, index) => h("div.list-item", { style: { transform: 'translateY('+(index * 60)+'px)'}}, [
        h("div.name", '姓名：' + item.name),
        h("div.age", '年龄：' + item.age),
        h("div.delete", { on: { click: [delFn, item.id]}}, "X")
    ])))
}

const initBtnGroup = () => {
    return h("div.btn-group", [
        h("button.btn", { on: { click: [addFn, undefined] }}, "新建"),
        h("button.btn", { on: { click: [sortFn, undefined] }}, "排序")
    ])
}

const addFn = () => {
    id++
    data.unshift({
        name: Math.random().toString(36).slice(-6),
        age: parseInt(Math.random() * 100),
        id,
        top: 0
    })
    if(listVNode == null) {
        listVNode = document.querySelector(".list")
    }
    // console.log('addFn--->', data, initList(data))
    let newVNode = initList(data)
    listVNode = patch(listVNode, newVNode)
}

const sortFn = () => {
    console.log('sortFn--->')
    data.sort(function(item1, item2) {
        return item1.age - item2.age
    })
    if(listVNode == null) {
        listVNode = document.querySelector(".list")
    }
    listVNode = patch(listVNode, initList(data))
}

window.addEventListener('DOMContentLoaded', () => {
    listVNode = initList(data)
    const appVNode = h("div#app", [
        initBtnGroup(),
        listVNode
    ])
    const app = document.querySelector("#app")
    patch(app, appVNode)
})