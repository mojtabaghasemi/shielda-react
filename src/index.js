const React = require('react');
const { useEffect, useRef, useImperativeHandle, forwardRef } = React;

const SCRIPT_URL = 'https://shielda.ir/widget/api.js';

let scriptPromise = null;
function loadShieldaScript(src = SCRIPT_URL) {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.darban || window.shielda) return Promise.resolve();

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        existingScript.addEventListener('load', resolve);
        existingScript.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.head.appendChild(script);
    });
  }

  return scriptPromise;
}

const ShieldaCaptcha = forwardRef(function ShieldaCaptcha(
  {
    siteKey,
    theme = 'auto',
    lang = 'fa',
    onVerify,
    onError,
    onExpire,
    className = '',
    style = {},
    scriptUrl = SCRIPT_URL,
  },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (typeof window !== 'undefined' && window.darban && widgetIdRef.current !== null) {
        try {
          window.darban.reset(widgetIdRef.current);
        } catch (e) {
          // fallback
        }
      }
    },
    getResponse: () => {
      if (typeof window !== 'undefined' && containerRef.current) {
        const input = containerRef.current.querySelector('input[name="darban-captcha-response"]');
        return input ? input.value : '';
      }
      return '';
    },
  }));

  useEffect(() => {
    let isMounted = true;

    loadShieldaScript(scriptUrl)
      .then(() => {
        if (!isMounted || !containerRef.current) return;

        // Listen for hidden input change inside container
        const observer = new MutationObserver(() => {
          const input = containerRef.current?.querySelector('input[name="darban-captcha-response"]');
          if (input && input.value && onVerify) {
            onVerify(input.value);
          }
        });

        observer.observe(containerRef.current, { childList: true, subtree: true });

        return () => observer.disconnect();
      })
      .catch((err) => {
        if (onError) onError(err);
      });

    return () => {
      isMounted = false;
    };
  }, [scriptUrl, onVerify, onError]);

  return React.createElement('div', {
    ref: containerRef,
    className: `darban-captcha ${className}`.trim(),
    style: style,
    'data-sitekey': siteKey,
    'data-theme': theme,
    'data-lang': lang,
  });
});

module.exports = ShieldaCaptcha;
module.exports.ShieldaCaptcha = ShieldaCaptcha;
module.exports.default = ShieldaCaptcha;
