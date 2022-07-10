/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/list/data.js":
/*!**************************!*\
  !*** ./src/list/data.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  List : {
    protocol: 'list-rpc',
    ip: '127.0.0.1',
    port: 4003,
    protocolFile:  __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '/Users/tornado/code/node/nodejs-study/refact-less/workplace/src/list/protocol/test.proto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
    responseStruct: 'Response',
    requestStruct: 'Request',
    then: res => res 
  },
  ExtendInfo: {
    protocol: 'http',
    url: 'http://127.0.0.1:4002',
    then: res => res
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/list/data.js");
/******/ 	
/******/ })()
;