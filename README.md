## What to do before you make a pull request (pr):
Run:
- npm run lint
- qunit

Als je deze nog niet hebt:
npm install -g lint qunit

Als er errors naar voren komen moet je deze eerst fixen voor je een pr aanmaakt.

## What to do when reviewing a pull request:
- Kijk of de travis checks passen. Check ook even op de travis site, want Lint errors worden als warnings gezien en dus NIET op github getoond, alleen op travis zelf.
- Pull de code.
- Check zelf of de code werkt, en ook of je het onderdeel stuk kunt maken (verkeerde waardes invullen etc).

## What to do when merging a pull request:
- Rebase de commits naar een beperkt aantal zinvolle commits. Dus geen "oeps, vergeten", die worden gesquashed naar een andere commit.
- Merge vervolgens met de standaard merge naar develop.
