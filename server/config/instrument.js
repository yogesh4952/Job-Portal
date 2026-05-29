import * as Sentry from "@sentry/node";

const SENTRY_DSN = process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    integrations: [Sentry.mongooseIntegration()],
  });
  console.log("Sentry initialized");
} else {
  console.log("Sentry DSN not provided, skipping Sentry initialization");
}
