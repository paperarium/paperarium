"use strict";
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* Amplify Params - DO NOT EDIT
    API_PAPERCRAFTCLUB_GRAPHQLAPIENDPOINTOUTPUT
    API_PAPERCRAFTCLUB_GRAPHQLAPIIDOUTPUT
    API_PAPERCRAFTCLUB_GRAPHQLAPIKEYOUTPUT
    AUTH_PAPERCRAFTCLUB783D8FAE_USERPOOLID
    ENV
    REGION
    STORAGE_PAPERCRAFTCLUBSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var serverless_express_1 = require("@vendia/serverless-express");
var createPapercraft_1 = require("./flows/createPapercraft");
// declare a new express app
var app = express();
var router = express.Router();
// apply middlewares, exposing the Cognito user to the request object
router.use(cors());
router.use(bodyParser.json());
/* -------------------------------------------------------------------------- */
/*                                  ENDPOINTS                                 */
/* -------------------------------------------------------------------------- */
/****************************
 * Cascading papercraft create method *
 ****************************/
router.post("/upload", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var event;
        return __generator(this, function (_a) {
            // guard statements for valid data
            if (!req.body)
                return [2 /*return*/, res.json({ success: false, error: "No request body!" })];
            event = (0, serverless_express_1.getCurrentInvoke)().event;
            // perform the cascading create
            (0, createPapercraft_1.createPapercraft)(event, req)
                .then(function (data) {
                res.json({
                    success: true,
                    data: {
                        papercraftID: data
                    }
                });
            })["catch"](function (err) {
                console.log(err);
                res.json({ success: false, error: err });
            });
            return [2 /*return*/];
        });
    });
});
/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
// use the router on all paths
app.use("/", router);
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
exports["default"] = app;
