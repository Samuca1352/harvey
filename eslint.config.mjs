import fs from 'node:fs';
const adherence = JSON.parse(fs.readFileSync(new URL('./design-system/lint/adherence.json', import.meta.url), 'utf8'));
// Generated prop allowlists omit inherited HTML props and mistake TS interfaces
// for components. Preserve the original config for audit; apply real variant rules.
const syntax = adherence.rules['no-restricted-syntax'].slice(1).filter(rule =>
  !rule.message.includes("doesn't accept that prop"));
const variants = syntax.filter(rule => rule.selector.startsWith('JSXOpeningElement'));
const restrictedImports = ['warn', { patterns: [{
  group: ['**/design-system/components/**', '@harvey/design-system/components/**',
    'components/core/**', 'components/data/**', 'components/feedback/**',
    'components/forms/**', 'components/navigation/**', 'scratch/**', 'ui_kits/dashboard/**'],
  message: "Import components from '@harvey/design-system' or design-system/index.js.",
}] }];
export default [
  { ignores: ['**/node_modules/**', '**/.venv/**', '**/.claude/**', 'data/**',
    'design-system/references/runtime/**', 'design-system-export/**'] },
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: { 'no-restricted-imports': restrictedImports, 'no-restricted-syntax': ['warn', ...syntax] },
  },
  {
    // Foundations define raw dimensions/colors; imported prototypes are historical
    // specimens, and the existing vanilla dashboard keeps its independent theme.
    files: ['design-system/components/**', 'design-system/templates/**', 'harvey/web/**', 'scripts/**', '*.config.mjs'],
    rules: { 'no-restricted-syntax': ['warn', ...variants] },
  },
  { files: ['design-system/index.js'], rules: { 'no-restricted-imports': 'off' } },
];
