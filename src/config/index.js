const config = {
  pdsAsid: process.env.PDS_ASID,
  deductionsAsid: process.env.DEDUCTIONS_ASID,
  queueName: process.env.MHS_QUEUE_NAME,
  queueHost: process.env.MHS_QUEUE_HOST,
  queuePort: process.env.MHS_QUEUE_PORT
};

export default config;
