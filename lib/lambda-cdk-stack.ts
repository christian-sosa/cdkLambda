import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
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

    const vpcBCICierreMes = ec2.Vpc.fromVpcAttributes(this, 'dwhvida', {
      vpcId: 'vpc-0e706f0a5438d4f2c',
      availabilityZones: cdk.Fn.getAzs(),
      privateSubnetIds: ['subnet-0818e87e611ec49c3', 'subnet-03cf8f65b456674e5']
    })
    //SECURITY GROUPS
    const secGroupLambdaPublicSubnet = ec2.SecurityGroup.fromSecurityGroupId(this, 'dwhvida-bastion', 'sg-00d95bcedd76163b8', {
      mutable: false
    });

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
