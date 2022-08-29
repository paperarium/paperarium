"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.createPapercraft = void 0;
/*
 * createPapercraft.ts
 * author: evan kirkiles
 * created on Sun Aug 28 2022
 * 2022 the nobot space,
 */
/* Amplify Params - DO NOT EDIT
    API_PAPERCRAFTCLUB_GRAPHQLAPIENDPOINTOUTPUT
    API_PAPERCRAFTCLUB_GRAPHQLAPIIDOUTPUT
    API_PAPERCRAFTCLUB_GRAPHQLAPIKEYOUTPUT
    AUTH_PAPERCRAFTCLUB783D8FAE_USERPOOLID
    ENV
    REGION
    STORAGE_PAPERCRAFTCLUBSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
var uuid_1 = require("uuid");
var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient();
/* -------------------------------------------------------------------------- */
/*                                    FLOW                                    */
/* -------------------------------------------------------------------------- */
/**
 * Converts the input papercraft request fields into DynamoDB-ready items for the
 * batch write items request.
 * @param req A create papercraft request
 * @param user The Cognito User from the request
 */
var createPapercraftRequest_build = function (req, userSub) {
    var e_1, _a;
    // helper function for distributing writes into groups of 25
    var batchedWrites = [];
    var numWrites = 0;
    function addToBatchWrites(tableName, putRequest) {
        var _a;
        var index = Math.floor(numWrites / 25);
        if (index > batchedWrites.length - 1) {
            batchedWrites.push({
                RequestItems: (_a = {},
                    _a[tableName] = [putRequest],
                    _a)
            });
        }
        else {
            if (!batchedWrites[index].RequestItems[tableName]) {
                batchedWrites[index].RequestItems[tableName] = [putRequest];
            }
            else {
                batchedWrites[index].RequestItems[tableName].push(putRequest);
            }
        }
    }
    // generate a random papercraft id to use in all the puts
    var papercraftID = (0, uuid_1.v4)();
    var createdAt = new Date().toISOString();
    addToBatchWrites("Papercraft-".concat(process.env.API_PAPERCRAFTCLUB_GRAPHQLAPIIDOUTPUT, "-").concat(process.env.ENV), {
        PutRequest: {
            Item: __assign(__assign({}, req.papercraft), { __typename: "Papercraft", createdAt: createdAt, updatedAt: createdAt, id: papercraftID, owner: userSub })
        }
    });
    try {
        // add each of the corresponding tags to each papercraft
        for (var _b = __values(req.papercraftTags), _c = _b.next(); !_c.done; _c = _b.next()) {
            var papercraftTag = _c.value;
            addToBatchWrites("PapercraftTags-".concat(process.env.API_PAPERCRAFTCLUB_GRAPHQLAPIIDOUTPUT, "-").concat(process.env.ENV), {
                PutRequest: {
                    Item: __assign(__assign({}, papercraftTag), { __typename: "PapercraftTags", createdAt: createdAt, updatedAt: createdAt, id: (0, uuid_1.v4)(), papercraftID: papercraftID, owner: userSub })
                }
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        batchWrites: batchedWrites,
        collaterals: {
            papercraftID: papercraftID
        }
    };
};
/* -------------------------------------------------------------------------- */
/*                                  EXECUTOR                                  */
/* -------------------------------------------------------------------------- */
// runs the batch writes to create all the clothes
var createPapercraft = function (event, req) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userSub, _a, batchWrites, collaterals;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = req.body;
                userSub = event.requestContext.authorizer.claims.sub;
                _a = createPapercraftRequest_build(body, userSub), batchWrites = _a.batchWrites, collaterals = _a.collaterals;
                // when all the writes have finished, combine them to determine success status
                // should probably do some cleanup if a request fails in here.
                return [4 /*yield*/, Promise.all(batchWrites.map(function (write) { return documentClient.batchWrite(write).promise(); }))];
            case 1:
                // when all the writes have finished, combine them to determine success status
                // should probably do some cleanup if a request fails in here.
                _b.sent();
                return [2 /*return*/, collaterals.papercraftID];
        }
    });
}); };
exports.createPapercraft = createPapercraft;
