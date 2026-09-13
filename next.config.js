/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // standalone output → slim Docker image + faster cold start
  output: "standalone",
  // keep Prisma external (native engine not bundleable by webpack)
  serverExternalPackages: ["@prisma/client", "prisma"],
  poweredByHeader: false,
};

export default config;
