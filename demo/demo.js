// dom参数测试
var btnDom1 = document.getElementById("btn-dom-one");
var btnDom2 = document.getElementById("btn-dom-second");
var btnDom3 = document.getElementById("btn-dom-third");
var btnDom4 = document.getElementById("btn-dom-pause");

var spanDom1 = document.getElementById("span-dom");
var spanDom2 = document.getElementsByClassName("span-dom-array");
var spanDom3 = document.getElementById("span-not-dom");
var spanDom4 = document.getElementById("span-not-dom-after");

var animate1;
btnDom1.onclick = function () {
    showLog();
    animate1 = animate(spanDom1, {
        width: "70%"
    }, {
        duration: 5000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("dom参数为dom元素");
        }
    })
    .start();
}
btnDom2.onclick = function () {
    showLog();
    animate({}, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("dom参数为空对象");
        }
    })
    .animate(spanDom4, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("dom参数不为对象的动画执行完成之后执行的动画");
        }
    })
    .start();
}
btnDom3.onclick = function () {
    showLog();
    animate(spanDom2, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("dom参数为dom数组");
        }
    })
    .start();
}
btnDom4.onclick = function () {
    animate1.stop();
}

// 属性参数测试
var propDomBtn1 = document.getElementById("prop-empty");
var propDomBtn2 = document.getElementById("prop-not-need");
var propDomBtn3 = document.getElementById("prop-need");
var propDomBtn4 = document.getElementById("prop-not-obj");
var propDomBtn5 = document.getElementById("prop-transform");

var propDom1 = document.getElementById("prop-dom-empty-one");
var propDom2 = document.getElementById("prop-dom-empty-second");
var propDom3 = document.getElementById("prop-dom-empty-not-animate");
var propDom4 = document.getElementById("prop-dom-empty-animate");
var propDom5 = document.getElementById("prop-dom-need-animate");
var propDom6 = document.getElementById("prop-dom-not-obj");
var propDom7 = document.getElementById("prop-dom-not-obj-second");
var propDom8 = document.getElementById("prop-dom-transform");

propDomBtn1.onclick = function () {
    showLog();
    animate(propDom1, {

    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("属性为空-空属性动画");
        }
    })
    .animate(propDom2, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("属性为空-非空属性动画");
        }
    })
    .start();
};
propDomBtn2.onclick = function () {
    showLog();
    animate(propDom3, {
        width: "50px"
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("属性非空-不需要动画");
        }
    })
    .animate(propDom4, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("属性非空-紧接的第二个需要的动画");
        }
    })
    .start();
};
propDomBtn3.onclick = function () {
    showLog();
    animate(propDom5, {
        width: "70%",
        height: 100
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("属性非空，需要动画");
        }
    })
    .start();
};
propDomBtn4.onclick = function () {
    showLog();
    animate(propDom6, "", {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("属性不是对象");
        }
    })
    .animate(propDom7, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("属性不是对象-紧接的第二个动画");
        }
    })
    .start();
};
propDomBtn5.onclick = function () {
    showLog();
    animate(propDom8, {
        transform: "translateX(200px) rotate(45deg)"
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 0,
        cb: function() {
            log("transform动画");
        }
    })
    .start();
};

// 时间
var propTimeBtn1 = document.getElementById("prop-time-not");
var propTimeBtn2 = document.getElementById("prop-time");

var propTimeDom1 = document.getElementById("prop-dom-time-not");
var propTimeDom2 = document.getElementById("prop-dom-time");

propTimeBtn1.onclick = function () {
    showLog();
    animate(propTimeDom1, {
        width: "70%"
    }, {
        cb: function() {
            log('不设置持续时间');
        }
    })
    .start();
};
propTimeBtn2.onclick = function () {
    showLog();
    animate(propTimeDom2, {
        width: "70%"
    }, {
        duration: 3000,
        easing: "ease",
        cb: function() {
            log("设置延迟时间3s");
        }
    })
    .start();
};

// 动画类型
var propTypeBtn1 = document.getElementById("prop-type");

var propEaseDom1 = document.getElementById("prop-ease");
var propEaseInDom1 = document.getElementById("prop-ease-in");
var propEaseOutDom1 = document.getElementById("prop-ease-out");
var propEaseInOutDom1 = document.getElementById("prop-ease-in-out");
var propLinearDom1 = document.getElementById("prop-linear");
var propCubicDom1 = document.getElementById("prop-cubic");

propTypeBtn1.onclick = function () {
    showLog();
    animate(propEaseDom1, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease"
    })
    .start();
    animate(propEaseInDom1, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease-in"
    })
    .start();
    animate(propEaseOutDom1, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease-out"
    })
    .start();
    animate(propEaseInOutDom1, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease-in-out"
    })
    .start();
    animate(propLinearDom1, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "linear"
    })
    .start();
    animate(propCubicDom1, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "cubic-bezier(0,0,1,1)"
    })
    .start();
};

// 动画回调
var propCallbackBtn1 = document.getElementById("prop-callback-sync");
var propCallbackBtn2 = document.getElementById("prop-callback-async");
var propCallbackBtn3 = document.getElementById("prop-callback-sync-async");
var propCallbackBtn4 = document.getElementById("prop-callback-not-async");
var propCallbackBtn5 = document.getElementById("prop-callback-more-async");
var propCallbackBtn6 = document.getElementById("prop-callback-sequence");

var propDomCallbackBtn1 = document.getElementById("prop-callback-dom-sync");
var propDomCallbackBtn2 = document.getElementById("prop-callback-dom-sync-second");
var propDomCallbackBtn3 = document.getElementById("prop-callback-dom-async");
var propDomCallbackBtn4 = document.getElementById("prop-callback-dom-async-second");
var propDomCallbackBtn5 = document.getElementById("prop-callback-dom-sync-async");
var propDomCallbackBtn6 = document.getElementById("prop-callback-dom-sync-async-second");
var propDomCallbackBtn7 = document.getElementById("prop-callback-dom-not-async");
var propDomCallbackBtn8 = document.getElementsByClassName("prop-callback");
var propDomCallbackBtn9 = document.getElementById("prop-callback-has");
var propDomCallbackBtn10 = document.getElementById("prop-callback-has-second");

propCallbackBtn1.onclick = function () {
    showLog();
    animate(propDomCallbackBtn1, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        cb: function() {
            log("链式写法，串行动画，变宽");
        }
    })
    .animate(propDomCallbackBtn2, {
        height: 100
    }, {
        duration: 1000,
        easing: "ease",
        cb: function() {
            log("链式写法，串行动画，变高");
        }
    })
    .start();
};
propCallbackBtn2.onclick = function () {
    showLog();
    animate(propDomCallbackBtn3, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 1,
        cb: function() {
            log("链式写法，并行动画，变宽");
        }
    })
    .animate(propDomCallbackBtn4, {
        height: 100
    }, {
        duration: 1500,
        easing: "ease",
        delay: 0,
        isAsync: 1,
        cb: function() {
            log("链式写法，并行动画，变高");
        }
    })
    .start();
}
propCallbackBtn3.onclick = function () {
    showLog();
    animate(propDomCallbackBtn5, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        cb: function() {
            log("链式写法，串并行都存在-变宽");
        }
    })
    .animate(propDomCallbackBtn5, {
        height: 100
    }, {
        duration: 1500,
        easing: "ease",
        delay: 0,
        isAsync: 1,
        cb: function() {
            log("链式写法，串并行都存在-变高");
        }
    })
    .animate(propDomCallbackBtn6, {
        width: "70%"
    }, {
        duration: 2000,
        easing: "ease",
        delay: 0,
        isAsync: 1,
        cb: function() {
            log("链式写法，串并行都存在-在上面元素变高的时候变宽");
        }
    })
    .start(function () {
        log("全部都执行完成了")
    });
}
propCallbackBtn4.onclick = function () {
    showLog();
    animate(propDomCallbackBtn7, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        cb: function() {
            log("非链式并行，变宽");
        }
    })
    .start();

    animate(propDomCallbackBtn7, {
        height: 100
    }, {
        duration: 1500,
        easing: "ease",
        cb: function() {
            log("非链式并行，变高");
        }
    })
    .start();
}
propCallbackBtn5.onclick = function () {
    showLog();
    animate(propDomCallbackBtn8, {
        width: "70%"
    }, {
        duration: 2000,
        easing: "ease",
        cb: function() {
            log("非链式并行，变宽");
        }
    }).start(function () {
        log("全部都执行完成了")
    });
}

propCallbackBtn6.onclick = function () {
    showLog();
    animate(propDomCallbackBtn9, {
        width: "70%"
    }, {
        duration: 3000,
        easing: "ease",
        cb: function() {
            log("变宽");
        }
    })
    .start();
    animate(propDomCallbackBtn10, {
        height: 100
    }, {
        duration: 5000,
        easing: "ease",
        cb: function() {
            log("变高1");
        }
    })
    .start();
    animate(propDomCallbackBtn9, {
        height: 100
    }, {
        duration: 1000,
        easing: "ease",
        cb: function() {
            log("变高");
        }
    })
    .start();
}

// 动画延迟
var propDelayBtn1 = document.getElementById("prop-delay");

var propDelayDom1 = document.getElementById("prop-delay-dom");
var propDelayDom2 = document.getElementById("prop-not-delay-dom");

propDelayBtn1.onclick = function () {
    showLog();
    animate(propDelayDom1, {
        width: "70%"
    }, {
        duration: 2000,
        easing: "ease",
        delay: 2000,
        cb: function() {
            log("设置延迟动画");
        }
    })
    .start();

    animate(propDelayDom2, {
        width: "70%"
    }, {
        duration: 1000,
        easing: "ease",
        cb: function() {
            log("不设置延迟动画");
        }
    })
    .start();
}

// 动画是否并行
var propAsyncBtn1 = document.getElementById("prop-async-not");
var propAsyncBtn2 = document.getElementById("prop-async");

var propAsyncDom1 = document.getElementById("prop-async-dom");
var propAsyncDom2 = document.getElementById("prop-not-async-dom");

propAsyncBtn1.onclick = function () {
    showLog();
    animate(propAsyncDom1, {
        width: "70%"
    }, {
        duration: 2000,
        easing: "ease",
        delay: 0,
        isAsync: 1,
        cb: function() {
            log("动画并行宽度");
        }
    }).start(function () {
        log("结束1");
    });
    animate(propAsyncDom1, {
        height: 100
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 1,
        cb: function() {
            log("动画并行高度");
        }
    }).start(function () {
        log("结束2");
    })
    .start();
}

propAsyncBtn2.onclick = function () {
    showLog();
    animate(propAsyncDom2, {
        width: "70%"
    }, {
        duration: 2000,
        easing: "ease",
        delay: 0,
        isAsync: 1,
        cb: function() {
            log("动画并行宽度");
        }
    })
    .animate(propAsyncDom2, {
        height: 100
    }, {
        duration: 1000,
        easing: "ease",
        delay: 0,
        isAsync: 1,
        cb: function() {
            log("动画并行高度");
        }
    }).start(function () {
        log("结束2");
    })
};

function showLog () {
    var logEle = document.getElementById("testLog");
    logEle.style.display = "block";
    logEle.innerHTML = "";
}

function log(str) {
    if (str.length == 0) {
        return;
    }
    str = "<p>" + str + "</p>";
    var log = document.getElementById("testLog");
    log.innerHTML += str;
}

var logEle = document.getElementById("testLog");
logEle.onclick = function (e) {
    this.innerHTML = "";
    this.style.display = "none";
}