# CSS Template

My standard template for CSS styling with SASS.

## Goals

- `<div>`/`<a>`/`<button>` elements are interchangable
- `<p>`/`<h*>` element look identical until style classes/mixins are used

## Assumptions

- There are only two themes (`light` or `dark`) by default (adding a custom one
  is possible however)
- There are only 4 levels of surface
- `<a>` tags do not display text on their own. They must exist either inside a
  `<p>` tag, or could surround a `<p>` tag like a div. For link styling, the
  `<p>` tag should be on the outside.

## Classes/Mixins

- `light`/`dark`
- `level-0`/`level-1`/`level-2`/`level-3`
- `btn`
- `link`
- `one-line` - Must be applied to wrapper div.
- `color-normal`
- `color-strong`
- `color-weak`
- `color-accent`
- `gone`
- `row`
- `flex-grow`
- `flip-180`

## Themeable

- `--line-height`
- `--font-default`
- `--col-surface-0-light`
- --col-surface-1-light`
- --col-surface-2-light`
- --col-surface-3-light`
- --col-on-surface-light`
- --col-accent-light`
- --col-surface-0-dark`
- --col-surface-1-dark`
- --col-surface-2-dark`
- --col-surface-3-dark`
- --col-on-surface-dark`
- --col-accent-dark`
