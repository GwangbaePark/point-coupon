import { randomBytes } from 'crypto';

// 10자리 랜덤 문자열 생성
export const generateUniqueCouponCode = (): string => {
  return randomBytes(5).toString('hex').substring(0, 10).toUpperCase();
};
