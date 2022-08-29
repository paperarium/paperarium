"use strict";
exports.__esModule = true;
/*
 * index.ts
 * author: evan kirkiles
 * created on Sun Aug 28 2022
 * 2022 the nobot space,
 */
var serverlessExpress = require("@vendia/serverless-express");
var app_1 = require("./app");
// serve the express app
exports.handler = serverlessExpress({ app: app_1["default"] });
