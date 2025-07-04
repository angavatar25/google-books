# How to run the project

## Run with node

Please make sure that you're running on v20.19++ or the latest version of node, as the latest Vite has dropped support for the older Node version (18.x.x)

Run this command line to run the project locally, but install dependency first

```cli
npm i
npm run dev
```

## Run with docker

Please change to the ``feature/docker-configuration`` to run the project with docker, make sure your computer have Docker installed

Then run this line command to run the project initially

```cli
docker compose up --build
```

Or this command if you already build the project prior

```cli
docker compose up
```
