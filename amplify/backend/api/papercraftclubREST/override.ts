// This file is used to override the REST API resources configuration
import { AmplifyApiRestResourceStackTemplate } from "@aws-amplify/cli-extensibility-helper";

export function override(resources: AmplifyApiRestResourceStackTemplate) {
  // Add our user pool id as a parameter so we can create authorizers with it
  resources.addCfnParameter(
    {
      type: "String",
      description:
        "The id of an existing User Pool to connect. If this is changed, a user pool will not be created for you.",
      default: "NONE",
    },
    "AuthCognitoUserPoolId",
    {
      "Fn::GetAtt": ["authpapercraftclub783d8fae", "Outputs.UserPoolId"],
    }
  );
  // create the authorizer using the AuthCognitoUserPoolId parameter defined above
  resources.restApi.addPropertyOverride("Body.securityDefinitions", {
    Cognito: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      "x-amazon-apigateway-authtype": "cognito_user_pools",
      "x-amazon-apigateway-authorizer": {
        type: "cognito_user_pools",
        providerARNs: [
          {
            "Fn::Sub":
              "arn:aws:cognito-idp:${AWS::Region}:${AWS::AccountId}:userpool/${AuthCognitoUserPoolId}",
          },
        ],
      },
    },
  });
  // for each path in the rest API, add the authorizer for all methods
  for (const path in resources.restApi.body.paths) {
    // add the Authorization header as a parameter to the rest API for the path
    resources.restApi.addPropertyOverride(
      `Body.paths.${path}.x-amazon-apigateway-any-method.parameters`,
      [
        ...resources.restApi.body.paths[path]["x-amazon-apigateway-any-method"]
          .parameters,
        {
          name: "Authorization",
          in: "header",
          required: false,
          type: "string",
        },
      ]
    );
    // set the security method to use our user pool authorizer
    // TODO: do we need to destructure the other security methods as well?
    resources.restApi.addPropertyOverride(
      `Body.paths.${path}.x-amazon-apigateway-any-method.security`,
      [
        {
          Cognito: [],
        },
      ]
    );
  }
}
