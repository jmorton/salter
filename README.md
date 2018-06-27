# Salter

## Getting Started

Install dependencies.

```
yarn install
```

Generate an SSL certificate for your host, change HOST to something sensible
for yourself.

```
export $HOST="local.jonmorton.me"
npx devcert $HOST
```

Start webpack-serve.

```
npx webpack-serve
```
