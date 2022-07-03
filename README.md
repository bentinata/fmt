# Usage

## CLI

```sh
npx @aia-sg/format [...PATTERN]
```

```sh
format [...PATTERN]
```

Example:

```sh
format index.js src lib/*.js
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
npm run format
```

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
