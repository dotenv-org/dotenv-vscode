<div align="center">

  <p>
    <sup>
      <a href="https://marketplace.visualstudio.com/items?itemName=dotenv.dotenv-vscode">
        <img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vscode/master/media/install.svg" alt="Install from Visual Studio Marketplace">
      </a>
    </sup>
  </p>

</div>

<div align="center">
  <img src="https://res.cloudinary.com/dotenv-org/image/upload/v1662069726/vscode1_vhzand.png"/>
  <hr/>
  <img src="https://res.cloudinary.com/dotenv-org/image/upload/v1662069727/vscode2_h5hh42.png"/>
  <hr/>
  <img src="https://res.cloudinary.com/dotenv-org/image/upload/v1662069727/vscode3_fhioqq.png"/>
  <hr/>
  <img src="https://res.cloudinary.com/dotenv-org/image/upload/v1662069726/vscode4_ejlsh9.png"/>
</div>

<h1 align="center">
  <a href="https://docs.dotenv.org?r=1"><img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" alt="dotenv-vscode" width="80" height="80" ></a>
  <br>
  Dotenv Official (with Vault) for VSCode <a href="https://twitter.com/intent/tweet?text=dotenv-vscode%20-%20sync%20environment%20variables%2C%20securely%20https%3A%2F%2Fgithub.com%2Fdotenv-org%2Fdotenv-vscode&hashtags=dotenv"><img src="https://img.shields.io/badge/Tweet--lightgrey?logo=twitter&style=social" alt="Tweet" height="20"/></a>
  <br>
</h1>

<h4 align="center">Official Dotenv. Syntax highlighting, autocompletion, in-code secret peeking, and .env file syncing with Dotenv Vault.</h4>

<p align="center">
  <a href="#install">Install</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="#usage">Usage</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="#how-it-works">How It Works</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="#commands" target="_blank">Commands</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="#health" target="_blank">Health</a>
  <img src="https://img.spacergif.org/v1/spacer.gif" width="5" height="1">
  <a href="#changelog">Changelog</a>
</p>

<img src="https://img.spacergif.org/v1/spacer.gif" width="1" height="10">

<a href="https://github.com/dotenv-org/dotenv-vscode"><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vscode/master/dotenv-vscode.png"></a>

<p align="center">
<strong>Dotenv Vault with VSCode</strong> securely syncs your .env files across your machines, environments, and team members. Stop sharing .env files over insecure channels like Slack and email - from the same people that pioneered <a href="https://github.com/motdotla/dotenv">dotenv</a>.
</p>

<p align="center">
<a href="https://github.com/dotenv-org/dotenv-vscode"><img src="https://img.shields.io/visual-studio-marketplace/v/dotenv.dotenv-vscode?label=VS%20Marketplace&logo=visual-studio-code" alt="Version"></a>
</p>

## Install

Install using VSCode Command Palette

1. Go to `View -> Command Palette` or press `Ctrl+Shift+P`
2. Then enter `Install Extension`
3. Search for `Dotenv`
4. Select `Official Dotenv | Vault` and click `Install`

## Usage

Usage is similar to git. Run `CMD+Shift+P` (or `Ctrl+Shift+P`) and start typing `dotenv`.


```bash
dotenv new
```

Follow those instructions and then run:

```bash
dotenv login
```

Then run push and pull

```bash
dotenv push
dotenv pull
```

See it in action:

<img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vscode/master/overview.gif">

## How It Works

<strong>Dotenv Vault</strong> holds your secrets in a secure and sophisticated way. Here's how it works.

<a href="https://www.dotenv.org/docs/security/dotenv-vault"><img src="https://raw.githubusercontent.com/dotenv-org/dotenv-vault/master/how-dotenv-vault-works.png" alt="How dotenv-vault works" width="500"/></a>

#### Security Specifications

* The Dotenv Vault is a separate datastore from the application database. This way if an attacker gains access to the application database they do not gain access to the vault datastore.
* The Dotenv Vault datastore is not accessible via the internet and all external connections are prevented. This way an attacker can not remotely access the Dotenv Vault datastore.
* Encrypted clients are required and these clients have to go through the application - which has its own layers of encryption.
* There are stricter TLS requirements for connecting to the Dotenv Vault datastore. TLS 1.0 cannot be used to connect.
* The secrets stored in the Dotenv Vault are not just encrypted at the datastore level. They are also encrypted at each VALUE. This way even if an attacker gains access to the datastore they could not make sense of the encrypted values.
* The VAULT does NOT store the KEY. It ONLY stores the VALUE. The KEY is stored in the application database and a shared pointer (in both datastores) allows them to be identified as a pair. This way an attacker must gain access to both the application database and the Dotenv Vault datastore to make sense of the values.
* The encryption key(s) used to encrypt the secret values are rotated on an unpublished schedule. This way an attacker might gain access to an old encryption key but not the most recent - foiling their ability to decrypt the secret values.
* Encryption uses AES-GCM encryption. It is a well-studied, NIST recommended, and IEFT standard algorithim.
* As you see, we go to great lengths to make sure your secrets are safe. Afterall, we keep our secrets here as well.

We hope you like <strong>Dotenv Vault</strong> as much as we do.

Visit [dotenv.org/docs](https://www.dotenv.org/docs/security/overview?r=1) to learn more.

## Commands

```
dotenv new       Create your project
dotenv login     Log in to dotenv-vault
dotenv logout    Log out
dotenv open      Open project page
dotenv push      Push .env securely
dotenv pull      Pull .env securely
dotenv versions  List version history
dotenv whoami    Display the current logged in user
dotenv status    Check dotenv-vault operational status
```

Visit [dotenv.org/docs](https://www.dotenv.org/docs/dotenv-vault?r=1) for details per command.

## Health

![](https://api.checklyhq.com/v1/badges/checks/c2fee99a-38e7-414e-89b8-9766ceeb1927?style=flat&theme=dark&responseTime=true)
<br>
![](https://api.checklyhq.com/v1/badges/checks/4f557967-1ed1-486a-b762-39a63781d752?style=flat&theme=dark&responseTime=true)
<br>
![](https://api.checklyhq.com/v1/badges/checks/804eb6fa-6599-4688-a649-7ff3c39a64b9?style=flat&theme=dark&responseTime=true)
<br>
![](https://api.checklyhq.com/v1/badges/checks/6a94504e-e936-4f07-bc0b-e08fee2734b3?style=flat&theme=dark&responseTime=true)
<br>
![](https://api.checklyhq.com/v1/badges/checks/06ac4f4e-3e0e-4501-9987-580b4d2a6b06?style=flat&theme=dark&responseTime=true)
<br>
![](https://api.checklyhq.com/v1/badges/checks/0ffc1e55-7ef0-4c2c-8acc-b6311871f41c?style=flat&theme=dark&responseTime=true)

Visit [health.dotenv.org](https://health.dotenv.org) for more information.

## CHANGELOG

See [CHANGELOG](CHANGELOG.md)

## Acknowledgements

- [Iron Geek](https://github.com/IronGeek/vscode-env)
