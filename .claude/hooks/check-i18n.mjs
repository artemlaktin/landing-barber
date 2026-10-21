// PostToolUse hook: after any edit of i18n/locales/*.json, verify all 4 files parse and share the same keys.
import {readFileSync} from 'node:fs'
import {join} from 'node:path'

const input = JSON.parse(readFileSync(0, 'utf8') || '{}')
const filePath = String(input.tool_input?.file_path ?? '').replaceAll('\\', '/')
if (!/i18n\/locales\/[a-z]+\.json$/.test(filePath)) process.exit(0)

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd()
const langs = ['pl', 'en', 'uk', 'ru']
const keys = o => Object.entries(o).flatMap(([k, v]) =>
  v && typeof v === 'object' ? keys(v).map(x => `${k}.${x}`) : [k])

const problems = []
const sets = {}
for (const l of langs) {
  try {
    sets[l] = new Set(keys(JSON.parse(readFileSync(join(root, 'i18n/locales', `${l}.json`), 'utf8'))))
  } catch (e) {
    problems.push(`${l}.json is broken JSON: ${e.message}`)
  }
}
if (!problems.length) {
  for (const l of langs.slice(1)) {
    const missing = [...sets.pl].filter(k => !sets[l].has(k))
    const extra = [...sets[l]].filter(k => !sets.pl.has(k))
    if (missing.length) problems.push(`${l}.json is missing keys: ${missing.join(', ')}`)
    if (extra.length) problems.push(`${l}.json has keys not in pl.json: ${extra.join(', ')}`)
  }
}
if (problems.length) {
  console.error('i18n check failed — fix before continuing:\n' + problems.join('\n'))
  process.exit(2)
}
