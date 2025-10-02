"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fsowmiya%2FRenter%2FRenter%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsowmiya%2FRenter%2FRenter&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fsowmiya%2FRenter%2FRenter%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsowmiya%2FRenter%2FRenter&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_sowmiya_Renter_Renter_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/sowmiya/Renter/Renter/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_sowmiya_Renter_Renter_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnNvd21peWElMkZSZW50ZXIlMkZSZW50ZXIlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGc293bWl5YSUyRlJlbnRlciUyRlJlbnRlciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDZ0I7QUFDN0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZW50ZXIvPzJmZGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3Nvd21peWEvUmVudGVyL1JlbnRlci9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvc293bWl5YS9SZW50ZXIvUmVudGVyL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fsowmiya%2FRenter%2FRenter%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsowmiya%2FRenter%2FRenter&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFnQztBQUNRO0FBRXhDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTSIsInNvdXJjZXMiOlsid2VicGFjazovL3JlbnRlci8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: \"your-google-client-id\",\n            clientSecret: \"your-google-client-secret\"\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                try {\n                    const user = await _prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                        where: {\n                            email: credentials.email\n                        }\n                    });\n                    if (!user || !user.passwordHash) {\n                        return null;\n                    }\n                    const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.passwordHash);\n                    if (!isPasswordValid) {\n                        return null;\n                    }\n                    return {\n                        id: user.id,\n                        email: user.email,\n                        name: user.name,\n                        role: user.role\n                    };\n                } catch (error) {\n                    console.error(\"Auth error:\", error);\n                    return null;\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account, profile }) {\n            if (account?.provider === \"google\") {\n                try {\n                    const existingUser = await _prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                        where: {\n                            email: user.email\n                        }\n                    });\n                    if (!existingUser) {\n                        await _prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.create({\n                            data: {\n                                name: user.name,\n                                email: user.email,\n                                googleId: account.providerAccountId,\n                                role: \"USER\",\n                                emailVerified: new Date()\n                            }\n                        });\n                    } else if (!existingUser.googleId) {\n                        await _prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.update({\n                            where: {\n                                id: existingUser.id\n                            },\n                            data: {\n                                googleId: account.providerAccountId\n                            }\n                        });\n                    }\n                } catch (error) {\n                    console.error(\"Error during Google sign-in:\", error);\n                    return false;\n                }\n            }\n            return true;\n        },\n        async jwt ({ token, user, account }) {\n            if (user) {\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.sub;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/signin\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    jwt: {\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: \"development-secret-key-for-local-testing-only\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDTSxFQUFFLEdBQUdrQixNQUFNRSxHQUFHO2dCQUMzQkQsUUFBUXpCLElBQUksQ0FBQ08sSUFBSSxHQUFHaUIsTUFBTWpCLElBQUk7WUFDaEM7WUFDQSxPQUFPa0I7UUFDVDtJQUNGO0lBQ0FFLE9BQU87UUFDTGhCLFFBQVE7SUFDVjtJQUNBYyxTQUFTO1FBQ1BHLFVBQVU7UUFDVkMsUUFBUSxLQUFLLEtBQUssS0FBSztJQUN6QjtJQUNBTixLQUFLO1FBQ0hNLFFBQVEsS0FBSyxLQUFLLEtBQUs7SUFDekI7SUFDQUMsUUFBUTFDLCtDQUEyQjtBQUNyQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVudGVyLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJ1xuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlJ1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcydcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJy4vcHJpc21hJ1xuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQhLFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCEsXG4gICAgfSksXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiAnY3JlZGVudGlhbHMnLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6ICdFbWFpbCcsIHR5cGU6ICdlbWFpbCcgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6ICdQYXNzd29yZCcsIHR5cGU6ICdwYXNzd29yZCcgfVxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGlmICghdXNlciB8fCAhdXNlci5wYXNzd29yZEhhc2gpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoXG4gICAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICAgIHVzZXIucGFzc3dvcmRIYXNoXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0F1dGggZXJyb3I6JywgZXJyb3IpXG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIHNpZ25Jbih7IHVzZXIsIGFjY291bnQsIHByb2ZpbGUgfSkge1xuICAgICAgaWYgKGFjY291bnQ/LnByb3ZpZGVyID09PSAnZ29vZ2xlJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IHVzZXIuZW1haWwhIH1cbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgaWYgKCFleGlzdGluZ1VzZXIpIHtcbiAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUhLFxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsISxcbiAgICAgICAgICAgICAgICBnb29nbGVJZDogYWNjb3VudC5wcm92aWRlckFjY291bnRJZCxcbiAgICAgICAgICAgICAgICByb2xlOiAnVVNFUicsXG4gICAgICAgICAgICAgICAgZW1haWxWZXJpZmllZDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgaWYgKCFleGlzdGluZ1VzZXIuZ29vZ2xlSWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZ1VzZXIuaWQgfSxcbiAgICAgICAgICAgICAgZGF0YTogeyBnb29nbGVJZDogYWNjb3VudC5wcm92aWRlckFjY291bnRJZCB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgR29vZ2xlIHNpZ24taW46JywgZXJyb3IpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSxcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciwgYWNjb3VudCB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uc3ViIVxuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGUgYXMgc3RyaW5nXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH1cbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46ICcvYXV0aC9zaWduaW4nLFxuICB9LFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6ICdqd3QnLFxuICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGRheXNcbiAgfSxcbiAgand0OiB7XG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn1cbiJdLCJuYW1lcyI6WyJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiR29vZ2xlUHJvdmlkZXIiLCJiY3J5cHQiLCJwcmlzbWEiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwicGFzc3dvcmRIYXNoIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlkIiwicm9sZSIsImVycm9yIiwiY29uc29sZSIsImNhbGxiYWNrcyIsInNpZ25JbiIsImFjY291bnQiLCJwcm9maWxlIiwicHJvdmlkZXIiLCJleGlzdGluZ1VzZXIiLCJjcmVhdGUiLCJkYXRhIiwiZ29vZ2xlSWQiLCJwcm92aWRlckFjY291bnRJZCIsImVtYWlsVmVyaWZpZWQiLCJEYXRlIiwidXBkYXRlIiwiand0IiwidG9rZW4iLCJzZXNzaW9uIiwic3ViIiwicGFnZXMiLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL3JlbnRlci8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fsowmiya%2FRenter%2FRenter%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsowmiya%2FRenter%2FRenter&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();