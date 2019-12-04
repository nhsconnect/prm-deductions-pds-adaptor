const config = {
  pdsAsid: process.env.PDS_ASID,
  deductionsAsid: process.env.DEDUCTIONS_ASID,
  mhsUrl: process.env.MHS_URL,
  // TODO: use NODE_ENV environment variable when MHS networking is finished
  isLocal: true // process.env.NODE_ENV === 'local'
};

export default config;
