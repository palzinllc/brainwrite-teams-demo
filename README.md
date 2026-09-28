# Brainwrite team template

This repository is a template for publishing a team in the
[Brainwrite team library](https://teams.brainwrite.in). It holds one complete,
working example team, **Competitor Watch**, with the same layout as the
library itself and the library's own validator.

To make your own team:

1. Click **Use this template** on GitHub to copy this repository.
2. Replace the example team with yours, following the layout below.
3. Run `npm run validate` and fix anything it reports.
4. Install the team in Brainwrite from your repository and try it.
5. Submit your repository at
   [teams.brainwrite.in/submit](https://teams.brainwrite.in/submit).

Your repository must be public so it can be checked and installed.

## Layout

```
catalog.json                          the listing for your team
packages/<team-id>.md                 the team itself (Brainwrite Markdown v1)
teams/<team-id>/
  team.brainwriteteam.json            members and room, for the app's library
  README.md                           a short human description
  skills/<playbook-key>/SKILL.md      one file per playbook
FORMAT.md                             the Markdown format, in full
schema/team.schema.json               JSON schema for team.brainwriteteam.json
scripts/validate.mjs                  the library's validator
LICENSE                               the license your team is shared under
```

`<team-id>` is your team's id: lower-case letters, digits and hyphens, for
example `weekly-sales-review`. It must be the same everywhere: the file name
in `packages/`, the folder name in `teams/`, `id` in the package, and `slug`
in `catalog.json`. It must not already be used by a team in the library.

## The files

### `packages/<team-id>.md`: the team

This is the file Brainwrite installs, and the one people read. It is a
Markdown file with YAML frontmatter:

- **Frontmatter:** it starts with `brainwrite: 1`, then the team's `id`,
  `release` (semver, e.g. `1.0.0`), `name`, `tagline`, `summary`,
  `category`, `author`, `license`, `outcomes`, `setupMinutes`,
  `requirements` (the apps it uses), `agents`, `chiefOfStaff`, `rooms`,
  `routines` and `playbooks`.
- **Body:** it must have these seven sections, as `## ` headings:
  Activation, Mission, Outcomes, Connections, Team, Chief of Staff and
  Completion rule.
- **Agents:** each has a `key`, `name`, `title`, `description` and an
  `appearance` with a `color`. The colors are green, blue, red, orange,
  purple, cyan, pink, yellow, teal, coral, white and gray.
- **Routines:** always install paused, so set `enabledAfterInstall: false`.
- **Requirements:** name the apps a team connects to. A team never contains
  credentials; people connect their own accounts in Brainwrite.

[FORMAT.md](FORMAT.md) describes the format and the optional `proof` block. The
example team shows every field in use.

### `teams/<team-id>/`: the app's library entry

These files describe the same team for the app's library, and they must
agree with the package:

- `team.brainwriteteam.json`:
  - the same members, in the same order, with the same `key`, `name`,
    `title` and `color`;
  - one `room`, with the same name as the package's first room.
- `skills/<playbook-key>/SKILL.md`: one per playbook in the package, with the
  folder named after the playbook's `key`.
- `README.md`: a short description of the team, its members and its skills.

The validator reports any difference between these files and the package.

### `catalog.json`: the listing

It has one entry for your team: `slug`, `name`, `summary` (up to 300
characters), `category`, `outcome`, `setupMinutes`, `package`, `manifest`,
`readme`, `members` (the number of agents), `skills` (the paths of the
`SKILL.md` files) and `requires.apps`.

The library decides which teams are featured, so leave `featured` out.

## Validate

```bash
npm install
npm run validate
```

It prints `Validated 1 catalog teams` when everything is in order. The
submission page runs the same checks on your repository before you can
submit, plus:
- text files only, with the file and size limits shown on that page;
- no passwords, API keys, tokens or hidden content in any file;
- a license file.

## Try it in Brainwrite

Before submitting, install your team from your repository:

1. In Brainwrite, open the team library and find **Load from GitHub**.
2. Paste the link to your package file, for example
   `https://github.com/<you>/<repo>/blob/main/packages/<team-id>.md`.

Check that the members, playbooks, room and routines arrive as you intended,
and that the team does what its outcomes promise.

## Submit

Go to [teams.brainwrite.in/submit](https://teams.brainwrite.in/submit) and
enter your repository's URL:

1. **Check.** The page checks your repository. When it passes, you submit.
2. **Pin.** Your submission is pinned to that exact commit. Pushing later
   changes does not alter what is reviewed; submit again for a new version.
3. **Review.** A reviewer installs the team from that commit and tries it.
4. **Import.** Approved teams are copied into the library and appear on
   [teams.brainwrite.in](https://teams.brainwrite.in) within minutes.

By submitting, you confirm that you may share the team and that Brainwrite
may publish it under the license in your repository.

## License

The example team is licensed under the MIT License; see [LICENSE](LICENSE).
Replace it with the license you want your team shared under.
