import React from 'react';

export interface ShieldaCaptchaProps {
  siteKey: string;
  theme?: 'auto' | 'light' | 'dark';
  lang?: 'fa' | 'en';
  onVerify?: (token: string) => void;
  onError?: (error: any) => void;
  onExpire?: () => void;
  className?: string;
  style?: React.CSSProperties;
  scriptUrl?: string;
}

export interface ShieldaCaptchaRef {
  reset: () => void;
  getResponse: () => string;
}

export declare const ShieldaCaptcha: React.ForwardRefExoticComponent<
  ShieldaCaptchaProps & React.RefAttributes<ShieldaCaptchaRef>
>;

export default ShieldaCaptcha;
