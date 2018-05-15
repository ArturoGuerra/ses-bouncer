const { processQueue } = require('/main.js');

exports.handler = (event, context) => {
  console.log('Starting ses processor:', event, context);
  processQueue();
}
