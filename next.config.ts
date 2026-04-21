import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Avoids a known dev-only RSC client-manifest issue with SegmentViewNode after
  // cache/HMR churn; re-enable when upgrading Next if the bug is fixed.
  experimental: {
    devtoolSegmentExplorer: false,
  },
  // Monorepo / multiple lockfiles: trace from this project root
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
