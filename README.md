# CSS Template

My standard template for CSS styling written in SASS.

Many styles are implemented using mixins to avoid cluttering up the namespace
with lots of classes, and to keep the CSS file smaller when not many styles are
being used. However simply importing this library into your project will include
some amount of CSS that sets up the essentials (e.g. color palettes, configuring
box sizing, etc.).

## Usage

Clone this repo as a git submodule in the area with your sass files. Then use...

```css
@use "css-template/import" as template;
```

...to import the styles from the template.

## Documentation

See [`documentation.md`](/documentation.md) for documentation.

## Known issues

- Input/select outlines are not curved on Safari.
- Cursor doesn't become pointer on safari
- Hover doesn't work on Safari for input buttons or input fields, but does for select?
- Date/time input text on Safari is blue?
