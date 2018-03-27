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

## Multi-Language Instruction gids
Voeg geen platte tekst meer toe aan de frontend. De tekst die er moet komen te staan dient ingevoerd te worden aan elke language file die we hebben. Op dit moment is dat alleen Nederlands. De language files staan in: src/assets/i18n. Dit zijn json files, met de key die aangeroepen wordt in de frontend en de value die dan getoond wordt. <br />
Voorbeeld:<br />
HTML:<br />
{{ 'helloWorld' | translate }} <br />
JSON:<br />
{ "helloWorld": "Hallo wereld!"} <br />
Dan wordt er de string uit de json file getoond.
Dit is ook mogelijk met parameters: <br />
HTML: <br />
{{'Hello' | translate:param}} <br />
JSON: <br />
{"Hello": "hello {{value}}"} <br />
Voor nog meer info, zie https://github.com/ngx-translate/core/blob/master/README.md
