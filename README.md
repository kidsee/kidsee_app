## Git usage:
A branch contains a fix, feature or parts of a feature, or a refactor. Branchnames start with fix/, feature/ or refactor/ to clarify what is included in the branch. <br/>
When you make a new branch, make sure that your local develop is up-to-date with the remote develop. <br/>
During development on a branch, the base branch (develop) may be updated. When this happens, update your local develop with `git pull` and then switch back to your branch and update it with develop by using `git rebase develop`. <br/>
Using `git merge` will likely result in problems with rebasing later on, including the interactive rebase done before merging into develop at the end of a pull request. <br/>
During a rebase, conflicts may occur. Fix these in the files or with a mergetool and then continue the rebase with `git rebase --continue` <br/>
After the rebase, use `git push -f` to update the remote branch. Make sure that no other commits have been added to the branch between the rebase and the push, as the push will overwrite these. <br/><br/>

After a sprint, production should be updated with a stable version, which should be deployed. After that, features of the new sprint can be added to develop. Next to these features, hotfixes are permitted to merge into production.

If you have any problems with using git, feel free to contact @lucashorward or @InteNs. <br/>
For more and in-depth git usage, read http://img105.job1001.com/upload/adminnew/2015-04-18/1429345520-IAYYBZD.pdf

## Some code styling guidelines:
 - Name variables for what they are, and in camelCase. So a NavigationController becomes a navigationController, not a navctrl
 - Indents are 2 spaces and there is a space between a bracket and name in an import
 - Translations use underscores as word breaks
 - Use access modifiers with every variable/function. If left empty, typescript defaults to **public**, which is not preferable. For variables which are used in the class, use private. For variables used in the page's html, use protected.
 - Use the navigation parameters where applicable. (Example: Going to a post detail from the list, the post will be put into the navparams and used in the detail page.ts)

## What to do before you make a pull request (pr):
Update your branch with develop (see above) and fix any/all conflicts.
Run:
- npm run lint

If you don't have these yet, run: <br/>
`npm install -g lint`<br/>
As well as<br/>
`npm install`<br/>

If you find errors, fix these before you make a pr.

## What to do when reviewing a pull request:
- Check if the travis checks all pass. Check the travis site for Lint errors, as those are *not* shown on Github.
- Pull the code.
- Check if the code runs and if you can in any way destroy the new functionality (i.e. by entering wrong values).

## What to do when merging a pull request:
- Rebase the commits to a limited amount of useful (as in useful to read 3 months from now) commits. This means no "whoops, forgot this" commits, those are squashed to other commits.
- Then merge with the standard merge to develop.

## Multi-Language Instruction guide
Don't add flat text to the frontend. The text has to come either from the api data, or from the language file. Currently, we only use Dutch. The language files are located in src/assets/i18n. The translation files are json, with the key that can be called and the value that will be returned<br />
Example:<br />
HTML:<br />
{{ 'helloWorld' | translate }} <br />
JSON:<br />
{ "helloWorld": "Hallo wereld!"} <br />
This will show the text from the JSON file.
It's possible to add parameters: <br />
HTML: <br />
{{'Hello' | translate:param}} <br />
JSON: <br />
{"Hello": "hello {{value}}"} <br />
For more info, zie https://github.com/ngx-translate/core/blob/master/README.md

Protip: If you get an error in the HTML saying that the pipe 'translate' is invalid, add the TranslateModule to your module.ts

## Unit testing
We use jasmine to unit test, see these links for some examples: <br />
https://www.joshmorony.com/how-to-unit-test-an-ionic-2-application/ <br />
https://jasmine.github.io/pages/docs_home.html <br />
Next to that, there are some examples in the jasmine_examples folders (/lib/jasmine_examples for the models and /specs/jasmine_examples for the tests).
