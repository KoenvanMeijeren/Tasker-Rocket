# Tasker Rocket 🚀

The repository for Tasker Rocket 🚀, aka the new Tasker application.
This project aims to be a smart front-end for the Tasker-Rocket-content repository.
The content repository is responsible for providing the content.

## Installation

The installation is quite simple, just prepare the `.env` file,
run `npm install` and `npm run dev` and you are good to go.

First, copy the `.env.example` to `.env` and fill in the required values.
You might need to create a GitHub access token to be able to use this app.

```bash
cp .env.example .env
```

### Make GitHub access token

To be able to use the GitHub API you need to create a personal access token. This can be done by following the steps below:
1. Go to [GitHub](https://github.com) and login to your account.
2. Go to [Settings -> Developer Settings -> Tokens ](https://github.com/settings/tokens) and click on `Generate new token`.
3. Give the token a name and select the `repo` scope and `admin:org -> read:org` premissions.
4. Click on `Generate token` and copy the token to your clipboard.
5. Paste the token in the `.env` file.

![GitHub Permissions](assets/gh_prems.png)

Then install the dependencies of our project:

```bash
npm install
```

After installing the packages you can now run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Updates

It's important to keep our dependencies up to date, so packages 
should be updated regularly using the instructions below.

### Minor-updates

Minor-updates can be performed by using the command of below:

```bash
npm update
```

### Major-updates

Performing major-updates is a bit trickier, first identify the outdated dependencies.

```bash
npm outdated
```

Then update each package one-by-one by reinstalling it

```bash
npm install <packagename>@latest
```

#### Upgrade all packages at once

It can be quite cumbersome to upgrade each package manually,
the `npm-check-updates`-package can do this for us.

##### Usage

Show all new dependencies ([excluding peerDependencies](https://github.com/raineorshine/npm-check-updates/issues/951)) for the project in the current directory:

```bash
$ npx npm-check-updates --peer
Checking package.json
[====================] 5/5 100%

 eslint             7.32.0  →    8.0.0
 prettier           ^2.7.1  →   ^3.0.0
 svelte            ^3.48.0  →  ^3.51.0
 typescript         >3.0.0  →   >4.0.0
 untildify          <4.0.0  →   ^4.0.0
 webpack               4.x  →      5.x

Run npx npm-check-updates --peer -u to upgrade package.json
```

Upgrade a project's package file:

> **Make sure your package file is in version control and all changes have been committed.
> This _will_ overwrite your package file.**

```bash
$ npx npm-check-updates --peer -u
Upgrading package.json
[====================] 1/1 100%

 express           4.12.x  →   4.13.x

Run npm install to install new versions.
```
