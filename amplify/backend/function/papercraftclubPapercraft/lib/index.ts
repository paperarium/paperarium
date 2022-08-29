/*
 * index.ts
 * author: evan kirkiles
 * created on Sun Aug 28 2022
 * 2022 the nobot space,
 */
const serverlessExpress = require("@vendia/serverless-express");
import app from "./app";

// serve the express app
exports.handler = serverlessExpress({ app });
