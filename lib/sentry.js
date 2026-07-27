import * as Sentry from '@sentry/node';

let initialized = false;

export function initSentry() {
  if (initialized || !process.env.SENTRY_DSN) return;
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.VERCEL_ENV || 'development',
    tracesSampleRate: 0,
  });
  initialized = true;
}

export function captureError(err, context) {
  initSentry();
  if (!process.env.SENTRY_DSN) return;
  Sentry.withScope((scope) => {
    if (context) scope.setContext('fulfillment', context);
    Sentry.captureException(err);
  });
}
