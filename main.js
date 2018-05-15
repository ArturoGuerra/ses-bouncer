'use strict'
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
const SQS = new AWS.SQS();

const QueueUrl = process.env.SQSURL

const params = {
  QueueUrl: QueueUrl
};

function DeleteMessage(params) {
  SQS.deleteMessage(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Deleted:", data);
    }
  })
}

function processQueue() {
  SQS.receiveMessage(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      try {
        data.Messages.forEach(message => {
          console.log(message.Body);
          DeleteMessage({
            QueueUrl: QueueUrl,
            ReceiptHandle: message.ReceiptHandle
          })
        })
      } catch (e) {
        console.log(data.Messages)
      }
    }
  })
}

exports.processQueue = processQueue

if (require.main === module) {
  processQueue()
}
