var Posc =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/http-client.ts
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function (url, args) {
        return this.getRequest(url, args).then(function (p) {
            return Object.assign({}, JSON.parse(HttpClient.toLowerKey(p)));
        });
    };
    HttpClient.prototype.getRequest = function (url, args) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
                }
                else {
                    reject(new Error(this.statusText));
                }
            };
            request.onerror = function () {
                reject(new Error('XMLHttpRequest Error: ' + this.statusText));
            };
            request.open('GET', url);
            if (args != null) {
                for (var arg in args) {
                    request.setRequestHeader(arg, args[arg]);
                }
            }
            request.send();
        });
    };
    HttpClient.toLowerKey = function (json) {
        return json.replace(/"([\w]+)":/g, function ($0, $1) {
            return ('"' + HttpClient.toFirstLowerCase($1) + '":');
        });
    };
    HttpClient.toFirstLowerCase = function (src) {
        return src.charAt(0).toLowerCase() + src.slice(1);
    };
    return HttpClient;
}());


// CONCATENATED MODULE: ./src/policy-store.ts

var policy_store_PolicyStore = /** @class */ (function () {
    function PolicyStore(httpClient) {
        this._http = httpClient != null ? httpClient : new HttpClient();
    }
    PolicyStore.prototype.getPolicy = function (url, cliendId, token) {
        return this._http.get(url + "?clientId=" + cliendId, {
            Authorization: 'Bearer ' + token
        });
    };
    return PolicyStore;
}());


// CONCATENATED MODULE: ./src/state-store.ts
var StateStore = /** @class */ (function () {
    function StateStore(args) {
        if (args === void 0) { args = { prefix: 'posc.', store: sessionStorage }; }
        this._prefix = args.prefix;
        this._store = args.store;
    }
    StateStore.prototype.set = function (key, value) {
        key = this._prefix + key;
        this._store.setItem(key, value);
        return Promise.resolve();
    };
    StateStore.prototype.get = function (key) {
        key = this._prefix + key;
        var item = this._store.getItem(key);
        return Promise.resolve(item);
    };
    StateStore.prototype.remove = function (key) {
        key = this._prefix + key;
        var item = this._store.getItem(key);
        this._store.removeItem(key);
        return Promise.resolve(item);
    };
    StateStore.prototype.getAllKeys = function () {
        var keys = [];
        for (var index = 0; index < this._store.length; index++) {
            var key = this._store.key(index);
            if (key.indexOf(this._prefix) === 0) {
                keys.push(key.substr(this._prefix.length));
            }
        }
        return Promise.resolve(keys);
    };
    return StateStore;
}());


// CONCATENATED MODULE: ./src/policy-mananger.ts



var policy_mananger_PolicyManager = /** @class */ (function () {
    function PolicyManager(settings) {
        this._http = new HttpClient();
        this._defaultSettings = {
            authority: undefined,
            requireHttpsMetadata: true,
            endpoints: {
                discovery: '.well-known/policy-configuration',
                permission: undefined,
                policy: undefined
            },
            policyStore: new policy_store_PolicyStore(this._http),
            stateStore: new StateStore()
        };
        this._loaded = false;
        this.settings = Object.assign(this._defaultSettings, settings);
    }
    PolicyManager.prototype.setToken = function (token) {
        this._token = token;
    };
    PolicyManager.prototype.removeToken = function () {
        this._token = null;
    };
    PolicyManager.prototype.getPolicy = function () {
        var _this = this;
        var key = "permision:" + this.settings.authority + ":" + this.settings.clientId;
        return this.getPermssionEndpoint().then(function (url) {
            return _this.settings.stateStore.get(key).then(function (strPermission) {
                var currentPermission = strPermission != null ? JSON.parse(strPermission) : null;
                var hasCacheData = currentPermission != null && new Date().getTime() <= (currentPermission.created + (currentPermission.expireIn * 1000));
                if (hasCacheData) {
                    return new Promise(function (r) { r(currentPermission); });
                }
                else {
                    return _this.settings.policyStore.getPolicy(url, _this.settings.clientId, _this._token).then(function (newPermssion) {
                        newPermssion.created = new Date().getTime();
                        _this.settings.stateStore.set(key, JSON.stringify(newPermssion));
                        return newPermssion;
                    });
                }
            });
        });
    };
    PolicyManager.prototype.removePolicy = function () {
        var key = "permision:" + this.settings.authority + ":" + this.settings.clientId;
        this.settings.stateStore.remove(key);
    };
    PolicyManager.prototype.getPermssionEndpoint = function () {
        var _this = this;
        if (this.settings.endpoints.permission != null) {
            return new Promise(function (r) { return r(_this.settings.endpoints.permission); });
        }
        return this._http.get(this.settings.authority + "/" + this.settings.endpoints.discovery).then(function (p) {
            _this.settings.endpoints.permission = p.permissionEndpoint;
            _this.settings.endpoints.policy = p.policyEndpoint;
            return p.permissionEndpoint;
        });
    };
    return PolicyManager;
}());


// CONCATENATED MODULE: ./index.ts
/* concated harmony reexport PolicyStore */__webpack_require__.d(__webpack_exports__, "PolicyStore", function() { return policy_store_PolicyStore; });
/* concated harmony reexport StateStore */__webpack_require__.d(__webpack_exports__, "StateStore", function() { return StateStore; });
/* concated harmony reexport PolicyManager */__webpack_require__.d(__webpack_exports__, "PolicyManager", function() { return policy_mananger_PolicyManager; });






/***/ })
/******/ ]);
//# sourceMappingURL=policy-server.js.map