import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { Role, PolicyStatement} from '@aws-cdk/aws-iam';

enum CONSTANTS {
    ID = 'CDK_send_email_notification',
    HANDLER = 'lambda_function.lambda_handler',
    LOC = './src/lambdaFunctions/send_email_notification',
}

export const sendEmailNotificationLambda = (scope: cdk.Stack, layers: lambda.LayerVersion[]) => {

    const sesStatement = new PolicyStatement()
    sesStatement.addActions("ses:*")
    sesStatement.addResources("*")

    const sendEmailLambda = new lambda.Function(scope, CONSTANTS.ID, {
        functionName: CONSTANTS.ID,
        runtime: lambda.Runtime.PYTHON_3_8,
        handler: CONSTANTS.HANDLER,
        code: lambda.Code.fromAsset(CONSTANTS.LOC),
        tracing: lambda.Tracing.ACTIVE,
        layers: layers,
        timeout: cdk.Duration.minutes(3)
    });

    sendEmailLambda.addToRolePolicy(sesStatement)

    return sendEmailLambda
}
