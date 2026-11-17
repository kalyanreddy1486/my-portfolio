import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const dir = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: dir });

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { files: ["app/**/opengraph-image.tsx"], rules: { "@next/next/no-img-element": "off" } },
  { ignores: ["node_modules/**", ".next/**", "out/**", "next-env.d.ts", "scripts/**"] },
];

export default config;
