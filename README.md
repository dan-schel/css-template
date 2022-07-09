# CSS Template

My standard template for CSS styling with SASS.

## Usage

Clone this repo as a git submodule in the area with your sass files. Then use:
`@use "css-template/import" as template` to import the styles from the template.

## Documentation

### Layout

This css template enables and requires `border-box` box sizing mode. Default
margin and padding is removed from all elements.

Divs, and all div-like elements (`<a>`, `<dialog>`, `<main>`, `<section>`,
`<button>`, etc.), use flex-box column layout. All elements will not flex shrink
by default.

### Color Themeing

By default, everything will be in light theme (the `light-base` mixin is
appended to the stylesheet). Including `dark-base` outside of any selector
(applying it to the stylesheet) will apply dark theme for each element by
default.

```css
@use "css-template/import" as template;
@include template.dark-base;
```

### Background colors

The background color of a div change be changed with `bg-paper-XX` (where XX is
0, 10, 20, or 30). The body of the page has a background color of `bg-paper-10`
by default.

```css
@use "css-template/import" as template;
#header {
  @include template.bg-paper-30;
}
.notice-box {
  @include template.bg-paper-20;
}
```

#### Per-element styling

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

#### Additional themes

More than 2 themes are possible by creating a new set of swatches (e.g
`--clr-amoled-paper-100`, `--clr-amoled-ink-10`, etc.) for the new theme, see
`scss/_theme.scss` for implementation details.

### Utilities

The template provides a number of utility mixins, that can be optionally
assigned to classes for use inside the html.

#### Gone

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

#### Row

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

#### Flex grow

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

#### Flip 180

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

#### No select

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

### Text

Text will use color `--clr-ink-80` by default, and the font defined by
`--font-default`.

#### Adjusting space between lines

Some fonts appear too tight or loose in a block paragraph, so `--line-spacing`
can be adjusted to make text elements (`<p>`, `<h1>`, etc.) display it with more
space without ruining the bottom margin.

#### Preventing text wrapping

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

### Anchor tags and links

Anchor tags by default act as divs without special styling. All button styles
can be applied to anchors tags too, making `<a>` and `<button>` essentially
interchangable.

#### Link styling

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
