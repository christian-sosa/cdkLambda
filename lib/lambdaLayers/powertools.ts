import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

enum CONSTANTS {
  ID = "CDK_layer_powertools",
  LOC = "./src/lambdaLayers/powertools/powertools.zip",
  LAYER_NAME = "CDK_powertools",
}

export default function(scope: cdk.Construct) {
  return new lambda.LayerVersion(scope, CONSTANTS.ID, {
    compatibleRuntimes: [lambda.Runtime.PYTHON_3_8],
    code: lambda.Code.fromAsset(CONSTANTS.LOC),
    layerVersionName: CONSTANTS.LAYER_NAME
  });
}
