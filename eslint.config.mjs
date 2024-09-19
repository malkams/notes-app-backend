import globals from 'globals';
import pluginJs from '@eslint/js';


// export default [
//   {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
// ];

import daStyle from 'eslint-config-dicodingacademy';

export default [
  daStyle,
];