# TryX

A package to simplify error handling and make fetching more predictable and easy to work with.

## Install package

Run the command below to install the package

```bash
npm i try-x
```

## How to use the package

To use this package some basic configuration is required

### Add cofig

To sutup a new TryX instance you should do something like this:

```ts
const tx = new TryX({
  timeout: 5000,
});
```
This sets up an instance to fetch data with. **A timeout is required**. Since we do not want to take control over the max duration before bailig out this configuration is required to be setup for every instance. Above example would abort after 5 seconds.

See the (examples folder)['/examples] for additional configuration options.

### Fetch data
After completing the config you can use your instance to fetch some data.

```ts
const { data, error } = await tx.fetch('api.some-company.com/data')
```

Note that data and an error are returned and ready for you to be handled. For example
```ts
const { data, error } = await tx.fetch('api.some-company.com/data')

if(error){
  // Handle your error as you wish
  toast.error(error.message);
  // Block any further actions
  return;
}

// If above was not executed that must mean we can continue with the data
console.log('Data:', data)
```

#### Adding types

You can add a type to your returned data by passing it to the fetch. For example:

```ts
const { data, error } = await tx.fetch<Todo>('api.some-company.com/data')
```
`data` will now be typed as a Todo

#### Overriding the return names

In some cases you might get a conflict with one of the contants. For example, if data was already defined in your file. In this case you can overrride the names like so:

```ts
const { data: someNewDataName, error: someNewErrorName } = await tx.fetch('api.some-company.com/data')
```

This will resolve the conflict and your data now becomes accessible under the newly assigned name.

## Recommended structure

Although you are free to use the package however you like we do have some recommendations.

### Store you instance in a file

Although you could create an instance in any file you would like to use the package, we recommend you set it up in a seperate file and export the ready to cuse constant. For example:

```ts
// in /lib/tx.ts

export const tx = new TryX({
  timeout: 5000,
})

// in /some-path/index.ts
import { tx } from '@/lib/tx'

const { data, error } = tx.fetch(...)
```

This will ensure you just have to maintain one instance instead of multiple.