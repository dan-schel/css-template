# CSS Template

My standard template for CSS styling with SASS.

## Usage

Clone this repo as a git submodule in the area with your sass files. Then use:
`@use "css-template/import"` to import the styles from the template.

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
