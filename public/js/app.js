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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

new Vue({
  el: '#CRUD',
  created: function created() {
    this.getKeeps();
  },
  data: {
    keeps: [],
    newKeep: '',
    fillKeep: {
      id: '',
      keep: ''
    },
    pagination: {
      'total': 0,
      'current_page': 0,
      'per_page': 0,
      'last_page': 0,
      'from': 0,
      'to': 0
    },
    errors: [],
    offset: 3
  },
  computed: {
    isActived: function isActived() {
      return this.pagination.current_page;
    },
    pagesNumber: function pagesNumber() {
      if (!this.pagination.to) {
        return [];
      }

      var from = this.pagination.current_page - this.offset;

      if (from < 1) {
        from = 1;
      }

      var to = from + this.offset * 2;

      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }

      var pagesArray = [];

      while (from <= to) {
        pagesArray.push(from);
        from++;
      }

      return pagesArray;
    }
  },
  methods: {
    getKeeps: function getKeeps(page) {
      var _this = this;

      var urlKeeps = 'tasks?page=' + page;
      axios.get(urlKeeps).then(function (response) {
        _this.keeps = response.data.tasks.data, _this.pagination = response.data.pagination;
      });
    },
    editKeep: function editKeep(keep) {
      this.fillKeep.id = keep.id;
      this.fillKeep.keep = keep.keep;
      $('#edit').modal('show');
    },
    updateKeep: function updateKeep(id) {
      var _this2 = this;

      var url = 'tasks/' + id;
      axios.put(url, this.fillKeep).then(function (response) {
        _this2.getKeeps();

        _this2.fillKeep = {
          id: '',
          keep: ''
        };
        _this2.errors = [];
        $('#edit').modal('hide');
        toastr.success('Tarea actualizado con exito');
      }).catch(function (error) {
        _this2.errors = error.response.data;
      });
    },
    deleteKeep: function deleteKeep(keep) {
      var _this3 = this;

      var url = 'tasks/' + keep.id;
      axios.delete(url).then(function (response) {
        _this3.getKeeps();

        toastr.error('Eliminado correctamente');
      });
    },
    createKeep: function createKeep() {
      var _this4 = this;

      var url = 'tasks/';
      axios.post(url, {
        keep: this.newKeep
      }).then(function (response) {
        _this4.getKeeps();

        _this4.newKeep = '';
        _this4.errors = [];
        $('#create').modal('hide');
        toastr.success('Nueva tarea creada con exito');
      }).catch(function (error) {
        _this4.error = error.response.data;
      });
    },
    changePage: function changePage(page) {
      this.pagination.current_page = page;
      this.getKeeps(page);
    }
  }
});

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./resources/js/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\carum_000\Desktop\Cursos\vue.js\vue.js V2 Ribosoft\Laravel-Vue\resources\js\app.js */"./resources/js/app.js");


/***/ })

/******/ });