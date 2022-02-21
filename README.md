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
docker build -t master_server .

docker run -e PORT=27011 -p 27011:27011/udp -v "C:\Users\RYZEN\Desktop\workplace\GoldSrc-Master-Server-NodeJS\logs":/usr/app/logs --name ms master_server:latest
```
