/**
 * @file Aniamtion Function. Support sync and async animation
 * @author wupeng[smartfutureplayer@gmail.com]
 * @data 2016-12-12
 */

(function(global) {
    'use strict';
	/**
     * Animation Separator
     *
     * @const
     * @type {string}
     */
    var TAG = '#';
	/**
     * CSS property unit cache
     *
     * @type {Object}
     * @public
     */
    var unitCache = {};
	/**
     * Vendor
     *
     * @const
     * @type {Array}
     */
    var VENDOR = ['', 'webkit', 'moz', 'ms', 'o', 'Webkit', 'Moz', 'O'];
	/**
     * Reg for property unit
     *
     * @const
     * @type {RegExp}
     */
	var UNIT_REG = /^\d+([a-zA-Z]+)/;
	/**
     * Current Vendor type
     *
     * @type {string}
     */
	var cVendor;
	/**
	 * Judge current vendor
	 *
	 */
	function judgeVendor () {
		if (cVendor) {
			return;
		}

		var prop = "transition";
		var ele = document.createElement('virtualDom');
		for (var key in VENDOR) {
			var vendor = VENDOR[key] + prop.charAt(0).toUpperCase() + prop.slice(1);
	        if (vendor in ele.style) {
				cVendor = VENDOR[key];
				break;
	        }
		}
	}
	/**
	 * If an object is a function
	 *
	 * @param {Object} fn item
	 */
	function isFunction(fn) {
		return typeof fn === 'function';
	}
	/**
	 * If an object is a string
	 *
	 * @param {Object} str item
	 */
	function isString(str) {
		return Object.prototype.toString.call(str) === '[object String]';
	}
	/**
	 * Convert object to float value
	 *
	 * @param {Object} num item
	 */
	function toFloat(num) {
		num = parseFloat(num);
		return !isNaN(num) ? num : 0;
	}
	/**
	 * If object is empty
	 *
	 * @param {Object} e object
	 */
	function isEmptyObject(e) {
		if (Object.prototype.toString.call(e) !== '[object Object]') {
			return true;
		}
		for (var t in e) {
			return false;
		}
		return true;
	}
	/**
	 * Judge whether tag is hash tag(#)
	 *
	 * @param {string} tag character(#)
	 * @return {Boolean} result
	 */
	function isHashTag(tag) {
		return tag === TAG ? true : false;
	}
	/**
	 * Check If need to animate. If a transition' property need not to tranform,
	 * It doesn't execute transition event,
	 *
	 * @param {Object} item animation object from asycn queue
	 * @return {boolean} if it need to animate
	 */
	function needAnimation(item) {
		var flag = false;
		var style = getComputedStyle(item.ele);
		for (var key in item.property) {
			if (item.property[key] !== style[key]) {
				flag = true;
				break;
			}
		}
		// If need't execute animation, excute callback
		if (!flag && item.fn) {
			item.fn();
		}
		return flag;
	}
	/**
	 * Set property unit
	 *
	 * @param {Object} property dom property
	 * @param {string} value dom property value
	 * @param {Object} ele virtual dom
	 * @return {string} correctly property value
	 */
	function unitProperty(property, value, ele) {
        if (value !== +value) {
            return value;
        }
        if (unitCache[property]) {
            return value + unitCache[property];
        }
        ele.style[property] = 0;
        var propValue = ele.style[property];
        var match = propValue.match && propValue.match(UNIT_REG);
        if (match) {
            return value + (unitCache[property] = match[1]);
        }
        return value;
    }
	/**
	 * Set up property, if existed in dom style, then return, otherwise select correctly vendor property
	 *
	 * @param {object} prop dom property
	 * @param {Function} fn callback
	 */
	function setVendorProperty(prop, fn) {
		var ele = document.createElement('virtualDom');
		var newProp = prop;
		if (!(prop in ele.style)) {
			newProp = !cVendor ? cVendor : cVendor + prop.charAt(0).toUpperCase() + prop.slice(1);
	    }
	    fn(prop, newProp);
	}
	/**
	 * Calculate animation attributes
	 *
	 * @param {Object || Array} ele dom property or list
	 * @param {Object} property animation property
	 * @param {Object} opt setting params
	 */
	function calculateProperty(ele, property, opt) {
		var cb;
		opt = opt ? opt : {};
		for (var k in opt) {
			if (isFunction(opt[k])) {
				cb = opt[k];
				break;
			}
		}
		return {
			fn: cb,
			ele: ele,
			property: property,
			duration: toFloat(opt.duration) ? toFloat(opt.duration) / 1000 : 0.4,
			easing: isString(opt.easing) ? opt.easing : 'linear',
			isAsync: toFloat(opt.isAsync) ? toFloat(opt.isAsync) : 0,
			delay: toFloat(opt.delay) ? toFloat(opt.delay) / 1000 :  0
		};
	}
    /**
	 * Animate with CSS3
	 *
	 * @class
	 */
	function AnimationElement() {
		/**
	     * Animation state
	     *
	     * @type {boolean}
	     * @private
	     */
		this.isRuning = false;
		/**
	     * Animation queue
	     *
	     * @type {Array}
	     * @private
	     */
		this.queue = [];
		/**
	     * Async animation callback
	     *
	     * @type {Array}
	     * @private
	     */
		this.endCb = [];
	}
	/**
	 * If browser doc't support transitionend, execute callback via setTimeout
	 *
	 * @param {Function} funRef setTimeout callback
	 * @param {Object} ele animation dom
	 * @param {number} delayTime setTimeout delay time
	 */
	AnimationElement.prototype._setAnimationTimeout = function(funRef, ele, delayTime) {
		var obj = {};
		obj.target = ele.ele;
		var bindFun = funRef.bind(this, obj, ele);
		ele.bindFun = bindFun;
	    ele.timer = setTimeout(bindFun, delayTime);
	}
	/**
	 * When condition is true, start run animation
	 *
	 * @param {number} isExexuteNow if execute run immediately
	 */
	AnimationElement.prototype._startRun = function(isExexuteNow) {
		if (!this.isRuning && isExexuteNow && this.queue.length > 0) {
			this.isRuning = true;
			this._run();
		}
	}
	/**
	 * Execute animation
	 *
	 */
	AnimationElement.prototype._run = function() {
		if (this.queue.length === 0) {
			return;
		}
		for (var i = 0; i < this.queue.length; i++) {
			if (!isHashTag(this.queue[i])) {
				if (needAnimation(this.queue[i])) {
					this._addVendorEvent(this.queue[i], 'transitionend');

					// If not support transition, use setTimeout
					// At the same time, set 25ms as timeout
					var outTime = this.queue[i].duration * 1000
								  + this.queue[i].delay * 1000 + 25;
					this._setAnimationTimeout(this._handle, this.queue[i], outTime);
					this.queue[i].startTime = new Date().getTime();

					// add all vendor property
					setVendorProperty('transition', function(oldProp, newProp) {
						this.queue[i].ele.style[newProp] = 'all '.concat(
							this.queue[i].duration, 's ',
							this.queue[i].easing, ' ',
							this.queue[i].delay, 's');
					}.bind(this));
					for (var j in this.queue[i].property) {
						this.queue[i].ele.style[j] = this.queue[i].property[j];
					}
				} else {
					this.queue.splice(i, 1);
					if (isHashTag(this.queue[0])) {
						this.isRuning = false;
						this.queue.shift();
					}
					this._run();
				}
			} else {
				break;
			}
		}
	}
	/**
	 * Handle transition end event
	 *
	 * @param {Object} event transition event
	 */
	AnimationElement.prototype._handle = function(event, obj) {
		var now = new Date().getTime();
		if ((now - obj.startTime) / 1000 >= obj.duration + obj.delay) {
			this.isRuning = false;
			clearTimeout(obj.timer);
			this._removeVendorEvent(obj, 'transitionend');
			var isAsync = this._deleteFinishElement(obj);
			if (isHashTag(this.queue[0])) {
				// If async animation, execute endAniamtion callback
				if (isAsync) {
					if (!!this.endCb[0]
					&& Object.prototype.toString.call(this.endCb[0]) === '[object Function]') {
						this.endCb[0]();
					}
					this.endCb.shift();
				}
				this.queue.shift();
				this._startRun(1);
			}
		}
	}
	/*
	 * add transition event listener, compatible with vendor
	 *
	 * param {Object} el listening dom
	 * param {Object} prop dom attributes
	 * param {Function} handle callback
	 */
	 AnimationElement.prototype._addVendorEvent = function(el, prop) {
	 	var obj = {};
		obj.target = el.ele;
		var bindFun = this._handle.bind(this, obj, el);

		setVendorProperty(prop, function(oldProp, newProp) {
			prop = newProp;
		});
		el.ele.addEventListener(prop, bindFun);
        el.bindFun = bindFun;
	 }
	 /*
	 * add transition event
	 *
	 * param {Object} el listening dom
	 * param {Object} prop dom attributes
	 * param {Function} handle callback
	 */
	 AnimationElement.prototype._removeVendorEvent = function(el, prop) {
	 	setVendorProperty(prop, function(oldProp, newProp) {
			prop = newProp;
		});
	 	el.ele.removeEventListener(prop, el.bindFun);
	 }
	/**
	 * When transition end triggered, delete the element in queue
	 *
	 * @param {Object} ele event
	 * @return {boolean} whether the object is async
	 */
	AnimationElement.prototype._deleteFinishElement = function(ele) {
		for (var i = 0; i < this.queue.length; i++) {
			var currentAnimationDom = this.queue[i];
			if (currentAnimationDom !== TAG && this.queue[i] === ele) {
				if (!!this.queue[i].fn) {
					this.queue[i].fn();
				}
				var deleteNode = this.queue.splice(i, 1);
				return deleteNode[0].isAsync;
			}
		}
		return 0;
	}
	/**
	 * Set up property, and add unit, such as 'px'
	 *
	 * @param {Object} propsObj property list
	 */
	AnimationElement.prototype._setInitializateProperty = function(propsObj) {
		var ele = document.createElement('virtualDom');
		for (var key in propsObj) {
			// compatible property vendor
			setVendorProperty(key, function(oldProp, newProp) {
				if (newProp !== oldProp) {
					propsObj[newProp] = propsObj[oldProp];
	                delete propsObj[oldProp];
				}
			});
			var props = unitProperty(key, propsObj[key], ele);
			propsObj[key] = props;
		}
	}
	/**
	 * Identificafy dom type, if ele is HTMLElement, add it to async queue, otherwise for loop and add
	 *
	 * @param {Object || Array} ele dom property or list
	 * @param {Object} property animation property
	 * @param {Object} opt setting params
	 */
	AnimationElement.prototype._pushDoms = function(ele, prop, opt) {
		var currentObj;
		if (ele.length > 0) {
			for (var i = 0; i < ele.length; i++) {
				if (ele[i] instanceof HTMLElement) {
					opt.isAsync = 1;
					this._pushToAsyncQueue(ele[i], prop, opt);
				}
			}
		} else if (ele instanceof HTMLElement) {
			this._pushToAsyncQueue(ele, prop, opt);
		}
	}
	/**
	 * Add object to async queue, if sync, add '#', otherwise when meet endAnimation, it will add '#'
	 *
	 * @param {Object || Array} ele dom property or list
	 * @param {Object} prop animation property
	 * @param {Object} opt setting params
	 */
	AnimationElement.prototype._pushToAsyncQueue  = function(ele, prop, opt) {
		var obj = calculateProperty(ele, prop, opt);
		obj.isAsync ? this.queue.push(obj) : this.queue.push(obj, TAG);
	}
	/**
	 * Animate Function, support sync and async animation
	 * @param {Object || Array} ele dom property or list
	 * @param {Object} property animation property
	 * @param {Object} opt setting param
	 */
	AnimationElement.prototype.animate = function(ele, property, opt) {
		if (!ele || isEmptyObject(property)) {
			return this;
		}
		this._setInitializateProperty(property);
		this._pushDoms(ele, property, opt);
		return this;
	}
	/**
	 * End async animation, add it and '#' to queue, then start execute
	 *
	 * @param {Function} fn when all async animation finished, trigger callback
	 * @return prototype
	 */
	AnimationElement.prototype.start = function(fn) {
		if (this.queue.length === 0) {
			return;
		}
		this.endCb.push(fn);
		if (!isHashTag(this.queue[this.queue.length - 1])) {
			this.queue.push(TAG);
		}
		if (!this.isRuning) {
			this._startRun(1);
		}
		return this;
	}
	/**
	 * End current all animation
	 *
	 * @return prototype
	 */
	AnimationElement.prototype.stop = function() {
		this.isRuning = false;
		for (var i = 0; i < this.queue.length; i++) {
			var asycEvent = this.queue[i];
			if (!isHashTag(this.queue[i])) {
				clearTimeout(asycEvent.timer);
				var style = getComputedStyle(asycEvent.ele);
				this._removeVendorEvent(asycEvent, 'transitionend');
				setVendorProperty('transitionDuration', function(oldProp, newProp) {
					asycEvent.ele.style[newProp] = '0s';
				});
				for (var j in asycEvent.property) {
					asycEvent.ele.style[j] = style[j];
				}
			}
		}
		this.queue = [];
		return this;
	}
	/**
	 * The entry of animation
	 *
	 * @class
	 */
	function AnimationEntry(ele, property, opt) {
		var animate = new AnimationElement();
		judgeVendor();
		animate.animate(ele, property, opt);
		return animate;
	}

	global.animate = AnimationEntry;
})(this);