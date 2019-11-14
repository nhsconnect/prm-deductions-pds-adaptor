const config = {
  pdsAsid: process.env.PDS_ASID,
  deductionsAsid: process.env.DEDUCTIONS_ASID,
  queueName: 'deductions',
  queueHost: 'localhost',
  queuePort: 61613
};

export default config;