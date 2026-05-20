import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config: any, { isServer }) => {
    if (isServer) {
      // Suppress "Critical dependency" warnings from @inngest/agent-kit's 
      // OpenTelemetry instrumentation which uses dynamic require()
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : config.externals ? [config.externals] : []),
        "@traceloop/instrumentation-anthropic",
        "require-in-the-middle",
        "@opentelemetry/instrumentation",
      ];
    }

    // Suppress the specific warnings from these packages
    config.ignoreWarnings = [
      { module: /require-in-the-middle/ },
      { module: /@traceloop\/instrumentation-anthropic/ },
      { module: /@opentelemetry\/instrumentation/ },
    ];

    return config;
  },
};

export default nextConfig;
