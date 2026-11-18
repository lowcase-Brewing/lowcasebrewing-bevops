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
