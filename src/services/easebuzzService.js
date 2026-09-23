/**
 * Easebuzz Payment Service
 * Handles payment initialization, hash calculation, status verification and transaction recording.
 */

const DEFAULT_EASEBUZZ_CONFIG = {
  merchantKey: 'EASEBUZZ_TEST_KEY_8824',
  salt: 'EASEBUZZ_TEST_SALT_9912',
  environment: 'test', // 'test' or 'prod'
  currency: 'INR'
};

export const getEasebuzzConfig = () => {
  try {
    const saved = localStorage.getItem('easebuzz_config');
    return saved ? JSON.parse(saved) : DEFAULT_EASEBUZZ_CONFIG;
  } catch {
    return DEFAULT_EASEBUZZ_CONFIG;
  }
};

export const saveEasebuzzConfig = (config) => {
  try {
    localStorage.setItem('easebuzz_config', JSON.stringify(config));
    return true;
  } catch (e) {
    console.error('Failed to save Easebuzz config', e);
    return false;
  }
};

export const generateTransactionId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `TBT_${timestamp}_${randomStr}`;
};

/**
 * Calculates hash string format for Easebuzz API:
 * hashSequence = key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
 */
export const calculateEasebuzzHash = ({ key, txnid, amount, productinfo, firstname, email, salt }) => {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  // For client side demo, return simulated SHA-512 hex signature
  return 'hash_' + Math.abs(hashString.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0)).toString(16) + Date.now().toString(16);
};

export const samplePayments = [
  {
    txnid: 'TBT_L8K2M1P9_8A92F',
    easebuzzId: 'EZB_202609230192',
    firstname: 'Ramesh Sharma',
    email: 'ramesh.sharma@example.com',
    phone: '+919876543210',
    amount: 3500,
    productinfo: 'Sedan Advance Booking - Tirumala Tour',
    date: '2026-09-23 14:30',
    status: 'SUCCESS',
    mode: 'UPI (GPay)'
  },
  {
    txnid: 'TBT_L8K1X002_9F12A',
    easebuzzId: 'EZB_202609230188',
    firstname: 'Priya Sundaram',
    email: 'priya.sundaram@example.com',
    phone: '+919812345678',
    amount: 6800,
    productinfo: '16 Seater Tempo Traveller Booking',
    date: '2026-09-22 18:15',
    status: 'SUCCESS',
    mode: 'NetBanking (HDFC)'
  },
  {
    txnid: 'TBT_L8J9Y410_2C77D',
    easebuzzId: 'EZB_202609210044',
    firstname: 'Anil Reddy',
    email: 'anil.reddy@example.com',
    phone: '+919700112233',
    amount: 5000,
    productinfo: 'Golden Temple Tour Advance',
    date: '2026-09-21 11:20',
    status: 'SUCCESS',
    mode: 'Credit Card (ICICI)'
  }
];
