import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  //  Prettier 통합 구간
  {
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [
      prettierConfig, // ESLint와 Prettier 충돌 규칙 제거
    ],
    rules: {
      "prettier/prettier": "error", // Prettier 포맷팅 오류를 ESLint 오류로 처리
      "react/self-closing-comp": "error",

      // Next 기본 no-unused-vars 꺼주고 TS 버전 사용
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
]);

export default eslintConfig;
