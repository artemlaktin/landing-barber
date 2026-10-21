// Status line: current branch + whether there are unsaved (uncommitted) changes.
import {execSync} from 'node:child_process'

const run = cmd => {
  try { return execSync(cmd, {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim() } catch { return '' }
}
const branch = run('git branch --show-current') || '?'
const changed = run('git status --porcelain').split('\n').filter(Boolean).length
const state = changed ? `⚠ несохранённых изменений: ${changed} — /save` : '✓ всё сохранено'
console.log(`🐻 Grizzly · ветка ${branch} · ${state}`)
