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
import { v4 } from "uuid";
import { Request } from "express";
import * as AWS from "aws-sdk";
import * as APIt from "../util/API";
const documentClient = new AWS.DynamoDB.DocumentClient();

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

// a create papercraft request has a lot of parts
interface CreatePapercraftRequest {
  papercraft: APIt.CreatePapercraftInput;
  papercraftTags: APIt.CreatePapercraftTagsInput[];
}

// and returns only a couple things
interface CreatePapercraftResponse {
  papercraftID: string;
}

/* -------------------------------------------------------------------------- */
/*                                    FLOW                                    */
/* -------------------------------------------------------------------------- */

/**
 * Converts the input papercraft request fields into DynamoDB-ready items for the
 * batch write items request.
 * @param req A create papercraft request
 * @param user The Cognito User from the request
 */
const createPapercraftRequest_build = (
  req: CreatePapercraftRequest,
  userSub: string
): {
  batchWrites: AWS.DynamoDB.DocumentClient.BatchWriteItemInput[];
  collaterals: CreatePapercraftResponse;
} => {
  // helper function for distributing writes into groups of 25
  const batchedWrites: AWS.DynamoDB.DocumentClient.BatchWriteItemInput[] = [];
  const numWrites = 0;
  function addToBatchWrites(
    tableName: string,
    putRequest: AWS.DynamoDB.DocumentClient.WriteRequest
  ) {
    const index = Math.floor(numWrites / 25);
    if (index > batchedWrites.length - 1) {
      batchedWrites.push({
        RequestItems: {
          [tableName]: [putRequest],
        },
      });
    } else {
      if (!batchedWrites[index].RequestItems[tableName]) {
        batchedWrites[index].RequestItems[tableName] = [putRequest];
      } else {
        batchedWrites[index].RequestItems[tableName].push(putRequest);
      }
    }
  }

  // generate a random papercraft id to use in all the puts
  const papercraftID = v4();
  const createdAt = new Date().toISOString();
  addToBatchWrites(
    `Papercraft-${process.env.API_PAPERCRAFTCLUB_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`,
    {
      PutRequest: {
        Item: {
          ...req.papercraft,
          __typename: "Papercraft",
          createdAt: createdAt,
          updatedAt: createdAt,
          id: papercraftID,
          owner: userSub,
        },
      },
    }
  );

  // add each of the corresponding tags to each papercraft
  for (const papercraftTag of req.papercraftTags) {
    addToBatchWrites(
      `PapercraftTags-${process.env.API_PAPERCRAFTCLUB_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`,
      {
        PutRequest: {
          Item: {
            ...papercraftTag,
            __typename: "PapercraftTags",
            createdAt: createdAt,
            updatedAt: createdAt,
            id: v4(),
            papercraftID,
            owner: userSub,
          },
        },
      }
    );
  }

  return {
    batchWrites: batchedWrites,
    collaterals: {
      papercraftID,
    },
  };
};

/* -------------------------------------------------------------------------- */
/*                                  EXECUTOR                                  */
/* -------------------------------------------------------------------------- */

// runs the batch writes to create all the clothes
export const createPapercraft = async (event: any, req: Request) => {
  // should do some sort of validation below
  const body: CreatePapercraftRequest = req.body;
  // get the cognito user from the request
  const userSub = event.requestContext.authorizer.claims.sub;
  // build the batch writes
  const { batchWrites, collaterals } = createPapercraftRequest_build(
    body,
    userSub
  );
  // when all the writes have finished, combine them to determine success status
  // should probably do some cleanup if a request fails in here.
  await Promise.all(
    batchWrites.map((write) => documentClient.batchWrite(write).promise())
  );
  return collaterals.papercraftID;
};
