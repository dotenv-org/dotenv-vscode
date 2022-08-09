# DEVELOPMENT

## Setup

```
npx dotenv-vault pull
```

## Tests

```
npm test
```

## Packaging

Package it locally.

```
npm run package
```

## Installing

Install it locally.

```
npm run install-package dotenv-vscode-x.x.x.vsix
```

or install it by hand through Visual Studio Code.

Click `Extensions` > `...` > `Install from VSIX` > `Select dotenv-vscode-*-*-*.vsix`

[1] https://community.particle.io/t/how-to-install-a-vscode-extension-from-a-vsix-file/51014
[2] https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix

## Publishing

For those with access.

```
npm run publish
```

[1] https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions
[2] https://marketplace.visualstudio.com/manage/publishers/dotenv
