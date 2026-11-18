# lowcase Brewing / BevOps

The source for [bevops.lowcasebrewing.com](https://bevops.lowcasebrewing.com): an introduction to BevOps, a brewing resources collection, and the BevOps Handbook.

## Site structure

- `index.html` — homepage and short manifesto.
- `resources/index.md` — annotated brewing tools and references.
- `handbook/index.md` — the original handbook overview and chapter index.
- `docs/` — existing handbook chapters, retaining their `.html` URLs.
- `_includes/` and `_layouts/` — shared navigation, footer, and page structure.
- `assets/main.scss` — shared styles; `assets/media/` contains the existing BevOps logo.

## Preview locally

Use a current Ruby installation with Bundler. The Gemfile matches the Jekyll and Minima versions used by GitHub Pages.

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Open <http://127.0.0.1:4000/>. Jekyll rebuilds when content changes; refresh the browser to see updates. Restart the server after changing `_config.yml`.

For a build without a server:

```sh
bundle exec jekyll build
```

Check the homepage, resources page, handbook index, and a handbook chapter at desktop and phone widths before merging. Confirm keyboard navigation and links back to the main lowcase site.

## Editing content

Keep resource descriptions specific and honest about what we've used versus what we're exploring. Link to original sources. Recheck external tools' access requirements when updating their entries.

The complete handbook introduction previously shown on the homepage is preserved in `handbook/index.md`. Existing chapter content remains in `docs/`; YAML front matter supplies layout and page titles.

`README copy.md` is a local working copy excluded from publication. It is not the homepage or handbook source.

Local changes and preview builds do not publish the site. Merge only after review; publishing remains with the repository's existing GitHub Pages configuration.

## Brew-day notebook prototype

The local feature at `/brew-day/` is a beer-agnostic, browser-only batch checklist. New batches start with blank details (including date), targets, actuals, ingredients, additions, and yeast. Its optional stages cover setup, mash rests, pre-boil measurements, boil, and chill/transfer/pitch. Use the steps that apply to the brewer's process; record extra rests and deviations in the notes. It is a recording aid, not a recipe calculator.

Setup includes a grain bill/fermentables field and separate notes for water treatment and substitutions. The boil section has space for the brewer's own hop schedule and other additions, including amounts and timing. No equipment, quantities, rest temperatures, boil durations, or yeast strains are prescribed.

- `assets/brew-day-core.mjs` defines the generic checklist, versioned batch-file schema, import validation, and storage writer.
- `assets/brew-day.mjs` builds the form, autosaves input, handles file actions, and builds a separate print record with all entered text.
- `assets/brew-day.css` contains screen and print styles.

One active draft is saved under `bevops.brew-day.v1` in localStorage. Storage is scoped to browser, device, and origin (including the local preview port). There is no server submission, user account, analytics, or cloud sync. Once loaded, the notebook can keep working without connectivity; reopening/reloading still requires access to the site. No service worker is installed.

Export creates a version-2 `.bevops.json` batch file. Existing version-1 Punkin’ Monkey drafts and exports are migrated when opened, preserving all recorded values, checks, notes, and the original checklist wording; the new grain-bill field starts blank. Version-2 files snapshot checklist labels so historical records retain their meaning when wording evolves. The storage key is deliberately retained for migration. To start blank instead of restoring an existing record, choose **New batch** after exporting anything you want to keep. Import validates its version, template, field names/types, size, and date/time fields before asking to replace the draft. New batch also asks before replacing the draft. Invalid stored data is retained for a recovery download; blocked or full storage produces an explicit unsaved status. A change from another tab pauses autosave so stale tabs cannot silently overwrite newer work. Export before switching batches, clearing browser data, or closing a private window.

Use **Print / PDF**, then the browser's print dialog to print or save as PDF. The print stylesheet includes checked and unchecked steps, targets, actuals, metadata, and full notes rather than clipped input controls. Export JSON as well if you want to edit the record later.

### Prototype checks

```sh
node --test tests/brew-day-core.test.mjs
bundle exec jekyll build
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Open `http://127.0.0.1:4000/brew-day/`. Enter values and check steps, reload to verify restoration, export a batch, start a new batch, and import the file. Try malformed and incompatible files; they must leave the draft untouched. Check long notes in Print / PDF and test narrow phone widths. Review storage failure and multi-tab behavior before any public launch of this prototype.
