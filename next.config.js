/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // standalone output → slim Docker image + faster cold start
  output: "standalone",
  // keep Prisma + nodemailer external (native engine / CJS not bundleable)
  serverExternalPackages: ["@prisma/client", "prisma", "nodemailer"],
  poweredByHeader: false,
};

export default config;
