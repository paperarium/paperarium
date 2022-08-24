/* Amplify Params - DO NOT EDIT
	API_PAPERCRAFTCLUB_GRAPHQLAPIENDPOINTOUTPUT
	API_PAPERCRAFTCLUB_GRAPHQLAPIIDOUTPUT
	API_PAPERCRAFTCLUB_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB();

import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

export const handler = async (event: any, context: Context, callback: any) => {
  const date = new Date();
  if (event.request.userAttributes.sub) {
    const params = {
      Item: {
        id: { S: event.request.userAttributes.sub },
        __typename: { S: "User" },
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
        owner: { S: event.request.userAttributes.sub },
        username: { S: event.userName },
        email: { S: event.request.userAttributes.email },
        papercrafts: { L: [] },
      },
      TableName: `User-${process.env.API_PAPERCRAFTCLUB_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`,
    };

    // call dynamodb
    try {
      await ddb.putItem(params).promise();
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }

    callback(null, event);
  } else {
    // Nothing to do, the user's sub is unknown
    console.log("Error: Nothing was written to DynamoDB");
    callback(null, event);
  }
};
