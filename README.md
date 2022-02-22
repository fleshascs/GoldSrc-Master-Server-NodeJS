# GoldSrc Master-Server on NodeJS

## Compile into linux executable

make sure to have a pkg installed

```sh
npm install -g pkg
```

```shell script
npm run build

npx pkg -t linux ./build/src/server.js
```

## Run with docker

```shell script
docker build -t fleshas/nodejs-master-server .
docker run -d -e PORT=27011 -p 27011:27011/udp  -v "/home/debian/ms/config.json5":/usr/app/config.json5 -v "/home/debian/ms/logs":/usr/app/logs --name ms fleshas/nodejs-master-server:latest
```
