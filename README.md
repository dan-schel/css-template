# CSS Template

My standard template for CSS styling with SASS.

## Usage

Clone this repo as a git submodule in the area with your sass files. Then use...

```css
@use "css-template/import" as template;
```

...to import the styles from the template.

## Documentation

See [`documentation.md`](/documentation.md) for documentation.

## Known Issues

- Input/select outlines are not curved on Safari.
- Cursor doesn't become pointer on safari
- Hover doesn't work on Safari for input buttons or input fields, but does for select?
- Date/time input text on Safari is blue?
