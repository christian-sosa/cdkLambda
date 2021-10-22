# import
import boto3
import logging
import datetime
from botocore.exceptions import ClientError
from os import environ
from datetime import datetime, timezone,timedelta
from jsonHTML import *
from aws_lambda_powertools import Logger
# *** variables
logger = Logger()

sender = 'Your email'
recipient = 'Insert email'

ses = boto3.client('ses',region_name='eu-west-3')

datos = {
    "sender":sender
}


datos['recipient'] = recipient

datos['subject'] = "Error"

datos['body_text'] = (".")

datos['body_html'] = """
    <html>
        <head></head>
        <body>
            <h1>Amazon SES Test (SDK for Python)</h1>
            <p>This email was sent with
            <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
            <a href='https://aws.amazon.com/sdk-for-python/'>
                AWS SDK for Python (Boto)</a>.</p>
            <h2>Error por favor revisar</h2)
        </body>
    </html>
"""

# ** metodos
# *** lambda_handler(event, context)
def lambda_handler(event, context):
    emailProceso(event)

    return 0


# *** fecha_correo()
def fecha_correo():
    fecha = datetime.now()
    ahora = fecha - timedelta(hours=4, minutes=00)
    ahora = ahora.strftime("%Y-%m-%d %H:%M:%S" )
    return ahora

# *** sendMail(datos)
def sendEmail(datos):
    CHARSET = "UTF-8"
    try:
        logger.info("Function Start")
        response = ses.send_email(
            Destination={
                'ToAddresses': [
                    datos['recipient'],
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': datos['body_html'],
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': datos['body_text'],
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': datos['subject'],
                },
            },
            Source=datos['sender'],
        )
        return response
    except ClientError as e:
        logger.info(e.response['Error']['Message'])
    else:
        logger.info("Email sent! Message ID:"),
        logger.info(response['MessageId'])



# *** mailProceso(event)
def emailProceso(event):
    ahora = fecha_correo()
    print(datos)
    sendEmail(datos)
