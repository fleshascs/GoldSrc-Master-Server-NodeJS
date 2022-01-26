# GoldSrc Master-Server with NodeJS

## Compile into linux binary

make sure to have a pkg installed

```sh
npm install -g pkg
```

```shell script
pkg -o ./bin/server -t linux server.js

```

## How to use screen

```shell script

// start master server
./start_ms_screen.sh

// Show running screens
screen -ls

// Restore screen session
screen -r 10835

// exit screen session
ctrl + a + d
```
