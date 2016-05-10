var PTR2 = {};
PTR2.isTouch = "ontouchstart" in window;
PTR2.EVENTS = {
    DOWN: PTR2.isTouch ? "touchstart" : "mousedown",
    UP: PTR2.isTouch ? "touchend" : "mouseup",
    MOVE: PTR2.isTouch ? "touchmove" : "mousemove"
};

PTR2.sys = function() {
    var a = navigator.userAgent,
        b = a.match(/iPhone/i),
        c = a.match(/iPad/i),
        h = a.match(/iPod/i),
        h = b || c || h,
        e = /Android/.test(a),
        d = /WebKit/.test(a),
        k = /Chrome/.test(a),
        g = /webOS|TouchPad/.test(a),
        q = /BlackBerry|RIM/.test(a),
        f = -1;
    e && (f = a.split("Android")[1], f = parseFloat(f.substring(0, f.indexOf(";"))));
    var l = -1;
    h && (l = parseFloat(a.match(/os ([\d_]*)/i)[1].replace("_", ".")));
    var n = window.innerWidth < window.innerHeight ? window.innerWidth / 768 : window.innerWidth / 1024;
    1 < n && (n = 1);
    var r = {
            touch: "ontouchstart" in window,
            multiTouch: "ongesturestart" in window || q && d,
            multipleTransforms: d && !e,
            translate3d: d && !e || 4 <= f,
            hdVideo: (!m || c || h && 4 <= l) && !e
        },
        m = r.touch || /Mobile|Tablet/i.test(a),
        p = (a = /MSIE/.test(a)) && m;
    return {
        isMobile: m,
        isIOS: h,
        isAndroid: e,
        isIPad: c,
        isIPhone: b,
        isWebOS: g,
        isBB: q,
        isPlayBook: q && /PlayBook/i.test(navigator.userAgent),
        isIE: a,
        isIEMobile: p,
        isWebKit: d,
        isChrome: k,
        isOnline: -1 != location.href.indexOf("http"),
        supports: r,
        androidVersion: f,
        iOSVersion: l,
        hasIssuesWith: {
            resetTransition: false
        },
        deviceScaleFactor: n,
        deviceScaleFactor2: 0.7 > n ? 0.7 : n,
        devicePixelRatio: window.devicePixelRatio || 1
    }
}();

PTR2.utils = function() {
    var a, b, c, h, e, d = function(a, c) {
        a.style[b] = c
    };
    (function(d) {
        for (var g = [
                ["transform", "", "transition", "transform-origin"],
                ["WebkitTransform", "-webkit-", "WebkitTransition", "WebkitTransformOrigin"],
                ["MozTransform", "-moz-", "MozTransition", "MozTransformOrigin"],
                ["OTransform", "-o-", "OTransition", "OTransformOrigin"],
                ["msTransform", "-ms-", "msTransition", "msTransformOrigin"]
            ], e = g.length; e--;)
            if ("undefined" != typeof d.style[g[e][0]]) {
                var f = g[e];
                b = f[0];
                a = f[1];
                c = "undefined" != typeof d.style[g[e][2]] ? f[2] : "";
                h = f[3];
                break
            }
    })(document.documentElement);
    e = PTR2.sys.hasIssuesWith.resetTransition ? "all 0.0001ms linear" : "";
    return {
        rotate: function(a, b) {
            if (!a) return;
            PTR2.sys.supports.translate3d ? d(a, "rotate(" + b + "rad) translateZ(0)") : d(a, "rotate(" + b + "rad)")
        },
        transform: d,
        transform2: function(a, c, d, e, h) {
            if (!a) return;
            c = PTR2.sys.supports.translate3d ? "translate3d(" + c + "px," + d + "px,0px)" : "translate(" + c + "px," + d + "px)";
            void 0 != e && (c += " scale(" + e + ")");
            void 0 != h && (c += " rotate(" + h + "rad)");
            a.style[b] = c
        },
        transition: function(b, d, e, h, l) {
            if (!b) return;
            "transform" == d && (d = a + "transform");
            b.style[c] = d + " " + e;
            void 0 !== l && (b.style[a + "transition-delay"] = l + "ms")
        },
        translate: function(a, b, c, e) {
            if (!a) return;
            PTR2.sys.supports.translate3d ? d(a, "translate3d(" + b + "," + c + "," + (void 0 != e ? e : "0px") + ")") : d(a, "translate(" + b + "," + c + ")")
        },
        resetTransition: function(b) {
            if (!b) return;
            b.style[c] = e;
            b.style[a + "transition-delay"] = "0"
        },
        setTransformOrigin: function(a, b) {
            if (!a) return;
            a.style[h] = b
        },
        smoothEdge: function(a) {
            PTR2.sys.isIPad && (a.style.WebkitBoxShadow = "0px 0px 1px " + getComputedStyle(a).backgroundColor)
        },
        vendorPrefix: a,
        transformName: b,
        transitionName: c,
        setSelectable: function(a, b, c) {
            a.onselectstart = b ? null : function() {
                return false
            };
            a.style.cursor = b ? "auto" : "default"
        },
        delegate: function(a, b) {
            var c = Array.prototype.slice.call(arguments);
            c.splice(0, 2);
            return function() {
                b.apply(a, c.length ? c : Array.prototype.slice.call(arguments))
            }
        },
        addClass: function(a, b) {
            a.className = a.className ? a.className + (" " + b) : b;
            return a
        },
        tappify: function(a, b) {
            var c = a.href;
            a.addEventListener("click", PTR2.utils.preventDefault, false);
            a.addEventListener(b || PTR2.EVENTS.UP, function() {
                window.location.href = c
            }, false);
            a.href = "javascript:void(0)"
        },
        preventDefault: function(a) {
            a.preventDefault()
        },
        bind: function(a, b, c) {
            if (!a) return;
            return a.addEventListener(b, c, false);
        }
    }
}();

var isAndroid = PTR2.sys.isAndroid;

PTR2.init = function(el, options) {

    var defaultOptions = {
        scrollElement: el.querySelector('.scroll-container'),
        scrollFillElement: el.querySelector('.scoll-fill'),
        scrollTopElement: el.querySelector('.scroll-top-container'),
        scrollTopFillElement: el.querySelector('.scoll-top-fill'),
        scrollContainerFillElement: el.querySelector('.scroll-center-container'),
        scrollBottomElement: el.querySelector('.scroll-bottom-container'),
        scrollBottomFillElement: el.querySelector('.scoll-bottom-fill'),
        scrollY: true,
        scrollX: false,
        onRefresh: function() {},
        onLoadMore: function() {}
    };

    // console.log($(el).height());
    // console.log($(defaultOptions.scrollElement).height());

    if (!el || el.getAttribute('data-PTR2')) return;
    el.setAttribute('data-PTR2', 'yes');

    // 将默认选项替换
    if (options && typeof options == 'object')
        for (var k in options) defaultOptions[k] = options[k];
    options = defaultOptions;
    //
    if (!options.scrollElement) return;
    if (!options.scrollTopElement && !options.scrollBottomElement) return;
    // 禁止了 X 和 Y 滚动
    if (!options.scrollX && !options.scrollY) return;
    // 顶部下拉刷新wrap，可拉高度为wrap的1.5倍
    if (!options.pullHeight && options.scrollTopElement) options.pullHeight = options.scrollTopElement.offsetHeight * 1.5;
    // Android下可拉高度为15px，最大高度为40px
    if (isAndroid) {
        options.pullHeight = 15;
        options.maxPullHeight = 40;
    }

    // 底部上拉刷新wrap,可拉高度为wrap的1.5倍
    if (!options.dragHeight && options.scrollBottomElement) options.dragHeight = options.scrollBottomElement.offsetHeight * 1.5;

    // scroll = 滚动的container
    var scroll = options.scrollElement;
    scroll.style.position = 'relative';
    scroll.style.zIndex = 3;
    scroll.style.overflowX = defaultOptions.scrollX ? 'scroll' : 'hidden';
    scroll.style.overflowY = defaultOptions.scrollY ? 'scroll' : 'hidden';

    // 底部填充ele
    options.scrollFillElement.style.position = 'relative';
    options.scrollFillElement.style.width = '100%';
    options.scrollFillElement.style.height = '0px';
    options.scrollFillElement.style.opacity = 0;

    // 顶部上拉刷新wrap
    if (options.scrollTopElement) {
        options.scrollTopElement.style.position = 'absolute';
        options.scrollTopElement.zIndex = 1;
        options.scrollTopElement.style.width = '100%';
        options.scrollTopElement.style.height = '20px';
        options.scrollTopElement.style.left = '0px';
        options.scrollTopElement.style.color = '#333';
        options.scrollTopElement.style.lineHeight = '20px';
        options.scrollTopElement.style.textAlign = 'center';
        options.scrollTopElement.style.top = '-' + (options.scrollTopElement.offsetHeight / 2) + 'px';
        options.scrollTopElement.style.opacity = 0;
        options.pullingDiv = options.scrollTopElement.querySelector('.pulling');
        options.pullingDiv.style.display = '';
        options.releaseDiv = options.scrollTopElement.querySelector('.release');
        options.releaseDiv.style.display = 'none';
    }
    // container上部填充ele
    if (options.scrollTopFillElement) {
        options.scrollTopFillElement.style.opacity = 0;
        options.scrollTopFillElement.style.height = '0px';
    }

    // 底部wrap
    if (options.scrollBottomElement) {
        options.scrollBottomElement.style.position = 'absolute';
        options.scrollBottomElement.zIndex = 1;
        options.scrollBottomElement.style.width = '100%';
        options.scrollBottomElement.style.height = '20px';
        options.scrollBottomElement.style.left = '0px';
        options.scrollBottomElement.style.color = '#FFF';
        options.scrollBottomElement.style.lineHeight = '20px';
        options.scrollBottomElement.style.textAlign = 'center';
        options.scrollBottomElement.style.bottom = '-' + (options.scrollBottomElement.offsetHeight / 2) + 'px';
        options.scrollBottomElement.style.opacity = 0;
        options.pullingDiv2 = options.scrollBottomElement.querySelector('.pulling');
        options.releaseDiv2 = options.scrollBottomElement.querySelector('.release');
        options.releaseDiv2.style.display = 'none';
    }

    // container底部填充ele
    if (options.scrollBottomFillElement) {
        options.scrollBottomFillElement.style.opacity = 0;
        options.scrollBottomFillElement.style.height = '0px';
    }

    // 绑定下拉事件到滚动container
    PTR2.utils.bind(scroll, PTR2.EVENTS.DOWN, function(evt) {
        if (scroll.scrollTop == 0) {
            if (isAndroid) {
                if ($(el).height() > $(options.scrollContainerFillElement).height()) {
                    $(options.scrollFillElement).height($(scroll).height() - $(options.scrollContainerFillElement).height());
                };
                $(options.scrollTopFillElement).height(options.maxPullHeight);
                $(scroll).scrollTop(options.maxPullHeight);
            } else {
                if ($(el).height() > $(options.scrollContainerFillElement).height()) {
                    $(options.scrollFillElement).height($(scroll).height() - $(options.scrollContainerFillElement).height() + 3);
                };
                scroll.scrollTop++;
            }
        } else if (scroll.scrollTop + scroll.offsetHeight == scroll.scrollHeight) {
            if (isAndroid) {
                $(options.scrollBottomFillElement).height(options.maxPullHeight);
            } else {
                scroll.scrollTop--;
            }
        } else if (scroll.scrollTop + scroll.offsetHeight >= scroll.scrollHeight - 15) {
            if (!isAndroid) {
                scroll.scrollTop--;
            }
        }
    });

    var state = 'pulling';
    var state2 = 'dragging';
    // 绑定滚动事件到滚动caontainer
    PTR2.utils.bind(scroll, PTR2.EVENTS.MOVE, function(evt) {
        if (isAndroid) {
            if ($(options.scrollTopFillElement).height() > 0) {
                var y = options.maxPullHeight - scroll.scrollTop;
                if (y >= 0) {
                    PTR2.utils.transform2(options.scrollTopElement, 0, 0.5 * y);
                    options.scrollTopElement.style.opacity = 1; //Math.min(y / options.pullHeight, 1);
                    if (scroll.scrollTop < (options.maxPullHeight - options.pullHeight) && state == 'pulling') {
                        options.pullingDiv.style.display = 'none';
                        options.releaseDiv.style.display = '';
                        state = 'release';
                    } else if (scroll.scrollTop >= (options.maxPullHeight - options.pullHeight) && state == 'release') {
                        options.pullingDiv.style.display = '';
                        options.releaseDiv.style.display = 'none';
                        state = 'pulling';
                    }
                } else {
                    resetTopAndBottom();
                }
            }

            if ($(options.scrollBottomFillElement).height() > 0) {
                if (scroll.scrollTop + scroll.offsetHeight >= scroll.scrollHeight - options.maxPullHeight) {
                    var y = options.maxPullHeight - (scroll.scrollHeight - (scroll.scrollTop + scroll.offsetHeight));
                    PTR2.utils.transform2(options.scrollBottomElement, 0, -0.5 * y);
                    options.scrollBottomElement.style.opacity = 1; //Math.min(y / options.pullHeight, 1);
                    if (y > options.pullHeight && state2 == 'dragging') {
                        options.pullingDiv2.style.display = 'none';
                        options.releaseDiv2.style.display = '';
                        state2 = 'release';
                    } else if (y <= options.pullHeight && state2 == 'release') {
                        options.pullingDiv2.style.display = '';
                        options.releaseDiv2.style.display = 'none';
                        state2 = 'dragging';
                    }
                } else {
                    resetTopAndBottom();
                }
            }
        } else {
            var y = scroll.scrollTop;
            if (y < 0 && options.scrollTopElement) {
                PTR2.utils.transform2(options.scrollTopElement, 0, -0.5 * y);
                options.scrollTopElement.style.opacity = 1; //Math.min(-1 * y / options.pullHeight, 1);

                if (y < -options.pullHeight && state == 'pulling') {
                    options.pullingDiv.style.display = 'none';
                    options.releaseDiv.style.display = '';
                    state = 'release';
                } else if (y >= -options.pullHeight && state == 'release') {
                    options.pullingDiv.style.display = '';
                    options.releaseDiv.style.display = 'none';
                    state = 'pulling';
                }
            } else if (scroll.scrollTop + scroll.offsetHeight > scroll.scrollHeight && options.scrollBottomElement) {
                var _y = scroll.scrollTop + scroll.offsetHeight - scroll.scrollHeight;
                PTR2.utils.transform2(options.scrollBottomElement, 0, -20);
                options.scrollBottomElement.style.opacity = 1; //Math.min(_y / options.dragHeight, 1);

                if (_y > options.dragHeight && state2 == 'dragging') {
                    options.pullingDiv2.style.display = 'none';
                    options.releaseDiv2.style.display = '';
                    state2 = 'release';
                } else if (_y <= options.dragHeight && state2 == 'release') {
                    options.pullingDiv2.style.display = '';
                    options.releaseDiv2.style.display = 'none';
                    state2 = 'dragging';
                }
            }
        }
    });

    // 绑定上拉事件到滚动container
    PTR2.utils.bind(scroll, PTR2.EVENTS.UP, function(evt) {
        if (isAndroid) {
            if ($(options.scrollTopFillElement).height() > 0) {
                if ($(options.scrollTopFillElement).height() >= scroll.scrollTop) {
                    $(options.scrollElement).animate({
                        scrollTop: options.maxPullHeight
                    }, 400);
                    setTimeout(function() {
                        $(options.scrollTopFillElement).height(0);
                        $(options.scrollElement).scrollTop(0);
                    }, 500);
                    setTimeout(function() {
                        options.pullingDiv.style.display = '';
                        options.releaseDiv.style.display = 'none';
                        $(options.scrollFillElement).height(0);
                    }, 500);
                    if (state == 'release') {
                        state = 'pulling';
                        options.onRefresh.call();
                    }
                } else {
                    var offHeight = scroll.offsetHeight - scroll.scrollTop;
                    $(options.scrollTopFillElement).height(0);
                    $(options.scrollElement).scrollTop(scroll.scrollTop - options.maxPullHeight);
                }
            }

            if ($(options.scrollBottomFillElement).height() > 0) {
                if (scroll.scrollTop + scroll.offsetHeight >= scroll.scrollHeight - options.maxPullHeight) {
                    if (state2 == 'release') {
                        state2 = 'dragging';
                        var asy = options.onLoadMore.call();
                        asy.then(function() {
                          var text = this.pool.more ? "加载成功！" : "没有更多啦！";

                          $('#scroll-bottom-label').text(text);

                          setTimeout(function(){
                            resetTopAndBottom();
                            $(options.scrollElement).animate({
                                scrollTop: scroll.scrollTop - (options.maxPullHeight - (scroll.scrollHeight - scroll.offsetHeight - scroll.scrollTop))
                            }, 400);

                            setTimeout(function() {
                                $(options.scrollBottomFillElement).height(0);
                            }, 500);

                            setTimeout(function() {
                                options.pullingDiv2.style.display = '';
                                options.releaseDiv2.style.display = 'none';
                            }, 500);
                            setTimeout(function() {
                              $('#scroll-bottom-label').text("正在加载！");
                            }, 500);
                          }, 500);
                        });
                    } else {
                        resetTopAndBottom();
                        $(options.scrollBottomFillElement).height(0);
                    }
                } else {
                    resetTopAndBottom();
                    $(options.scrollBottomFillElement).height(0);
                };
            };
        } else {
            var y = scroll.scrollTop;
            if (y < 0 && options.scrollTopElement) {
                PTR2.utils.transition(options.scrollTopElement, 'all', '500ms linear');
                PTR2.utils.transform2(options.scrollTopElement, 0, 0);
                options.scrollTopElement.style.opacity = 0;
                setTimeout(function() {
                    options.pullingDiv.style.display = '';
                    options.releaseDiv.style.display = 'none';
                    $(options.scrollFillElement).height(0);
                }, 300);
                if (state == 'release') {
                    state = 'pulling';
                    options.onRefresh.call();
                }
            } else if (scroll.scrollTop + scroll.offsetHeight > scroll.scrollHeight && options.scrollBottomElement) {
                if (state2 == 'release') {
                    state2 = 'dragging';
                    // PTR2.utils.transition(options.scrollBottomFillElement, 'all', '0ms linear');
                    setTimeout(function(){
                        options.scrollBottomFillElement.style.height = '45px';
                    },85);

                    var asy = options.onLoadMore.call();
                    
                    asy.then(function() {
                      // var text = this.pool.more ? "加载成功！" : "没有更多啦！";
                      var text = "加载成功！";

                      $('#scroll-bottom-label').text(text);

                      setTimeout(function(){
                        resetTopAndBottom();
                        setTimeout(function() {
                            options.pullingDiv2.style.display = '';
                            options.releaseDiv2.style.display = 'none';
                        }, 500);
                        setTimeout(function() {
                          $('#scroll-bottom-label').text("正在加载！");
                        }, 500);
                      }, 500);
                    });
                } else {
                    resetTopAndBottom();
                }
            } else {
                resetTopAndBottom();
            }
        }
    });

    function resetTopAndBottom() {
      // cubic-bezier(.25,.66,.42,.99)
        PTR2.utils.transition(options.scrollTopElement, 'all', '250ms linear');
        PTR2.utils.transition(options.scrollBottomElement, 'all', '250ms linear');
        if (!isAndroid && $(".scoll-bottom-fill").height() > 0) {
            // PTR2.utils.transition(options.scrollBottomFillElement, 'height', '250ms linear');
            // options.scrollBottomFillElement.style.height = '0px';
            setTimeout(function(){options.scrollBottomFillElement.style.height = '0px';},125);
        }
        PTR2.utils.transform2(options.scrollTopElement, 0, 0);
        PTR2.utils.transform2(options.scrollBottomElement, 0, 0);
        if (options.scrollTopElement) options.scrollTopElement.style.opacity = 0;
        if (options.scrollBottomElement) options.scrollBottomElement.style.opacity = 0;
    }
};
