# @bentinata/fmt

Main goal is to have formatting without hassle like `rustfmt`/`cargo fmt` or `gofmt`/`go fmt`.

# Installation & Usage

```sh
fmt [PATTERN ...]
```

With `PATTERN` being:

- file
- directory
- glob

Running without specifying `PATTERN` would run as if `PATTERN` is `.` (`fmt .`),
and would run recursively on all file within current directories.

Example:

```sh
fmt index.js src lib/*.js
```

This would format `index.js`,
all supported files inside `src/`,
and all `.js` files inside `lib/`.

Install it with:

```sh
npm install --save-dev @bentinata/fmt
```

Then use it:

```sh
./node_modules/.bin/fmt [PATTERN ...]
```

You can also put it in `package.json` scripts:

```json
{
  "scripts": {
    "fmt": "@bentinata/fmt"
  }
}
```

And run it like:

```sh
npm run fmt [PATTERN ...]
```

Note:
`npx` cannot be used because `eslint` require plugin to be installed.
[Read more about it here.](https://github.com/eslint/rfcs/pull/5)

# Running `eslint` yourself / Extending (Optional)

`fmt` job is just to format.
If you want to know what the `eslint` error is, you need to run it yourself.

## `eslint`:

You need to use JS config instead of JSON/YAML.
Put this in your `.eslintrc.js`:

```js
module.exports = require("@bentinata/fmt").eslint;
```

Or, if you want to extend it with your own config:

```js
module.exports = {
  ...require("@bentinata/fmt").eslint,
};
```

## `prettier`:

Same as `eslint`.
You need to use JS config instead of JSON/YAML.
Put this in your `.prettierrc.js`:

```js
module.exports = require("@bentinata/fmt").prettier;
```
