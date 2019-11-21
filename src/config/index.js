const config = {
  pdsAsid: process.env.PDS_ASID,
  deductionsAsid: process.env.DEDUCTIONS_ASID,
  queueName: process.env.MHS_QUEUE_NAME,
  queueUrl: process.env.MHS_QUEUE_URL
};

export default config;
