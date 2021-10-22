#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { lambdaCdkStack} from '../lib/lambda-cdk-stack';

const account = 'Your Account';
const region = 'Your Region'

const app = new cdk.App();

const bciStack = new lambdaCdkStack(app, 'lambdaCdkStack', {
    env: { account: account, region: region }
});

