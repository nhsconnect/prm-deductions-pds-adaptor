const config = {
  pdsAsid: process.env.PDS_ASID,
  deductionsAsid: process.env.DEDUCTIONS_ASID,
  mhsUrl: process.env.MHS_URL,
  isLocal: process.env.NODE_ENV === 'local'
};

export default config;
