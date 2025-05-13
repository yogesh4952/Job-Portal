import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://b92b77a64af5f4feecd584ae4492d8a5@o4508776496889856.ingest.us.sentry.io/4509309987520512",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.mongooseIntegration()],
});
