import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';


export const testTopic = (scope: cdk.Stack) => {

    const topic = new sns.Topic(scope, 'TestTopic', {
        displayName: 'Test Topic',
    });

    
    return topic;
}
