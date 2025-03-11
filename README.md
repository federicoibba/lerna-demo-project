# Demo Project - Monorepo and Lerna

This is an hands-on project to help familiarize with Monorepos and Lerna.
The repository consist in two libraries:
- **@monorepo/core (v1.0.3)**: a fake server that returns the current date, if a client is connected to it;
- **@monorepo/client (v3.8.18)**: a silly client that will connect to the core and ask for the current date, printing it in the console.

The concept behind this project is interact with versioning and multiple libraries, with two possible approaches:
1. **common version**: every library follows the same versioning;
2. **individual version**: each library implements its own version.

All the examples will take advantage of the adoption of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) in order to:
- understand the next version the libraries will bump;
- create a proper changelog.

## Before to start

First of all, you need to:
1. Clone the project
    ```bash
    git clone https://github.com/federicoibba/lerna-demo-project.git
    ```
2. Install the dependencies
    ```bash
    npm i
    ```

## Setup Lerna

To install Lerna in the project, you just need to run:
```bash
npx lerna init
```

This command will:
- install the needed dependencies
- create a [lerna.json](https://lerna.js.org/docs/api-reference/configuration) file used as configuration file.

Edit the `lerna.json` in order to have the following structure:

```json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "0.0.0",
  "command": {
    "version": {
      "conventionalCommits": true
    }
  }
}
```

Then, commit the changes with, for instance:
```bash
git add . && git commit -m "build: setup lerna"
```

Let's pretend that we need a do an urgent fix in `@monorepo/core`, because the epoch was needed, not a string date.
Go to `/core/index.js` and change row 20, returning instead `new Date().getTime()`, then commit using a fix commit message:

```bash
git add core/index.js && git commit -m "fix: current date"
```
## Use cases
### Case 1. Common version
At this point, you may want to release the new library version. 
We will use two options that, for this demo project, prevent some errors and will help us focus on the versioning. Run hence:

```bash
npx lerna version --no-git-tag-version --no-push
```

Lerna will ask eventually if you are sure that the changes are correct, printing the future versions:
```
Changes:
 - @monorepo/client: 3.8.18 => 3.8.19
 - @monorepo/core: 1.0.3 => 3.8.19
```

In this case, which is the default behavior called [Fixed/Locked](https://lerna.js.org/docs/features/version-and-publish#fixedlocked-mode-default), Lerna will see that the versions are highly different, conciliating the versions. 

### Case 2. Independent version
Let's say that the requirement is to keep the versioning different, then it's enough to just edit the `lerna.json` file and change the version row with `independent` instead of `0.0.0`.

Also this time, run:

```bash
npx lerna version --no-git-tag-version --no-push
```

Lerna will propose a different bump strategy based on the independent key previously set, showing the following prompt:

```
Changes:
 - @monorepo/client: 3.8.18 => 3.8.19
 - @monorepo/core: 1.0.3 => 1.0.4
```

## Read more

If you want to deep dive more on how the versioning works in Lerna, (follow this link)(https://lerna.js.org/docs/features/version-and-publish#fixedlocked-mode-default).