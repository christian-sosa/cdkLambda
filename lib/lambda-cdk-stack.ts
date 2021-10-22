import * as cdk from '@aws-cdk/core';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';

// LAYERS
import powertools from './lambdaLayers/powertools';
// LAMBDAS
import { sendEmailNotificationLambda } from './lambdaFunctions/send_email_notification';


// TOPIC
import { testTopic } from './sns/snsTopic';

export class lambdaCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // LAYERS
    const fnPowertools = powertools(this);

    // LAMBDAS
    const fnsendEmailNotificationLambda = sendEmailNotificationLambda(this,[fnPowertools]);

    // TOPIC
    const fnTestTopic = testTopic(this);
    const eventSource = new SnsEventSource(fnTestTopic);
    fnsendEmailNotificationLambda.addEventSource(eventSource);
  }
}
