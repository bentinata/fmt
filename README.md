# Format

Main goal is to have formatting without hassle like `rustfmt`/`cargo fmt` or `gofmt`/`go fmt`.

# Installation & Usage

```sh
format [PATTERN ...]
```

With `PATTERN` being:
- file
- directory
- glob

Example:

```sh
format index.js src lib/*.js
```

This would format `index.js`,
all supported files inside `src/`,
and all `.js` files inside `lib/`.

You can use `npx` if you don't want to install:

```sh
npx @aia-sg/format [PATTERN ...]
```

Or install it with:

```sh
npm install --save-dev @aia-sg/format
```

Then use it:
```sh
./node_modules/.bin/format [PATTERN ...]
```

You can also put it in `package.json` scripts:

```json
{
  "scripts": {
    "format": "@aia-sg/format"
  }
}
```

And run it like:

```sh
npm run format [PATTERN ...]
```

# Extending

Have your own config and don't want to remove it?
You can extend this config.

## Prettier (Optional)

Use this if you want to integrate with plugins.
You need to use JS config instead of JSON/YAML.
Put this in your `.prettierrc.js`:

```js
module.exports = {
  ...require("@aia-sg/format").prettier,
};
```

## ESLint (Optional)

Use this if you want to integrate with plugins.
You need to use JS config instead of JSON/YAML.
Put this in your `.eslintrc.js`:

```js
module.exports = {
  ...require("@aia-sg/format").eslint,
};
```
