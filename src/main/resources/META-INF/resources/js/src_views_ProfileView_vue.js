"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksmart_flashcards"] = self["webpackChunksmart_flashcards"] || []).push([["src_views_ProfileView_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/ErrorBox.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/ErrorBox.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'LoginError',\n  props: {\n    msg: String\n  }\n});\n\n//# sourceURL=webpack://smart-flashcards/./src/components/ErrorBox.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/ProfileView.vue?vue&type=script&setup=true&lang=js":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/ProfileView.vue?vue&type=script&setup=true&lang=js ***!
  \***************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ \"./node_modules/core-js/modules/es.array.push.js\");\n/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.url-search-params.delete.js */ \"./node_modules/core-js/modules/web.url-search-params.delete.js\");\n/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.url-search-params.has.js */ \"./node_modules/core-js/modules/web.url-search-params.has.js\");\n/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.url-search-params.size.js */ \"./node_modules/core-js/modules/web.url-search-params.size.js\");\n/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/router */ \"./src/router/index.js\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/user */ \"./src/user.js\");\n/* harmony import */ var _components_ErrorBox_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/ErrorBox.vue */ \"./src/components/ErrorBox.vue\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils */ \"./src/utils.js\");\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  __name: 'ProfileView',\n  setup(__props, {\n    expose: __expose\n  }) {\n    __expose();\n    const oldUsername = (0,vue__WEBPACK_IMPORTED_MODULE_5__.ref)('');\n    const newUsername = (0,vue__WEBPACK_IMPORTED_MODULE_5__.ref)('');\n    const oldPassword = (0,vue__WEBPACK_IMPORTED_MODULE_5__.ref)('');\n    const newPassword = (0,vue__WEBPACK_IMPORTED_MODULE_5__.ref)('');\n    const loginFail = (0,vue__WEBPACK_IMPORTED_MODULE_5__.ref)(false);\n    (0,vue__WEBPACK_IMPORTED_MODULE_5__.onBeforeMount)(() => {\n      getUsername();\n    });\n    const getUsername = async function () {\n      const response = await fetch(\"/api/user\", {\n        method: 'GET'\n      });\n      if (response.status === 401) {\n        _router__WEBPACK_IMPORTED_MODULE_4__[\"default\"].push('/login');\n        return '';\n      }\n      if (response.status === 403) {\n        alert(\"You don't have the permission to access this resource!\");\n        _router__WEBPACK_IMPORTED_MODULE_4__[\"default\"].push('/login');\n        return '';\n      }\n      response.text().then(text => {\n        oldUsername.value = text;\n        newUsername.value = text;\n      });\n    };\n    const sendProfileUpdate = async function () {\n      const formElement = document.querySelector('#profileForm');\n      const formData = new URLSearchParams(new FormData(formElement));\n      if (await (0,_user__WEBPACK_IMPORTED_MODULE_6__.sendLoginRequest)(formData)) {\n        loginFail.value = false;\n        const r_changeUser = await fetch('/api/user', {\n          method: 'PUT',\n          headers: {\n            \"Content-Type\": \"application/json\"\n          },\n          body: JSON.stringify({\n            oldUsername: oldUsername.value,\n            newUsername: newUsername.value,\n            newPassword: newPassword.value\n          })\n        });\n        if (!r_changeUser.ok) {\n          console.log('nooo');\n        }\n      } else {\n        loginFail.value = true;\n        const errorElement = document.querySelector('.error');\n        if (errorElement) {\n          (0,_utils__WEBPACK_IMPORTED_MODULE_8__.restartAnimation)(errorElement);\n        }\n      }\n    };\n    const __returned__ = {\n      oldUsername,\n      newUsername,\n      oldPassword,\n      newPassword,\n      loginFail,\n      getUsername,\n      sendProfileUpdate,\n      get router() {\n        return _router__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\n      },\n      ref: vue__WEBPACK_IMPORTED_MODULE_5__.ref,\n      onBeforeMount: vue__WEBPACK_IMPORTED_MODULE_5__.onBeforeMount,\n      get sendLoginRequest() {\n        return _user__WEBPACK_IMPORTED_MODULE_6__.sendLoginRequest;\n      },\n      LoginError: _components_ErrorBox_vue__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n      get restartAnimation() {\n        return _utils__WEBPACK_IMPORTED_MODULE_8__.restartAnimation;\n      }\n    };\n    Object.defineProperty(__returned__, '__isScriptSetup', {\n      enumerable: false,\n      value: true\n    });\n    return __returned__;\n  }\n});\n\n//# sourceURL=webpack://smart-flashcards/./src/views/ProfileView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/ErrorBox.vue?vue&type=template&id=3aecad53":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/ErrorBox.vue?vue&type=template&id=3aecad53 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  class: \"error errorAnim\"\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.msg), 1 /* TEXT */)]);\n}\n\n//# sourceURL=webpack://smart-flashcards/./src/components/ErrorBox.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/ProfileView.vue?vue&type=template&id=59f8aca4":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/ProfileView.vue?vue&type=template&id=59f8aca4 ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  class: \"profile\"\n};\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h1\", null, \"Profil\", -1 /* HOISTED */);\nconst _hoisted_3 = [\"onSubmit\"];\nconst _hoisted_4 = [\"value\"];\nconst _hoisted_5 = [\"value\"];\nconst _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  type: \"submit\",\n  class: \"onlyoutlinebtn borderblue w50p\"\n}, \"Profil aktualisieren\", -1 /* HOISTED */);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [_hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"form\", {\n    id: \"profileForm\",\n    onSubmit: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($setup.sendProfileUpdate, [\"prevent\"])\n  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    type: \"text\",\n    name: \"username\",\n    placeholder: \"Benutzername\",\n    value: $setup.newUsername\n  }, null, 8 /* PROPS */, _hoisted_4), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    type: \"hidden\",\n    name: \"login_username\",\n    value: $setup.oldUsername\n  }, null, 8 /* PROPS */, _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    type: \"password\",\n    name: \"login_password\",\n    placeholder: \"Altes Passwort\",\n    \"onUpdate:modelValue\": _cache[0] || (_cache[0] = $event => $setup.oldPassword = $event)\n  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.oldPassword]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    type: \"password\",\n    name: \"newpassword\",\n    placeholder: \"Neues Passwort\",\n    \"onUpdate:modelValue\": _cache[1] || (_cache[1] = $event => $setup.newPassword = $event)\n  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.newPassword]]), _hoisted_6], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_3), $setup.loginFail ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup[\"LoginError\"], {\n    key: 0,\n    msg: \"Aktuelles Passwort falsch!\"\n  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]);\n}\n\n//# sourceURL=webpack://smart-flashcards/./src/views/ProfileView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./src/user.js":
/*!*********************!*\
  !*** ./src/user.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendLoginRequest: function() { return /* binding */ sendLoginRequest; }\n/* harmony export */ });\nasync function sendLoginRequest(urlFormData) {\n  const response = await fetch(\"/auth\", {\n    method: 'post',\n    body: urlFormData\n  });\n  return response.ok;\n}\n\n//# sourceURL=webpack://smart-flashcards/./src/user.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ \"./node_modules/core-js/internals/to-string-tag-support.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar classofRaw = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar $Object = Object;\n\n// ES3 wrong here\nvar CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';\n\n// fallback for IE11 Script Access Denied error\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (error) { /* empty */ }\n};\n\n// getting tag from ES6+ `Object.prototype.toString`\nmodule.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {\n  var O, tag, result;\n  return it === undefined ? 'Undefined' : it === null ? 'Null'\n    // @@toStringTag case\n    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag\n    // builtinTag case\n    : CORRECT_ARGUMENTS ? classofRaw(O)\n    // ES3 arguments fallback\n    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;\n};\n\n\n//# sourceURL=webpack://smart-flashcards/./node_modules/core-js/internals/classof.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/define-built-in-accessor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/define-built-in-accessor.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ \"./node_modules/core-js/internals/make-built-in.js\");\nvar defineProperty = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\n\nmodule.exports = function (target, name, descriptor) {\n  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });\n  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });\n  return defineProperty.f(target, name, descriptor);\n};\n\n\n//# sourceURL=webpack://smart-flashcards/./node_modules/core-js/internals/define-built-in-accessor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar test = {};\n\ntest[TO_STRING_TAG] = 'z';\n\nmodule.exports = String(test) === '[object z]';\n\n\n//# sourceURL=webpack://smart-flashcards/./node_modules/core-js/internals/to-string-tag-support.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-string.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js/internals/classof.js\");\n\nvar $String = String;\n\nmodule.exports = function (argument) {\n  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');\n  return $String(argument);\n};\n\n\n//# sourceURL=webpack://smart-flashcards/./node_modules/core-js/internals/to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/validate-arguments-length.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/validate-arguments-length.js ***!
  \*********************************************************************/
/***/ (function(module) {

eval("\nvar $TypeError = TypeError;\n\nmodule.exports = function (passed, required) {\n  if (passed < required) throw $TypeError('Not enough arguments');\n  return passed;\n};\n\n\n//# sourceURL=webpack://smart-flashcards/./node_modules/core-js/internals/validate-arguments-length.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/web.url-search-params.delete.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.url-search-params.delete.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js/internals/define-built-in.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js/internals/to-string.js\");\nvar validateArgumentsLength = __webpack_require__(/*! ../internals/validate-arguments-length */ \"./node_modules/core-js/internals/validate-arguments-length.js\");\n\nvar $URLSearchParams = URLSearchParams;\nvar URLSearchParamsPrototype = $URLSearchParams.prototype;\nvar append = uncurryThis(URLSearchParamsPrototype.append);\nvar $delete = uncurryThis(URLSearchParamsPrototype['delete']);\nvar forEach = uncurryThis(URLSearchParamsPrototype.forEach);\nvar push = uncurryThis([].push);\nvar params = new $URLSearchParams('a=1&a=2&b=3');\n\nparams['delete']('a', 1);\n// `undefined` case is a Chromium 117 bug\n// https://bugs.chromium.org/p/v8/issues/detail?id=14222\nparams['delete']('b', undefined);\n\nif (params + '' !== 'a=2') {\n  defineBuiltIn(URLSearchParamsPrototype, 'delete', function (name /* , value */) {\n    var length = arguments.length;\n    var $value = length < 2 ? undefined : arguments[1];\n    if (length && $value === undefined) return $delete(this, name);\n    var entries = [];\n    forEach(this, function (v, k) { // also validates `this`\n      push(entries, { key: k, value: v });\n    });\n    validateArgumentsLength(length, 1);\n    var key = toString(name);\n    var value = toString($value);\n    var index = 0;\n    var dindex = 0;\n    var found = false;\n    var entriesLength = entries.length;\n    var entry;\n    while (index < entriesLength) {\n      entry = entries[index++];\n      if (found || entry.key === key) {\n        found = true;\n        $delete(this, entry.key);\n      } else dindex++;\n    }\n    while (dindex < entriesLength) {\n      entry = entries[dindex++];\n      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);\n    }\n  }, { enumerable: true, unsafe: true });\n}\n\n\n//# sourceURL=webpack://smart-flashcards/./node_modules/core-js/modules/web.url-search-params.delete.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/web.url-search-params.has.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/web.url-search-params.has.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js/internals/define-built-in.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js/internals/to-string.js\");\nvar validateArgumentsLength = __webpack_require__(/*! ../internals/validate-arguments-length */ \"./node_modules/core-js/internals/validate-arguments-length.js\");\n\nvar $URLSearchParams = URLSearchParams;\nvar URLSearchParamsPrototype = $URLSearchParams.prototype;\nvar getAll = uncurryThis(URLSearchParamsPrototype.getAll);\nvar $has = uncurryThis(URLSearchParamsPrototype.has);\nvar params = new $URLSearchParams('a=1');\n\n// `undefined` case is a Chromium 117 bug\n// https://bugs.chromium.org/p/v8/issues/detail?id=14222\nif (params.has('a', 2) || !params.has('a', undefined)) {\n  defineBuiltIn(URLSearchParamsPrototype, 'has', function has(name /* , value */) {\n    var length = arguments.length;\n    var $value = length < 2 ? undefined : arguments[1];\n    if (length && $value === undefined) return $has(this, name);\n    var values = getAll(this, name); // also validates `this`\n    validateArgumentsLength(length, 1);\n    var value = toString($value);\n    var index = 0;\n    while (index < values.length) {\n      if (values[index++] === value) return true;\n    } return false;\n  }, { enumerable: true, unsafe: true });\n}\n\n\n//# sourceURL=webpack://smart-flashcards/./node_modules/core-js/modules/web.url-search-params.has.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/web.url-search-params.size.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.url-search-params.size.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ \"./node_modules/core-js/internals/define-built-in-accessor.js\");\n\nvar URLSearchParamsPrototype = URLSearchParams.prototype;\nvar forEach = uncurryThis(URLSearchParamsPrototype.forEach);\n\n// `URLSearchParams.prototype.size` getter\n// https://github.com/whatwg/url/pull/734\nif (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {\n  defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {\n    get: function size() {\n      var count = 0;\n      forEach(this, function () { count++; });\n      return count;\n    },\n    configurable: true,\n    enumerable: true\n  });\n}\n\n\n//# sourceURL=webpack://smart-flashcards/./node_modules/core-js/modules/web.url-search-params.size.js?");

/***/ }),

/***/ "./src/components/ErrorBox.vue":
/*!*************************************!*\
  !*** ./src/components/ErrorBox.vue ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ErrorBox_vue_vue_type_template_id_3aecad53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ErrorBox.vue?vue&type=template&id=3aecad53 */ \"./src/components/ErrorBox.vue?vue&type=template&id=3aecad53\");\n/* harmony import */ var _ErrorBox_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorBox.vue?vue&type=script&lang=js */ \"./src/components/ErrorBox.vue?vue&type=script&lang=js\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_ErrorBox_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_ErrorBox_vue_vue_type_template_id_3aecad53__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/ErrorBox.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://smart-flashcards/./src/components/ErrorBox.vue?");

/***/ }),

/***/ "./src/views/ProfileView.vue":
/*!***********************************!*\
  !*** ./src/views/ProfileView.vue ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ProfileView_vue_vue_type_template_id_59f8aca4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProfileView.vue?vue&type=template&id=59f8aca4 */ \"./src/views/ProfileView.vue?vue&type=template&id=59f8aca4\");\n/* harmony import */ var _ProfileView_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProfileView.vue?vue&type=script&setup=true&lang=js */ \"./src/views/ProfileView.vue?vue&type=script&setup=true&lang=js\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_ProfileView_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_ProfileView_vue_vue_type_template_id_59f8aca4__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/views/ProfileView.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://smart-flashcards/./src/views/ProfileView.vue?");

/***/ }),

/***/ "./src/components/ErrorBox.vue?vue&type=script&lang=js":
/*!*************************************************************!*\
  !*** ./src/components/ErrorBox.vue?vue&type=script&lang=js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ErrorBox_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ErrorBox_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ErrorBox.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/ErrorBox.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://smart-flashcards/./src/components/ErrorBox.vue?");

/***/ }),

/***/ "./src/views/ProfileView.vue?vue&type=script&setup=true&lang=js":
/*!**********************************************************************!*\
  !*** ./src/views/ProfileView.vue?vue&type=script&setup=true&lang=js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileView_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileView_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileView.vue?vue&type=script&setup=true&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/ProfileView.vue?vue&type=script&setup=true&lang=js\");\n \n\n//# sourceURL=webpack://smart-flashcards/./src/views/ProfileView.vue?");

/***/ }),

/***/ "./src/components/ErrorBox.vue?vue&type=template&id=3aecad53":
/*!*******************************************************************!*\
  !*** ./src/components/ErrorBox.vue?vue&type=template&id=3aecad53 ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ErrorBox_vue_vue_type_template_id_3aecad53__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ErrorBox_vue_vue_type_template_id_3aecad53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ErrorBox.vue?vue&type=template&id=3aecad53 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/ErrorBox.vue?vue&type=template&id=3aecad53\");\n\n\n//# sourceURL=webpack://smart-flashcards/./src/components/ErrorBox.vue?");

/***/ }),

/***/ "./src/views/ProfileView.vue?vue&type=template&id=59f8aca4":
/*!*****************************************************************!*\
  !*** ./src/views/ProfileView.vue?vue&type=template&id=59f8aca4 ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileView_vue_vue_type_template_id_59f8aca4__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileView_vue_vue_type_template_id_59f8aca4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileView.vue?vue&type=template&id=59f8aca4 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/ProfileView.vue?vue&type=template&id=59f8aca4\");\n\n\n//# sourceURL=webpack://smart-flashcards/./src/views/ProfileView.vue?");

/***/ })

}]);