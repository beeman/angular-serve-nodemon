# Angular Build Architect for nodemon

Run a script using nodemon in an Angular CLI workspace.

## Installation


```
npm i @beeman/angular-serve-nodemon
```


## Usage

In order to use this 'builder', add a new project of type 'application' to the Angular CLI config.

In this example our project is called `api` and located in `src/api`. Adjust where needed.

### Add an entry to projects in `angular.json`


```json
{
  "projects": {
    "api": {
      "root": "src/api",
      "projectType": "application",
      "architect": {
        "serve": {
          "builder": "@beeman/angular-serve-nodemon:run",
          "options": {
            "script": "src/api/src/index.ts",
            "tsConfig": "src/api/tsconfig.server.json"
          }
        }
      }
    }
  }
}
```

### Implement project files

###### src/api/src/index.ts

```typescript
console.log('Hello World')
```

###### src/api/tsconfig.server.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "module": "commonjs"
  },
  "include": [
    "**/*.ts"
  ]
}
```

### Run the new project

```
ng serve api
```

Should output:

```
[nodemon] 1.18.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `ts-node --project src/api/tsconfig.server.json src/api/src/index.ts`
hello world
[nodemon] clean exit - waiting for changes before restart
```

# MIT License
