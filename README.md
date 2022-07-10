# CSS Template

My standard template for CSS styling with SASS.

## Usage

Clone this repo as a git submodule in the area with your sass files. Then use...

```css
@use "css-template/import" as template;
```

...to import the styles from the template.

## Documentation

### Contents

- [Layout](#1---layout)
- [Color Theming](#2---color-theming)
  - [Background colors](#21---background-colors)
  - [Per-element styling](#22---per-element-styling)
  - [Additional themes](#23---additional-themes)
- [Utilities](#3---utilities)
  - [Gone](#31---gone)
  - [Row](#32---row)
  - [Flex grow](#33---flex-grow)
  - [Flip 180](#34---flip-180)
  - [No select](#35---no-select)
- [Text](#4---text)
  - [Adjusting space between lines](#41---adjusting-space-between-lines)
  - [Preventing text wrapping](#42---preventing-text-wrapping)
- [Anchor tags and links](#5---anchor-tags-and-links)
  - [Link styling](#51---link-styling)
- [Button tags](#6---button-tags)
- [Button styling](#7---button-styling)
- [Generic content templates](#8---generic-content-templates)

### 1 - Layout

This css template enables and requires `border-box` box sizing mode. Default
margin and padding is removed from all elements.

Divs, and all div-like elements (`<a>`, `<dialog>`, `<main>`, `<section>`,
`<button>`, etc.), use flex-box column layout. All elements will not flex shrink
by default.

### 2 - Color Theming

By default, everything will be in light theme (the `light-base` mixin is
appended to the stylesheet). Including `dark-base` outside of any selector
(applying it to the stylesheet) will apply dark theme for the whole page by
default.

```css
@use "css-template/import" as template;
@include template.dark-base;
```

#### 2.1 - Background colors

The background color of a div change be changed with `bg-paper-XX` (where `XX`
is 0, 10, 20, or 30). The body of the page has a background color of
`bg-paper-10` by default.

```css
@use "css-template/import" as template;
#header {
  @include template.bg-paper-30;
}
.notice-box {
  @include template.bg-paper-20;
}
```

#### 2.2 - Per-element styling

Regardless of the default theme, the theme inside each container can be changed
by including `light-div`/`dark-div` inside its selector. This leverages
cascading in CSS, and so will apply to all child elements unless one of them
also explicitly uses different theme, which is then consequentially apply to
_its_ children.

```css
@use "css-template/import" as template;
#foo {
  @include template.dark-div;
  @include template.bg-paper-20;
}
#bar {
  @include template.light-div;
  @include template.bg-paper-20;
}
```

```html
<div id="foo">
  <!-- @include template.dark-div; -->
  <button>Dark mode button</button>
  <div id="bar">
    <!-- @include template.light-div; -->
    <p>This div is in light-mode, inside a dark-mode div.</p>
    <button>Light mode button</button>
  </div>
  <button>Dark mode button</button>
  <div>
    <p>This div is still in dark-mode.</p>
  </div>
</div>
```

#### 2.3 - Additional themes

More than 2 themes are possible by creating a new set of swatches (e.g
`--clr-amoled-paper-100`, `--clr-amoled-ink-10`, etc.) for the new theme, see
`scss/_theme.scss` for implementation details.

### 3 - Utilities

The template provides a number of utility mixins, that can be optionally
assigned to classes for use inside the html.

#### 3.1 - Gone

Removes the element from the layout.

```css
@use "css-template/import" as template;
.gone {
  @include template.gone;
}
```

```html
<p class="gone">It's like it isn't here!</p>
```

#### 3.2 - Row

Makes the element a flex-box row container.

```css
@use "css-template/import" as template;
.row {
  @include template.row;
}
```

```html
<div class="row">
  <p>One</p>
  <p>Two</p>
  <p>Three</p>
</div>
```

#### 3.3 - Flex grow

Sets `flex-grow: 1;` to the element. Useful for making a gap in the center of a
flex container, pushing elements before to the start and elements after to the
end.

```css
@use "css-template/import" as template;
.flex-grow {
  @include template.flex-grow;
}
```

```html
<div class="row">
  <!-- This elements appear on the left side of the container. -->
  <p>One</p>
  <p>Two</p>

  <!-- Makes a gap here. -->
  <div class="flex-grow"></div>

  <!-- This element gets pushed to the far right. -->
  <p>Three</p>
</div>
```

#### 3.4 - Flip 180

Applies a rotate 180 degrees transform to this element.

```css
@use "css-template/import" as template;
.flip-180 {
  @include template.flip-180;
}
```

```html
<p class="flip-180">I'm upside down!</p>
```

#### 3.5 - No select

Prevents the user selecting the text in this element.

```css
@use "css-template/import" as template;
.no-select {
  @include template.no-select;
}
```

```html
<p class="no-select">I'm impossible to select!</p>
```

The `no-select-override` mixin is also available to undo the effects of
`no-select` in a more specific selector if needed.

### 4 - Text

Text will use color `--clr-ink-80` by default, and the font defined by
`--font-default`.

#### 4.1 - Adjusting space between lines

Some fonts appear too tight or loose in a block paragraph, so `--line-spacing`
can be adjusted to make text elements (`<p>`, `<h1>`, etc.) display it with more
space without ruining the bottom margin.

#### 4.2 - Preventing text wrapping

To constrain text to one line, and to enable ellipsis when text is too long,
wrap the text element (`<p>`, `<h1>`, etc.) in a div where the `one-line` is
applied.

```css
@use "css-template/import" as template;
#foo {
  @include template.one-line;
}
```

```html
<div id="foo">
  <p>This text will be locked to one line, and show ... when it's oversize.</p>
</div>
<p>And this text won't!</p>
```

### 5 - Anchor tags and links

`<a>` tags by default act as `<div>`s (no special styling). All button
styling can be applied to anchor tags too, making `<a>` and `<button>`
essentially interchangable.

#### 5.1 - Link styling

For text link styling, anchor tags must be placed inside paragraph tags, and
will again display themselves inline, rather than as a flexbox div.

```css
@use "css-template/import" as template;
.link {
  @include template.link;
}
```

```html
<p>
  You should <a class="link" href="/">click here</a> to return to the homepage.
</p>
```

Link styling will make the text and underline match the accent color by default.
To override the color, override the `--clr-accent` property for this element.

```css
@use "css-template/import" as template;
#foo {
  --clr-accent: red;
  @include template.link;
}
```

### 6 - Button tags

`<button>` tags by default act as `<div>`s (no special styling). All button
styling can be applied to button tags in the same way `<a>` tags support button
styling, making `<a>` and `<button>` essentially interchangable.

### 7 - Button styling

`<a>`, `<button>`, or even `<div>` tags can be styled to appear like buttons.

Many button styles assume the button's content will be able to react to
`--content-clr` changes, so the content for a button-styled element should
almost always be a [generic content](#generic-content) container.

Many button styles will also use the properties defined in the `:root` element,
which, being a css custom property, can be overriden for a certain button or
a container that has buttons inside. These are:

- `--btn-rounding` for how much border radius to use on the button's background
- `--btn-outline` for the thickness of the outline around the button (if applicable)

Example usage of a button, using generic content:

```css
@use "../import" as template;
button {
  /* Button styling */
  @include template.btn-hover;

  /* Use generic content template */
  @include template.content-text;
}
```

```html
<button>
  <p>Button</p>
</button>
```

For a subtle button effect this is invisible until hovered/focussed, the
`btn-hover` mixin is available. This button styling does **_not_** require
`--content-clr` support.

### 8 - Generic content templates

The `content-XX` mixins define generic layouts mainly designed for use with
buttons. The elements inside them color themselves according to a property
designed to be set in the parent element `--content-clr`.

This allows for the case where the parent element is a button that may
dramatically change color on hover, and therefore require its content to use
inverted colors during hover.
