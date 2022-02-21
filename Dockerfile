FROM node:16-alpine AS BUILD_IMAGE
WORKDIR /usr/app
COPY . /usr/app

RUN npm install && npm run build
RUN npm install -g pkg

RUN npx pkg -o ./server -t node16-alpine-x64 ./build/src/server.js

FROM alpine:3.15
WORKDIR /usr/app

COPY --from=BUILD_IMAGE /usr/app/server ./
COPY --from=BUILD_IMAGE /usr/app/config.json5 ./

CMD ["./server"]

