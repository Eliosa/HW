//expose-loader 暴露全局的loader   
// import $ from 'expose-loader?$!jquery';  // loader内敛写法

// import $ from 'jquery'
// console.log(window.$, 'jquery')

// console.log(window.$,$, 'jquery')

import img from '../imgs/imgs.jpg'
var IMG = new Image();
IMG.src = img;
document.body.appendChild(IMG)

require('../src/index.css')

document.write('hello')

let fn = ()=>{ 
	console.log(1)
}
fn()

@log
class demo{
	name = 'Hi'
}
let D = new demo();
console.log(D.name,'demo.name')

function log(target){
	console.log(target,'target')
}