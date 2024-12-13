## eslint-plugin-prefer-spelling

eslint plugin to enforce preferred spelling of words

### why?

i couldn't find any other eslint plugin and i just decided to make this because the others have way too many features for such a one-off thing.

### installation

you'll first need to install [eslint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

next, install `eslint-plugin-prefer-spelling`:

```sh
npm install eslint-plugin-prefer-spelling --save-dev
```

> [!NOTE]
> this plugin requires node.js version 18.17.1 or above.

### usage

add `prefer-spelling` to the plugins section of your `.eslintrc` configuration file. you can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "prefer-spelling"
    ]
}
```

then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "prefer-spelling/prefer-spelling": ["warn", {
            "words": {
                "color": "colour",
                "canceled": "cancelled"
            },
            "severity": "warn"
        }]
    }
}
```

### rule configuration

the rule takes an object with the following properties:

- `words`: an object where keys are the words to be replaced, and values are their preferred spellings.
- `severity`: the severity level of the rule. can be "error", "warn", or "info". defaults to "warn" if not specified.

### examples

```json
{
    "rules": {
        "prefer-spelling/prefer-spelling": ["error", {
            "words": {
                "color": "colour",
                "favorite": "favourite",
                "gray": "grey",
                "canceled": "cancelled"
            },
            "severity": "error"
        }]
    }
}
```

this configuration will report an error for uses of "color", "favorite", "gray", and "canceled", suggesting their british english spellings instead.

### features

- does the job
- provides auto-fix suggestions that may be stupid

### testing

to run the tests for this plugin that is very dreadful and i really do not want to revisit working this tests because i spent way too much time on it, use the following command:

```sh
npm test
```

### contributing

contributions are welcome! please feel free to submit a pull request.

### license

this project is licensed under the mit license.
