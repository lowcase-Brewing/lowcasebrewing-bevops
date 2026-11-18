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

Export creates a version-4 `.bevops.json` batch file. Existing version-1 Punkin’ Monkey and version-2/3 generic drafts/exports are migrated when opened, preserving recorded values, checks, notes, and original checklist wording. Newly introduced fields start blank and no dates or N/A decisions are inferred. Version-2 and later files snapshot checklist labels so historical records retain their meaning when wording evolves. The storage key is deliberately retained for migration. To start blank instead of restoring an existing record, choose **New batch** after exporting anything you want to keep. Import validates its version, template, field names/types, size, and date/time fields before asking to replace the draft. New batch also asks before replacing the draft. Invalid stored data is retained for a recovery download; blocked or full storage produces an explicit unsaved status. A change from another tab pauses autosave so stale tabs cannot silently overwrite newer work. Export before switching batches, clearing browser data, or closing a private window.

Use **Print / PDF**, then the browser's print dialog to print or save as PDF. The print stylesheet includes checked and unchecked steps, targets, actuals, metadata, and full notes rather than clipped input controls. Export JSON as well if you want to edit the record later.


### Small workflow accommodations

- Each step has an explicit N/A toggle. N/A steps cannot also be checked, are excluded from the applicable-step count, and print as `[N/A]`. Clearing N/A makes the unchecked step available again. Steps stay visible; the Brew Method dropdown only records a choice and does not change any steps, measurements, or N/A states.
- Optional top-up-water target/actual volumes appear before final fermenter volume and OG. Record final volume/OG after any top-up and mixing. The boil section also includes a whirlpool/hop-stand temperature target/actual pair.
- Each stage has separate start/finish dates and times for overnight or multi-day brewing. Dates are optional and blank by default. Historical time-only values are retained; printouts explicitly say when a date or time was not recorded.
- Measurement fields are explicitly US gallons, °F, SG, and minutes. No unit conversions are performed. Include units with ingredient amounts. Dates/times are local and not converted between timezones. The same unit statement appears in printouts.

Brew Method offers static choices for multi-vessel all-grain, BIAB, all-in-one all-grain, partial mash, extract with steeping grains, extract only, no-boil/prepared wort, and other/hybrid methods. New batches leave it unselected. Use notes to describe another approach. Earlier free-text equipment values are retained in the file and shown on screen and in print as previous equipment; they are not automatically mapped to a method.

### Current limitations

This remains a brew-day record for one wort and one fermenter. Kettle souring (including souring holds, culture/pH records, and repeated boil/chill phases) and split batches require process-specific records. Additional mash rests can be recorded in notes. Dry hopping, fermentation additions, and conditioning are handed off in notes rather than tracked as a fermentation schedule. Test the prototype on a real brew day before adding method-driven checklists.

### Prototype checks

```sh
node --test tests/brew-day-core.test.mjs
bundle exec jekyll build
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Open `http://127.0.0.1:4000/brew-day/`. Enter values and check steps, reload to verify restoration, export a batch, start a new batch, and import the file. Try malformed and incompatible files; they must leave the draft untouched. Check long notes in Print / PDF and test narrow phone widths. Review storage failure and multi-tab behavior before any public launch of this prototype.
