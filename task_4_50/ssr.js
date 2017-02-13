/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(4);

	var _reactRedux = __webpack_require__(5);

	var _server = __webpack_require__(6);

	var _reactRouter = __webpack_require__(7);

	var _routes = __webpack_require__(8);

	var _routes2 = _interopRequireDefault(_routes);

	var _index = __webpack_require__(24);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(27);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(9);

	var _index6 = _interopRequireDefault(_index5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)(),
	    port = 9000;

	app.use(_express2.default.static(_path2.default.join(__dirname)));

	app.use(function (req, res, next) {
	    (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	        if (err) {
	            res.status(500).end('Internal Server Error ' + err);
	        } else if (redirect) {
	            res.redirect(redirect.pathname + redirect.search);
	        } else if (props) {
	            var store = (0, _redux.createStore)(_index2.default),
	                html = (0, _server.renderToString)(_react2.default.createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    _react2.default.createElement(_index4.default, null),
	                    _react2.default.createElement(_reactRouter.RouterContext, props)
	                )
	            ));
	            res.end(renderFullPage(html, store.getState()));
	        } else {
	            res.status(404).end('Not Found');
	        }
	    });
	});

	app.listen(port, function () {
	    console.log('server in on port ' + port + '...');
	});

	function renderFullPage(html, initialState) {
	    return '\n        <!DOCTYPE html>\n        <html>\n            <head>\n                <meta charset="utf-8" />\n                <title>React</title> \n                <link rel="stylesheet" type="text/css" href="build/css/app.style.css" />\n                <link rel="stylesheet" type="text/css" href="/icons/css/font-awesome.min.css" />\n            </head>\n            <body>\n                <div id="root">' + html + '</div>\n                <script type="text/javascript">\n                    window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n                </script>\n                <script type="text/javascript" src="build/lib.bundle.js"></script>\n                <script type="text/javascript" src="build/app.js"></script>\n            </body>\n        </html>\n    ';
	}
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(7);

	var _index = __webpack_require__(9);

	var _index2 = _interopRequireDefault(_index);

	var _Question = __webpack_require__(21);

	var _Question2 = _interopRequireDefault(_Question);

	var _Answer = __webpack_require__(23);

	var _Answer2 = _interopRequireDefault(_Answer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routers = _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(_reactRouter.Route, { path: '/', component: _index2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/add-question', component: _Question2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/question/:id', component: _Question2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/answer/:id', component: _Answer2.default })
	);

	exports.default = routers;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _reactRouter = __webpack_require__(7);

	var _question = __webpack_require__(10);

	var _items = __webpack_require__(11);

	var _index = __webpack_require__(12);

	var _index2 = _interopRequireDefault(_index);

	var _IconButton = __webpack_require__(19);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _index3 = __webpack_require__(18);

	var _index4 = _interopRequireDefault(_index3);

	var _config = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dispatch = null;

	var linkTo = function linkTo() {
		_reactRouter.browserHistory.push('/add-question');
	};

	var edit = function edit(id) {
		Dispatch((0, _question.toggleQuestion)(id));
		_reactRouter.browserHistory.push('/question/' + id);
	};

	var answer = function answer(id) {
		Dispatch((0, _question.toggleQuestion)(id));
		_reactRouter.browserHistory.push('/answer/' + id);
	};

	var getTds = {
		status: function status(val) {
			return getStatus(val);
		},
		date: function date(val) {
			return val.join('-');
		},
		title: function title(val) {
			return val;
		}
	};

	var getStatus = function getStatus(val) {
		switch (val) {
			case 1:
				return _react2.default.createElement(
					'span',
					{ className: 'status-publish' },
					'\u53D1\u5E03\u4E2D'
				);
			case -1:
				return _react2.default.createElement(
					'span',
					{ className: 'status-end' },
					'\u5DF2\u7ECF\u7ED3\u675F'
				);
			default:
				return '未发布';
		}
	};

	var Buttons = function (_Component) {
		_inherits(Buttons, _Component);

		function Buttons(props) {
			_classCallCheck(this, Buttons);

			var _this = _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).call(this, props));

			_this.state = {
				layer: false,
				layerConfig: {}
			};
			return _this;
		}

		_createClass(Buttons, [{
			key: 'publish',
			value: function publish() {
				this.setState({
					layer: true,
					layerConfig: {
						content: '该问卷发布成功'
					}
				});
				Dispatch((0, _items.publishItem)(this.props.id));
			}
		}, {
			key: 'del',
			value: function del() {
				var _this2 = this;

				this.setState({
					layer: true,
					layerConfig: {
						type: 'confirm',
						content: '是否删除该问卷？',
						yes: function yes() {
							Dispatch((0, _items.delItem)(_this2.props.id));
						}
					}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var _props = this.props,
				    status = _props.status,
				    id = _props.id,
				    _state = this.state,
				    layer = _state.layer,
				    layerConfig = _state.layerConfig;


				var look = status === 0 ? _react2.default.createElement(_index4.default, { text: '\u53D1\u5E03\u95EE\u5377', handleClick: this.publish.bind(this) }) : _react2.default.createElement(
					_reactRouter.Link,
					{ to: '/look-item-data', className: 'button-link' },
					'\u67E5\u770B\u6570\u636E'
				);
				var isAnswer = status === 1 ? _react2.default.createElement(_index4.default, { text: '\u56DE\u7B54', handleClick: function handleClick() {
						answer(id);
					} }) : _react2.default.createElement(_index4.default, { text: '\u7F16\u8F91', handleClick: function handleClick() {
						edit(id);
					} });

				return _react2.default.createElement(
					'span',
					null,
					layer ? _react2.default.createElement(_index2.default, _extends({}, layerConfig, {
						destroy: function destroy() {
							_this3.setState({
								layer: !layer
							});
						}
					})) : null,
					isAnswer,
					_react2.default.createElement(_index4.default, { text: '\u5220\u9664', handleClick: this.del.bind(this) }),
					look
				);
			}
		}]);

		return Buttons;
	}(_react.Component);

	var getTbody = function getTbody(items, tagKeys) {
		var keys = Object.keys(items);
		return keys.map(function (id) {
			var val = items[id];
			if (!val) return null;
			return _react2.default.createElement(
				'tr',
				{ key: 'tr-' + id, className: 'show-items-tr' },
				tagKeys.map(function (key, i) {
					return _react2.default.createElement(
						'td',
						{ key: 'td-' + i },
						getTds[key](val[key])
					);
				}),
				_react2.default.createElement(
					'td',
					null,
					_react2.default.createElement(Buttons, { status: val.status, id: id })
				)
			);
		});
	};

	var Table = function Table(_ref) {
		var items = _ref.items;

		var tagKeys = Object.keys(_config.tags);
		return _react2.default.createElement(
			'table',
			{ className: 'show-items' },
			_react2.default.createElement(
				'thead',
				{ className: 'show-items-title' },
				_react2.default.createElement(
					'tr',
					null,
					tagKeys.map(function (val, i) {
						return _react2.default.createElement(
							'th',
							{ key: 'th-' + i,
								className: 'show-items-td-' + val },
							_config.tags[val]
						);
					}),
					_react2.default.createElement(
						'th',
						{ className: 'show-items-td-handle' },
						'\u64CD\u4F5C',
						_react2.default.createElement(_IconButton2.default, {
							text: '\u65B0\u589E\u95EE\u5377',
							icon: 'plus',
							isActive: true,
							handleClick: linkTo
						})
					)
				)
			),
			_react2.default.createElement(
				'tbody',
				{ className: 'show-items-body' },
				getTbody(items, tagKeys)
			)
		);
	};

	var IndexContainer = function IndexContainer(_ref2) {
		var data = _ref2.data,
		    dispatch = _ref2.dispatch;

		var hasItem = Object.keys(data.items).length !== 0;
		Dispatch = dispatch;
		return hasItem ? _react2.default.createElement(
			'div',
			{ className: 'index-container' },
			Table(data)
		) : _react2.default.createElement(
			'div',
			{ className: 'no-index-container' },
			_react2.default.createElement(_IconButton2.default, { text: '\u65B0\u5EFA\u95EE\u5377',
				icon: 'plus',
				isActive: true,
				handleClick: linkTo
			})
		);
	};

	var mapStateToProps = function mapStateToProps(state) {
		return {
			data: state.item
		};
	};

	var DataIndexContainer = (0, _reactRedux.connect)(mapStateToProps)(IndexContainer);

	exports.default = DataIndexContainer;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var addQuestion = exports.addQuestion = function addQuestion(type) {
		return _defineProperty({
			type: 'ADD_QUESTION'
		}, 'type', type);
	};

	var toggleQuestion = exports.toggleQuestion = function toggleQuestion(id) {
		return {
			type: 'TOGGLE_ITEM',
			id: id
		};
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var addItem = exports.addItem = function addItem(info) {
		return {
			type: 'ADD_ITEM',
			info: info
		};
	};

	var delItem = exports.delItem = function delItem(id) {
		return {
			type: 'DEL_ITEM',
			id: id
		};
	};

	var changeTitle = exports.changeTitle = function changeTitle(id, title) {
		return {
			type: 'CHANGE_TITLE',
			title: title,
			id: id
		};
	};

	var changeDate = exports.changeDate = function changeDate(id, date) {
		return {
			type: 'CHANGE_DATE',
			date: date,
			id: id
		};
	};

	var publishItem = exports.publishItem = function publishItem(id) {
		return {
			type: 'PUBLISH_ITEM',
			id: id
		};
	};

	var updateQuestions = exports.updateQuestions = function updateQuestions(id, questions) {
		return {
			type: 'UPDATE_QUESTIONS',
			id: id,
			questions: questions
		};
	};

	var answerItem = exports.answerItem = function answerItem(id, answers) {
		return {
			type: 'ANSWER_ITEM',
			id: id,
			answers: answers
		};
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _index = __webpack_require__(13);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(16);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(18);

	var _index6 = _interopRequireDefault(_index5);

	var _utils = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Layer = function (_Component) {
		_inherits(Layer, _Component);

		function Layer(props) {
			_classCallCheck(this, Layer);

			var _this = _possibleConstructorReturn(this, (Layer.__proto__ || Object.getPrototypeOf(Layer)).call(this, props));

			_this.state = {
				show: true
			};
			_this.flag = false;
			return _this;
		}

		_createClass(Layer, [{
			key: 'close',
			value: function close() {
				this.setState({
					show: !this.state.show
				});
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				var _this2 = this;

				// 延迟执行关闭,数据更新造成页面的重新render
				setTimeout(function () {
					_this2.props.destroy();
					_this2.flag && _this2.props.yes();
					_this2.flag = false;
				}, 500);
			}
		}, {
			key: 'yes',
			value: function yes() {
				this.close();
				this.flag = true;
			}
		}, {
			key: 'no',
			value: function no() {
				this.close();
				this.props.no();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var _props = this.props,
				    title = _props.title,
				    content = _props.content,
				    type = _props.type,
				    show = this.state.show;

				return _react2.default.createElement(
					_index2.default,
					{ handleClick: function handleClick(e) {
							if (e.target === _this3.mask) _this3.close();
						},
						refFunc: function refFunc(ref) {
							return _this3.mask = ref;
						}
					},
					_react2.default.createElement(
						'div',
						{ className: show ? 'layer' : 'layer-none' },
						_react2.default.createElement(
							'div',
							{ className: 'layer-title' },
							_react2.default.createElement(
								'span',
								null,
								title
							),
							_react2.default.createElement(_index4.default, {
								name: 'remove',
								handleClick: this.close.bind(this)
							})
						),
						_react2.default.createElement(
							'div',
							{ className: 'layer-content' },
							content
						),
						_react2.default.createElement(
							'div',
							{ className: 'layer-button-area' },
							_react2.default.createElement(_index6.default, { text: '\u786E\u8BA4', handleClick: this.yes.bind(this) }),
							type === 'alert' ? null : _react2.default.createElement(_index6.default, { text: '\u53D6\u6D88', handleClick: this.no.bind(this) })
						)
					)
				);
			}
		}]);

		return Layer;
	}(_react.Component);

	Layer.propTypes = {
		title: _react.PropTypes.string.isRequired,
		destroy: _react.PropTypes.func.isRequired,
		type: _react.PropTypes.string.isRequired
	};
	Layer.defaultProps = {
		title: '提示',
		type: 'alert',
		destroy: _utils.noop,
		yes: _utils.noop,
		no: _utils.noop
	};
	exports.default = Layer;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsCssTransitionGroup = __webpack_require__(14);

	var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

	var _utils = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Mask = function Mask(_ref) {
		var handleClick = _ref.handleClick,
		    children = _ref.children,
		    refFunc = _ref.refFunc;
		return _react2.default.createElement(
			_reactAddonsCssTransitionGroup2.default,
			{
				transitionName: 'mask',
				transitionEnterTimeout: 300,
				transitionLeaveTimeout: 500
			},
			_react2.default.createElement(
				'div',
				{ className: 'mask',
					onClick: handleClick,
					ref: function ref(_ref2) {
						return refFunc(_ref2);
					}
				},
				children
			)
		);
	};
	Mask.propTypes = {
		handleClick: _react.PropTypes.func.isRequired,
		refFunc: _react.PropTypes.func.isRequired
	};
	Mask.defaultProps = {
		handleClick: _utils.noop
	};

	exports.default = Mask;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("react-addons-css-transition-group");

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 * 利用localStroage进行数据存储
	 * 数据结构如下a：
	 * {
	 *    next_id: xxx,
	 *    items: {
	 *      '0': {
	 *          id: 0,
	 *          title: xxx,
	 *          status: 0,   // 0 未发布 1 发布中 -1 已经结束
	 *          questions: [
	 *             {
	 *                  type: xxx, 
	 *                  title: xxx,
	 *                  options: {
	 *                      '0': xxxx
	 *                 } 
	 *              }
	 *          ]
	 *       }
	 *    } 
	 * }
	 */
	var g;
	try {
	    g = window;
	} catch (e) {
	    g = global;
	}

	var Data = function () {
	    function Data() {
	        _classCallCheck(this, Data);

	        var data = this.readLocalStorage();
	        this.data = data == null ? Data.defaultData() : JSON.parse(data).data;
	    }

	    _createClass(Data, [{
	        key: 'readLocalStorage',
	        value: function readLocalStorage() {
	            return g.localStorage && g.localStorage.getItem('data');
	        }
	    }, {
	        key: 'writeLocalStroage',
	        value: function writeLocalStroage() {
	            g.localStorage && g.localStorage.setItem('data', JSON.stringify(this));
	        }
	    }, {
	        key: 'baseChange',
	        value: function baseChange(id, key, val) {
	            var data = this.data;

	            data.items[id][key] = val;
	            return data;
	        }
	    }, {
	        key: 'changeTitle',
	        value: function changeTitle(id, title) {
	            return this.baseChange(id, 'title', title);
	        }
	    }, {
	        key: 'changeDate',
	        value: function changeDate(id, date) {
	            return this.baseChange(id, 'date', date);
	        }
	    }, {
	        key: 'updateQuestions',
	        value: function updateQuestions(id, questions) {
	            return this.baseChange(id, 'questions', questions);
	        }
	    }, {
	        key: 'addItem',
	        value: function addItem(_ref) {
	            var title = _ref.title,
	                questions = _ref.questions,
	                status = _ref.status,
	                date = _ref.date;
	            var data = this.data,
	                item = {
	                title: title,
	                questions: questions,
	                status: status,
	                date: date,
	                id: data.next_id
	            };

	            data.items[data.next_id++] = item;
	            this.writeLocalStroage();
	            return data;
	        }
	    }, {
	        key: 'changeItem',
	        value: function changeItem(id, fn) {
	            var data = this.data;

	            fn(data);
	            this.writeLocalStroage();
	            // 需要变化data的引用,不然不能触发redux的自动更新
	            return clone(data);
	        }
	    }, {
	        key: 'delItem',
	        value: function delItem(id) {
	            return this.changeItem(id, function (_ref2) {
	                var items = _ref2.items;

	                delete items[id];
	            });
	        }
	    }, {
	        key: 'addQuestion',
	        value: function addQuestion(_ref3) {
	            var pid = _ref3.pid,
	                type = _ref3.type,
	                title = _ref3.title,
	                options = _ref3.options;
	            var data = this.data,
	                item = data[pid];
	        }
	    }, {
	        key: 'publishItem',
	        value: function publishItem(id) {
	            return this.changeItem(id, function (_ref4) {
	                var items = _ref4.items;

	                items[id].status = 1;
	            });
	        }
	    }, {
	        key: 'answerItem',
	        value: function answerItem(id, answers) {
	            var length = answers.length,
	                items = this.data.items,
	                questions = items[id].questions;

	            for (var i = 0; i < length; i++) {
	                Data.getAnswer[questions[i].type](answers[i], questions[i]);
	            }
	            this.writeLocalStroage();
	            return this.data;
	        }
	    }], [{
	        key: 'defaultData',
	        value: function defaultData() {
	            var data = Object.create(null);
	            data.next_id = 0;
	            data.items = Object.create(null);
	            return data;
	        }
	    }]);

	    return Data;
	}();

	Data.getAnswer = {
	    text: function text(answer, question) {
	        question.answers.push(answer.value);
	    },
	    radio: function radio(answer, question) {
	        question.options[answer.value].count++;
	    },
	    check: function check(answer, question) {
	        var arr = answer.value,
	            length = arr.length;

	        for (var i = 0; i < length; i++) {
	            question.options[arr[i]].count++;
	        }
	    }
	};


	var clone = function clone(obj) {
	    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return obj;
	    var flag = Array.isArray(obj),
	        res = flag ? [] : {};
	    if (flag) {
	        var len = obj.length;
	        for (var i = 0; i < len; i++) {
	            res[i] = _typeof(obj[i]) !== 'object' ? obj[i] : clone(obj[i]);
	        }
	    } else {
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                res[key] = _typeof(obj[key]) !== 'object' ? obj[key] : clone(obj[key]);
	            }
	        }
	    }
	    return res;
	};

	var utils = {
	    Data: new Data(),
	    getDays: function getDays(year, month) {
	        return new Date(year, month, 0).getDate();
	    },
	    getFirstDate: function getFirstDate(year, month) {
	        return new Date(year, month - 1, 1).getDay();
	    },
	    noop: function noop() {},
	    clone: clone,
	    getDomData: function getDomData(dom, val) {
	        return dom.getAttribute('data-' + val);
	    }
	};

	module.exports = utils;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = __webpack_require__(17);

	var _classnames3 = _interopRequireDefault(_classnames2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var Icon = function Icon(_ref) {
		var _classnames;

		var name = _ref.name,
		    handleClick = _ref.handleClick,
		    extendClass = _ref.extendClass,
		    other = _ref.other;

		var classes = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, extendClass, extendClass), _defineProperty(_classnames, 'icon-' + name, true), _classnames));
		return _react2.default.createElement('i', _extends({ className: classes }, other, {
			onClick: handleClick }));
	};
	Icon.propTypes = {
		name: _react.PropTypes.string.isRequired
	};

	exports.default = Icon;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = __webpack_require__(17);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _utils = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var classPrefix = "button";

	var Button = function Button(_ref) {
		var _classnames;

		var handleClick = _ref.handleClick,
		    text = _ref.text,
		    isActive = _ref.isActive,
		    isFixed = _ref.isFixed;

		var classes = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, classPrefix, true), _defineProperty(_classnames, classPrefix + '-fixed-width', isFixed), _defineProperty(_classnames, classPrefix + '-active', isActive), _classnames));
		return _react2.default.createElement(
			'button',
			{ onClick: handleClick, className: classes },
			text
		);
	};

	Button.propTypes = {
		handleClick: _react.PropTypes.func.isRequired,
		text: _react.PropTypes.string.isRequired,
		isActive: _react.PropTypes.bool,
		isFixed: _react.PropTypes.bool
	};

	Button.defaultProps = {
		handleClick: _utils.noop,
		isActive: false,
		isFixed: true
	};

	exports.default = Button;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = __webpack_require__(17);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _index = __webpack_require__(16);

	var _index2 = _interopRequireDefault(_index);

	var _utils = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var classPrefix = 'icon-button';

	var IconButton = function IconButton(_ref) {
		var _classnames;

		var handleClick = _ref.handleClick,
		    text = _ref.text,
		    icon = _ref.icon,
		    isActive = _ref.isActive;

		var classes = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, '' + classPrefix, true), _defineProperty(_classnames, classPrefix + '-active', isActive), _classnames));
		return _react2.default.createElement(
			'button',
			{ className: classes, onClick: handleClick },
			_react2.default.createElement(_index2.default, { name: icon }),
			text
		);
	};

	IconButton.propTypes = {
		text: _react.PropTypes.string.isRequired,
		icon: _react.PropTypes.string.isRequired,
		handleClick: _react.PropTypes.func.isRequired
	};

	IconButton.defaultProps = {
		handleClick: _utils.noop,
		isActive: false
	};

	exports.default = IconButton;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var config = {
		header: {
			icon: 'question-sign',
			title: '问卷管理',
			sm_title: '我的问卷'
		},
		tags: {
			title: '标题',
			date: '时间',
			status: '状态'
		},
		default_title: '这里是标题'
	};

	module.exports = config;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _reactRouter = __webpack_require__(7);

	var _items = __webpack_require__(11);

	var _config = __webpack_require__(20);

	var _config2 = _interopRequireDefault(_config);

	var _utils = __webpack_require__(15);

	var _index = __webpack_require__(12);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(16);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(22);

	var _index6 = _interopRequireDefault(_index5);

	var _index7 = __webpack_require__(18);

	var _index8 = _interopRequireDefault(_index7);

	var _IconButton = __webpack_require__(19);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Question = function (_Component) {
		_inherits(Question, _Component);

		_createClass(Question, null, [{
			key: 'defaultItem',
			value: function defaultItem() {
				var date = new Date();
				return {
					title: _config2.default.default_title,
					status: 0,
					questions: [],
					date: [date.getFullYear(), date.getMonth() + 1, date.getDate()]
				};
			}
		}, {
			key: 'defaultQuestion',
			value: function defaultQuestion(type, title) {
				var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

				var options = [];
				for (var i = 1; i <= count; i++) {
					options.push({
						val: '\u9009\u9879' + i,
						count: 0
					});
				}
				return { type: type, title: title, options: options };
			}
		}]);

		function Question(props) {
			_classCallCheck(this, Question);

			var _this = _possibleConstructorReturn(this, (Question.__proto__ || Object.getPrototypeOf(Question)).call(this, props));

			var question = props.question,
			    id = _this.props.params.id;

			_this.has = !!id;
			_this.state = _this.has ? (0, _utils.clone)(question) : Question.defaultItem();
			// 内部显示状态
			_this.state.area = false;
			_this.state.calendar = false;
			_this.state.activeInput = '';
			_this.state.layer = false;
			_this.state.layerConfig = {};
			return _this;
		}

		_createClass(Question, [{
			key: 'changeInnerState',
			value: function changeInnerState(key) {
				this.setState(_defineProperty({}, key, !this.state[key]));
			}
		}, {
			key: 'changeDate',
			value: function changeDate(date) {
				this.setState({ date: date });
				this.changeInnerState('calendar');
			}
		}, {
			key: 'inputBlur',
			value: function inputBlur() {
				this.setState({
					activeInput: ''
				});
			}
		}, {
			key: 'changeValue',
			value: function changeValue(type, e) {
				this.setState(_defineProperty({}, type, e.target.value));
			}
		}, {
			key: 'showInput',
			value: function showInput(val) {
				this.setState({
					activeInput: val
				});
			}
		}, {
			key: 'save',
			value: function save() {
				this.setState({
					layerConfig: {
						yes: function yes() {
							return _reactRouter.browserHistory.push('/');
						},
						content: '该问卷已经保存成功！'
					}
				});
				this.changeInnerState('layer');
				this.patch();
			}
		}, {
			key: 'publish',
			value: function publish() {
				var date = this.state.date;

				this.setState({
					layerConfig: {
						yes: function yes() {
							return _reactRouter.browserHistory.push('/');
						},
						content: '\u8BE5\u95EE\u5377\u5DF2\u7ECF\u53D1\u5E03\u6210\u529F\uFF0C\u622A\u6B62\u65E5\u671F\u4E3A' + date.join('-')
					}
				});
				this.changeInnerState('layer');
				this.state.status = 1;
				this.patch();
			}
		}, {
			key: 'patch',
			value: function patch() {
				// 新增问卷 不用diff
				var dispatch = this.props.dispatch;

				if (!this.has) {
					var _state = this.state,
					    questions = _state.questions,
					    status = _state.status,
					    date = _state.date,
					    title = _state.title;

					dispatch((0, _items.addItem)({
						questions: questions,
						status: status,
						date: date,
						title: title
					}));
				} else {
					var patches = this.diff(this.state),
					    len = patches.length;
					for (var i = 0; i < len; i++) {
						dispatch(patches[i]());
					}
					_utils.Data.writeLocalStroage();
				}
			}
		}, {
			key: 'diff',
			value: function diff(state) {
				var question = this.props.question,
				    patches = [],
				    id = state.id,
				    title = state.title,
				    date = state.date,
				    status = state.status,
				    questions = state.questions;

				if (question.title !== title) {
					patches.push(function () {
						return (0, _items.changeTitle)(id, title);
					});
				}
				if (question.date.join('') !== date.join('')) {
					patches.push(function () {
						return (0, _items.changeDate)(id, date);
					});
				}
				if (question.status !== status) {
					patches.push(function () {
						return (0, _items.publishItem)(id);
					});
				}
				// questions直接充值
				if (!(question.questions.length === 0 && questions.length === 0)) {
					patches.push(function () {
						return (0, _items.updateQuestions)(id, questions);
					});
				}
				return patches;
			}
		}, {
			key: 'addOption',
			value: function addOption(id) {
				var questions = this.state.questions,
				    options = questions[id].options;

				options.push({
					val: '\u9009\u9879' + (options.length + 1),
					count: 0
				});
				this.setState({ questions: questions });
			}
		}, {
			key: 'changeQuestionTitle',
			value: function changeQuestionTitle(e) {
				var _state2 = this.state,
				    activeInput = _state2.activeInput,
				    questions = _state2.questions,
				    value = e.target.value,
				    id = activeInput.split('-')[1];

				questions[id].title = value;
				this.setState({ questions: questions });
			}
		}, {
			key: 'changeOptionVal',
			value: function changeOptionVal(e) {
				var _state3 = this.state,
				    activeInput = _state3.activeInput,
				    questions = _state3.questions,
				    value = e.target.value,
				    data = activeInput.split('-');

				questions[data[1]].options[data[2]].val = value;
				this.setState({ questions: questions });
			}
		}, {
			key: 'delQuestionOption',
			value: function delQuestionOption(data) {
				var questions = this.state.questions;

				data = data.split('-').map(function (val) {
					return Number(val);
				});
				questions[data[0]].options.splice(data[1], 1);
				this.setState({ questions: questions });
			}
		}, {
			key: 'addQuestion',
			value: function addQuestion(type, title, count) {
				var questions = this.state.questions;

				questions.push(Question.defaultQuestion(type, title, count));
				this.setState({
					questions: questions,
					area: !this.state.area
				});
			}
		}, {
			key: 'addTextQuestion',
			value: function addTextQuestion() {
				var questions = this.state.questions;

				questions.push({
					type: 'text',
					title: '文本题',
					answers: [],
					isRequired: false
				});
				this.setState({
					questions: questions,
					area: !this.state.area
				});
			}
		}, {
			key: 'handleQuestion',
			value: function handleQuestion(fn) {
				var questions = this.state.questions;

				fn(questions);
				this.setState({ questions: questions });
			}
		}, {
			key: 'changeRequired',
			value: function changeRequired(id) {
				this.handleQuestion(function (arr) {
					var isRequired = arr[id].isRequired;

					arr[id].isRequired = !isRequired;
				});
			}
		}, {
			key: 'delQuestion',
			value: function delQuestion(id) {
				this.handleQuestion(function (arr) {
					return arr.splice(id, 1);
				});
			}
		}, {
			key: 'copyQuestion',
			value: function copyQuestion(id) {
				this.handleQuestion(function (arr) {
					return arr.splice(id, 0, (0, _utils.clone)(arr[id]));
				});
			}
		}, {
			key: 'bottomQuestion',
			value: function bottomQuestion(id) {
				this.handleQuestion(function (arr) {
					var temp = arr[id];
					arr[id] = arr[id + 1];
					arr[id + 1] = temp;
				});
			}
		}, {
			key: 'topQuestion',
			value: function topQuestion(id) {
				this.handleQuestion(function (arr) {
					var temp = arr[id];
					arr[id] = arr[id - 1];
					arr[id - 1] = temp;
				});
			}
			// 用代理节省内存空间

		}, {
			key: 'delegate',
			value: function delegate(e) {
				var className = e.target.className;

				var data;
				switch (className) {
					case 'one-question-title':
						data = (0, _utils.getDomData)(e.target, 'title');
						this.showInput('title-' + data);
						break;
					case 'option-remove icon-remove':
						data = (0, _utils.getDomData)(e.target.parentNode, 'option');
						this.delQuestionOption(data);
						break;
					case 'question-option':
						data = (0, _utils.getDomData)(e.target, 'option');
						this.showInput('title-' + data);
						break;
					case 'add-option':
					case 'add-option-icon icon-plus':
						data = (0, _utils.getDomData)(e.target, 'question') || (0, _utils.getDomData)(e.target.parentNode, 'question');
						this.addOption(data);
						break;
					case 'copy-question':
					case 'del-question':
					case 'top-question':
					case 'bottom-question':
						var type = className.split('-')[0];
						data = +(0, _utils.getDomData)(e.target.parentNode, 'id');
						this[type + 'Question'](data);
						break;
				}
			}
		}, {
			key: 'getOptionIcon',
			value: function getOptionIcon(type) {
				var name = type === 'radio' ? 'circle-blank' : 'check-empty';
				return _react2.default.createElement(_index4.default, { name: name, extendClass: 'option-icon' });
			}
		}, {
			key: 'getOptions',
			value: function getOptions(_ref, id) {
				var _this2 = this;

				var options = _ref.options,
				    type = _ref.type;
				var activeInput = this.state.activeInput;

				return _react2.default.createElement(
					'div',
					null,
					options.map(function (option, i) {
						return _react2.default.createElement(
							'p',
							{ key: i, className: 'question-option',
								'data-option': id + '-' + i
							},
							_this2.getOptionIcon(type),
							activeInput === 'title-' + id + '-' + i ? _react2.default.createElement('input', { type: 'text', autoFocus: true,
								value: option.val,
								onBlur: _this2.inputBlur.bind(_this2),
								onChange: _this2.changeOptionVal.bind(_this2),
								className: 'question-option-input' }) : option.val,
							_react2.default.createElement(_index4.default, { name: 'remove', extendClass: 'option-remove' })
						);
					})
				);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var _state4 = this.state,
				    title = _state4.title,
				    area = _state4.area,
				    date = _state4.date,
				    calendar = _state4.calendar,
				    activeInput = _state4.activeInput,
				    questions = _state4.questions,
				    layer = _state4.layer,
				    layerConfig = _state4.layerConfig;

				var len = questions.length - 1;
				return _react2.default.createElement(
					'div',
					{ className: 'question-container' },
					layer ? _react2.default.createElement(_index2.default, _extends({}, layerConfig, {
						destroy: function destroy() {
							_this3.changeInnerState('layer');
						}
					})) : null,
					_react2.default.createElement(
						'div',
						{ className: 'item-title', onClick: this.showInput.bind(this, 'title') },
						activeInput === 'title' ? _react2.default.createElement('input', { className: 'title title-input',
							autoFocus: true,
							type: 'text', value: title,
							onBlur: this.inputBlur.bind(this),
							onChange: this.changeValue.bind(this, 'title')
						}) : _react2.default.createElement(
							'h2',
							{ className: 'title' },
							title
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'questions-container', onClick: this.delegate.bind(this) },
						questions.map(function (val, i) {
							return _react2.default.createElement(
								'div',
								{ className: 'one-question', key: i },
								_react2.default.createElement(
									'h2',
									null,
									'Q',
									i + 1,
									activeInput === 'title-' + i ? _react2.default.createElement('input', { type: 'text',
										autoFocus: true,
										value: val.title,
										onBlur: _this3.inputBlur.bind(_this3),
										onChange: _this3.changeQuestionTitle.bind(_this3),
										className: 'question-title-input' }) : _react2.default.createElement(
										'span',
										{ className: 'one-question-title', 'data-title': i },
										val.title
									)
								),
								val.type === 'text' ? _react2.default.createElement(
									'div',
									null,
									_react2.default.createElement('textarea', { className: 'show-text-question' })
								) : _react2.default.createElement(
									'div',
									null,
									_this3.getOptions(val, i),
									_react2.default.createElement(
										'div',
										{ className: 'add-option', 'data-question': i },
										_react2.default.createElement(_index4.default, { name: 'plus', extendClass: 'add-option-icon' })
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'handle-area', 'data-id': i },
									val.type === "text" ? _react2.default.createElement(
										'span',
										{ className: 'choose-require' },
										_react2.default.createElement('input', { type: 'checkbox', checked: val.isRequired, onChange: _this3.changeRequired.bind(_this3, i) }),
										'\u6B64\u9898\u662F\u5426\u5FC5\u586B'
									) : null,
									i !== 0 ? _react2.default.createElement(
										'span',
										{ className: 'top-question' },
										'\u4E0A\u79FB'
									) : null,
									i !== len ? _react2.default.createElement(
										'span',
										{ className: 'bottom-question' },
										'\u4E0B\u79FB'
									) : null,
									_react2.default.createElement(
										'span',
										{ className: 'copy-question' },
										'\u590D\u7528'
									),
									_react2.default.createElement(
										'span',
										{ className: 'del-question' },
										'\u5220\u9664'
									)
								)
							);
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'add-question-container' },
						_react2.default.createElement(
							'div',
							{ className: 'question-type',
								style: area ? {
									height: "80px"
								} : {}
							},
							_react2.default.createElement(_IconButton2.default, { text: '\u5355\u9009',
								icon: 'circle-blank',
								handleClick: function handleClick() {
									return _this3.addQuestion('radio', '单选题');
								}
							}),
							_react2.default.createElement(_IconButton2.default, { text: '\u591A\u9009',
								icon: 'check',
								handleClick: function handleClick() {
									return _this3.addQuestion('check', '多选题', 4);
								}
							}),
							_react2.default.createElement(_IconButton2.default, { text: '\u6587\u672C', icon: 'list-alt',
								handleClick: this.addTextQuestion.bind(this)
							})
						),
						_react2.default.createElement(
							'div',
							{ className: 'add-question', onClick: this.changeInnerState.bind(this, 'area') },
							_react2.default.createElement(
								'span',
								null,
								_react2.default.createElement(_index4.default, { name: 'plus' }),
								'\u6DFB\u52A0\u95EE\u9898'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'button-area' },
						_react2.default.createElement(
							'div',
							{ className: 'date' },
							_react2.default.createElement(
								'label',
								null,
								'\u95EE\u5377\u622A\u6B62\u65E5\u671F\uFF1A'
							),
							_react2.default.createElement(
								'span',
								{ onClick: this.changeInnerState.bind(this, 'calendar') },
								date.join('-')
							)
						),
						_react2.default.createElement(_index8.default, { text: "发布问卷", isFixed: false, handleClick: this.publish.bind(this) }),
						_react2.default.createElement(_index8.default, { text: "保存问卷", isFixed: false, handleClick: this.save.bind(this) })
					),
					_react2.default.createElement(
						'div',
						{ className: 'calendar-area' },
						calendar ? _react2.default.createElement(_index6.default, { extendClass: 'question-calendar',
							date: date,
							handleClick: this.changeDate.bind(this)
						}) : null
					)
				);
			}
		}]);

		return Question;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
		return {
			item: state.item,
			question: state.question
		};
	};

	var DataQuestion = (0, _reactRedux.connect)(mapStateToProps)(Question);

	exports.default = DataQuestion;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = __webpack_require__(17);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _index = __webpack_require__(16);

	var _index2 = _interopRequireDefault(_index);

	var _utils = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var chinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
	    TDNUMBER = 42;

	var Calendar = function (_Component) {
		_inherits(Calendar, _Component);

		function Calendar(props) {
			_classCallCheck(this, Calendar);

			var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

			var date = props.date;

			_this.state = {
				year: +date[0],
				month: +(date[1] - 1),
				date: +date[2]
			};
			return _this;
		}

		_createClass(Calendar, [{
			key: 'addMonth',
			value: function addMonth() {
				var _state = this.state,
				    month = _state.month,
				    year = _state.year;

				month++;
				year += ~~(month / 12);
				month = month % 12;
				this.setState({
					year: year,
					month: month
				});
			}
		}, {
			key: 'subMonth',
			value: function subMonth() {
				var _state2 = this.state,
				    month = _state2.month,
				    year = _state2.year;

				var flag = month === 0;
				year -= +flag;
				month = flag ? 11 : month - 1;
				this.setState({
					year: year,
					month: month
				});
			}
		}, {
			key: 'getTds',
			value: function getTds(year, month, date) {
				var res = [],
				    realMonth = month + 1,
				    now = (0, _utils.getDays)(year, realMonth),
				    first = (0, _utils.getFirstDate)(year, realMonth),
				    after = TDNUMBER - now - first;
				var prev = (0, _utils.getDays)(year, month);
				for (var i = 0; i < first; i++) {
					res.unshift({
						val: prev--,
						status: -1
					});
				}
				for (var _i = 1; _i <= now; _i++) {
					res.push({
						val: _i,
						status: +(_i === date)
					});
				}
				for (var _i2 = 1; _i2 <= after; _i2++) {
					res.push({
						val: _i2,
						status: -1
					});
				}
				return res;
			}
		}, {
			key: 'burnDate',
			value: function burnDate(tds) {
				var res = [];
				for (var i = 0; i < 6; i++) {
					res.push(_react2.default.createElement(
						'tr',
						{ key: 'tr-' + i },
						this.burnTrs(tds, i * 7)
					));
				}
				return res;
			}
		}, {
			key: 'burnTrs',
			value: function burnTrs(tds, s) {
				var res = [];
				var i = 0;
				while (i++ < 7) {
					var data = tds[s],
					    classes = (0, _classnames3.default)({
						"disabled-td": data.status === -1,
						"active-td": data.status === 1
					});
					res.push(_react2.default.createElement(
						'td',
						{ key: 'td-' + s++, className: classes },
						data.val
					));
				}
				return res;
			}
		}, {
			key: 'changeDate',
			value: function changeDate(e) {
				var className = e.target.className,
				    date = +e.target.innerText;

				if (className === '') {
					this.setState({
						date: date
					});
					var handleClick = this.props.handleClick,
					    _state3 = this.state,
					    year = _state3.year,
					    month = _state3.month;

					handleClick([year, month + 1, date]);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _classnames;

				var _props = this.props,
				    extendClass = _props.extendClass,
				    handleClick = _props.handleClick,
				    _state4 = this.state,
				    year = _state4.year,
				    month = _state4.month,
				    date = _state4.date,
				    classes = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, extendClass, extendClass), _defineProperty(_classnames, 'calendar', true), _classnames)),
				    tds = this.getTds(year, month, date);

				return _react2.default.createElement(
					'div',
					{ className: classes },
					_react2.default.createElement(
						'div',
						{ className: 'calendar-title' },
						_react2.default.createElement(
							'span',
							{ onClick: this.subMonth.bind(this) },
							_react2.default.createElement(_index2.default, { name: 'caret-left' })
						),
						_react2.default.createElement(
							'span',
							null,
							year,
							'\u5E74 ',
							chinese[month],
							'\u6708'
						),
						_react2.default.createElement(
							'span',
							{ onClick: this.addMonth.bind(this) },
							_react2.default.createElement(_index2.default, { name: 'caret-right' })
						)
					),
					_react2.default.createElement(
						'table',
						null,
						_react2.default.createElement(
							'thead',
							null,
							_react2.default.createElement(
								'tr',
								{ className: 'calendar-day' },
								['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(function (val, i) {
									return _react2.default.createElement(
										'th',
										{ key: i },
										val
									);
								})
							)
						),
						_react2.default.createElement(
							'tbody',
							{ className: 'calendar-date', onClick: this.changeDate.bind(this) },
							this.burnDate(tds)
						)
					)
				);
			}
		}]);

		return Calendar;
	}(_react.Component);

	Calendar.propTypes = {
		handleClick: _react.PropTypes.func
	};
	Calendar.defaultProps = {
		handleClick: _utils.noop
	};
	exports.default = Calendar;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _reactRouter = __webpack_require__(7);

	var _items = __webpack_require__(11);

	var _utils = __webpack_require__(15);

	var _index = __webpack_require__(18);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(12);

	var _index4 = _interopRequireDefault(_index3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Answer = function (_Component) {
		_inherits(Answer, _Component);

		function Answer(props) {
			_classCallCheck(this, Answer);

			var _this = _possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).call(this, props));

			var id = props.params.id,
			    _props$data = props.data,
			    questions = _props$data.questions,
			    status = _props$data.status;

			_this.id = id;
			if (status !== 1) {
				_reactRouter.browserHistory.push('/');
			}
			var length = questions.length,
			    answers = [];

			for (var i = 0; i < length; i++) {
				var type = questions[i].type,
				    required = type === 'text' ? questions[i].isRequired : true,
				    value = type === "check" ? [] : '';

				answers.push({
					value: value,
					required: required
				});
			}
			_this.state = {
				answers: answers,
				layer: false,
				layerConfig: {}
			};
			return _this;
		}

		_createClass(Answer, [{
			key: 'changeValue',
			value: function changeValue(e) {
				var _e$target = e.target,
				    value = _e$target.value,
				    type = _e$target.type,
				    checked = _e$target.checked,
				    answers = this.state.answers,
				    id = (0, _utils.getDomData)(e.target, 'id');

				value = isNaN(Number(value)) ? value : Number(value);
				if (type === 'checkbox') {
					var arr = answers[id].value;
					if (checked && arr.indexOf(value) === -1) {
						arr.push(value);
					} else {
						arr = arr.filter(function (i) {
							return i !== value;
						});
					}
					answers[id].value = arr;
				} else {
					answers[id].value = value;
				}
				this.setState({ answers: answers });
			}
		}, {
			key: 'submit',
			value: function submit() {
				var answers = this.state.answers,
				    length = answers.length;

				for (var i = 0; i < length; i++) {
					if (answers[i].required && String(answers[i].value) === '') {
						break;
					}
				}
				if (i !== length) {
					this.showLayer({
						content: 'Q' + (i + 1) + '\u4E3A\u5FC5\u586B\u9898\uFF0C\u8BF7\u586B\u5199\uFF01'
					});
				} else {
					var dispatch = this.props.dispatch;

					dispatch((0, _items.answerItem)(this.id, answers));
					this.showLayer({
						content: '\u63D0\u4EA4\u6210\u529F\uFF01',
						yes: function yes() {
							return _reactRouter.browserHistory.push('/');
						}
					});
				}
			}
		}, {
			key: 'showLayer',
			value: function showLayer(config) {
				this.setState({
					layer: true,
					layerConfig: _extends({}, config)
				});
			}
		}, {
			key: 'hideLayer',
			value: function hideLayer() {
				this.setState({
					layer: false,
					layerConfig: {}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props$data2 = this.props.data,
				    title = _props$data2.title,
				    questions = _props$data2.questions,
				    _state = this.state,
				    answers = _state.answers,
				    layer = _state.layer,
				    layerConfig = _state.layerConfig;

				return _react2.default.createElement(
					'div',
					{ className: 'index-container' },
					layer ? _react2.default.createElement(_index4.default, _extends({}, layerConfig, {
						destroy: this.hideLayer.bind(this)
					})) : null,
					_react2.default.createElement(
						'div',
						{ className: 'item-title' },
						_react2.default.createElement(
							'h2',
							{ className: 'title' },
							title
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'questions-container' },
						questions.map(function (val, i) {
							return _react2.default.createElement(
								'div',
								{ className: 'one-question', key: i },
								_react2.default.createElement(
									'h2',
									null,
									'Q',
									i + 1,
									_react2.default.createElement(
										'span',
										{ className: 'one-question-title' },
										val.title
									)
								),
								val.type === 'text' ? _react2.default.createElement(
									'div',
									null,
									_react2.default.createElement('textarea', {
										className: 'show-text-question',
										placeholder: '\u8BF7\u8F93\u5165\u60A8\u7684\u56DE\u7B54',
										value: answers[i].value,
										'data-id': i,
										onChange: _this2.changeValue.bind(_this2)
									})
								) : _react2.default.createElement(
									'div',
									null,
									val.options.map(function (option, index) {
										return _react2.default.createElement(
											'p',
											{ key: index, className: 'question-option' },
											val.type === "radio" ? _react2.default.createElement('input', { type: 'radio',
												className: 'radio-input',
												value: index,
												'data-id': i,
												checked: answers[i].value === index,
												onChange: _this2.changeValue.bind(_this2)
											}) : _react2.default.createElement('input', { type: 'checkbox',
												className: 'radio-input',
												value: index,
												'data-id': i,
												checked: answers[i].value.indexOf(index) !== -1,
												onChange: _this2.changeValue.bind(_this2) }),
											option.val
										);
									})
								)
							);
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'submit-answer' },
						_react2.default.createElement(_index2.default, { text: '\u63D0\u4EA4', isFixed: false, handleClick: this.submit.bind(this) })
					)
				);
			}
		}]);

		return Answer;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
		return {
			data: state.question
		};
	};

	var DataAnswer = (0, _reactRedux.connect)(mapStateToProps)(Answer);

	exports.default = DataAnswer;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _redux = __webpack_require__(4);

	var _item = __webpack_require__(25);

	var _item2 = _interopRequireDefault(_item);

	var _question = __webpack_require__(26);

	var _question2 = _interopRequireDefault(_question);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var data = (0, _redux.combineReducers)({
		item: _item2.default,
		question: _question2.default
	});

	exports.default = data;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _utils = __webpack_require__(15);

	var item = function item() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _utils.Data.data;
		var action = arguments[1];

		switch (action.type) {
			case 'ADD_ITEM':
				return _utils.Data.addItem(action.info);
			case 'DEL_ITEM':
				return _utils.Data.delItem(action.id);
			case 'CHANGE_TITLE':
				return _utils.Data.changeTitle(action.id, action.title);
			case 'CHANGE_DATE':
				return _utils.Data.changeDate(action.id, action.date);
			case 'PUBLISH_ITEM':
				return _utils.Data.publishItem(action.id);
			case 'UPDATE_QUESTIONS':
				return _utils.Data.updateQuestions(action.id, action.questions);
			case 'ANSWER_ITEM':
				return _utils.Data.answerItem(action.id, action.answers);
			default:
				return state;
		}
	};

	exports.default = item;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _utils = __webpack_require__(15);

	var numberRE = /\/(\d+)$/;

	var defaultState = function defaultState() {
		try {
			var _location = location,
			    href = _location.href;
		} catch (e) {
			href = '';
		}
		var matches = href.match(numberRE),
		    id = matches && matches[1];
		return id == null ? Object.create(null) : _utils.Data.data.items[id];
	};

	var question = function question() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState();
		var action = arguments[1];

		switch (action.type) {
			case 'ADD_QUESTION':
				return _utils.Data.addQuestion(action.type);
			case 'TOGGLE_ITEM':
				return _utils.Data.data.items[action.id];
			default:
				return state;
		}
	};

	exports.default = question;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(7);

	var _index = __webpack_require__(16);

	var _index2 = _interopRequireDefault(_index);

	var _config = __webpack_require__(20);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toIndex(e) {
	    e.preventDefault();
	    _reactRouter.browserHistory.push('/');
	}

	var Header = function Header() {
	    var _config$header = _config2.default.header,
	        icon = _config$header.icon,
	        title = _config$header.title,
	        sm_title = _config$header.sm_title;

	    return _react2.default.createElement(
	        'header',
	        { className: 'header' },
	        _react2.default.createElement(
	            'strong',
	            { className: 'header-title' },
	            _react2.default.createElement(_index2.default, { name: icon }),
	            title
	        ),
	        _react2.default.createElement(
	            'a',
	            { className: 'sm-title', onClick: toIndex },
	            sm_title
	        )
	    );
	};

	exports.default = Header;

/***/ }
/******/ ]);