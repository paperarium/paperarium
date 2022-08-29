/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
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
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { getCurrentInvoke } from "@vendia/serverless-express";
import { createPapercraft } from "./flows/createPapercraft";

// declare a new express app
const app = express();
const router = express.Router();
// apply middlewares, exposing the Cognito user to the request object
router.use(cors());
router.use(bodyParser.json());

/* -------------------------------------------------------------------------- */
/*                                  ENDPOINTS                                 */
/* -------------------------------------------------------------------------- */

/****************************
 * Cascading papercraft create method *
 ****************************/
router.post("/upload", async function (req, res) {
  // guard statements for valid data
  if (!req.body) return res.json({ success: false, error: "No request body!" });
  const { event } = getCurrentInvoke();
  // perform the cascading create
  createPapercraft(event, req)
    .then((data) => {
      res.json({
        success: true,
        data: {
          papercraftID: data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
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
export default app;
