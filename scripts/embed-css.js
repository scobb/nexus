// Embeds the generated Tailwind CSS into a TypeScript constant for Worker bundling
const fs = require('fs')
const css = fs.readFileSync('tailwind/output.css', 'utf8')
const escaped = css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
const ts = `// AUTO-GENERATED — do not edit manually\n// Run: npm run build:css to regenerate\nexport const TAILWIND_CSS = \`${escaped}\`\n`
fs.writeFileSync('src/generated-styles.ts', ts)
console.log(`Embedded ${css.length} bytes of CSS into src/generated-styles.ts`)
