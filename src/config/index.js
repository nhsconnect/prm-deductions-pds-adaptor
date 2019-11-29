const config = {
  pdsAsid: process.env.PDS_ASID,
  deductionsAsid: process.env.DEDUCTIONS_ASID,
  queueName: process.env.MHS_QUEUE_NAME,
  queueUrl1: process.env.MHS_QUEUE_URL_1,
  queueUrl2: process.env.MHS_QUEUE_URL_2,
  queueUsername: process.env.MHS_QUEUE_USERNAME,
  queuePassword: process.env.MHS_QUEUE_PASSWORD
};

export default config;
