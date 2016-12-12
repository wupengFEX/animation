# 简介
Animation是一个移动端的动画库，采用transition的形式，支持串并行，链式和非链式写法！

# 参数
- dom: dom元素，可以是一个元素，也可以是一个dom数组，不能为空；
- property: 属性对象，不能为空；
- duration: 动画持续时间，如果不设置默认为0.4s；
- easing: 动画执行的形式, 如"ease, ease-in, ease-out, ease-in-out, linear, cubic-bezier", 默认为"linear";
- callback: 回调函数，在动画执行完成之后执行，分为两种，一种为单个动画执行完成之后的回调，另一种是所有并行动画执行完成的回调；
- delay: 延迟时间，如果不设置默认为0s；
- isAsync: 是否动画是并行，0为串行，1为并行;

# 用法
### 链式串行写法(isAsync为0)
    
    animate(dom, {
        width: "50%"
    }, 2000, "ease", function() {
        console.log("动画1");
    }, 0, 0)
    .animate(dom, {
        height: 200
    }, 1000, "ease", function () {
        console.log("动画2");
    }, 0, 0);
    
### 链式并行写法(isAsync为1，需要endAnimation在冰箱动画结束时调用)
    
    animate(dom, {
        width: "50%"
    }, 2000, "ease", function() {
        console.log("动画1");
    }, 0, 1)
    .animate(propAsyncDom2, {
        height: 200
    }, 1000, "ease", function () {
        console.log("动画2");
    }, 0, 1)
    .endAnimation(function () {
        log("并行动画都执行完成了");
    });
    
### 非链式串&并行

    animate(dom, {
        width: "50%"
    }, 2000, "ease", function() {
        console.log("动画1");
    }, 0, 1)
    .endAnimation(function () {
        log("并行动画都执行完成了");
    });
    .animate(dom, {
        height: 200
    }, 1000, "ease", function () {
        console.log("动画2");
    }, 0, 0);

### 非链式并行写法（非链式都是并行动画，就算设置了isAsync）

    animate(dom1, {
        width: "50%"
    }, 2000, "ease", function() {
        console.log("动画1");
    }, 0, 1)    
    animate(dom2, {
        height: 200
    }, 1000, "ease", function () {
        console.log("动画2");
    }, 0, 0);


### 非链式并行写法
    
    animate(dom1, {
        width: "50%"
    }, 2000, "ease", function() {
        console.log("动画1");
    }, 0, 1)
    .endAnimation(function () {
        log("并行动画都执行完成了");
    });
    .animate(dom1, {
        height: 200
    }, 1000, "ease", function () {
        console.log("动画2");
    }, 0, 0);
    
    .animate(dom2, {
        height: 200
    }, 1000, "ease", function () {
        console.log("动画3");
    }, 0, 0);
    
# 注意点
- 并行动画需要调用endAnimation才能结束并执行；
- dom参数为数组默认为并行动画，需要调用endAnimation；
- 非链式写法是创建了多个对象，所以表现为并行动画，不能通过isAsync控制为串行；

# License
MIT License
