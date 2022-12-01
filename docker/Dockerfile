ARG npmToken

#
# Base environment
#
FROM node:16.13.1-alpine as base

RUN apk update --no-cache && \
    apk upgrade --no-cache

#
# Builder
#
FROM base as builder

ARG npmToken
ENV NPM_TOKEN=$npmToken

WORKDIR /build

COPY src ./src
COPY *.json *.lock *.js .npmrc ./

# yarn depends on bash and git
RUN apk add --no-cache bash git

# nest build
RUN mkdir .yarncache && \
    yarn install --network-timeout 1000000 --cache-folder .yarncache && \
    yarn build && \
    rm -rf node_modules && \
    yarn install --production=true --network-timeout 1000000 --cache-folder .yarncache && \
    rm -rf .yarncache

#
# Runtime
#
FROM base

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /build/dist dist
COPY --from=builder /build/node_modules node_modules
COPY --from=builder /build/package.json package.json

# Create a non-root user
RUN adduser -D system0 && \
    chown -R system0: /app

USER system0

EXPOSE 3000
EXPOSE 3001

ENTRYPOINT [ "yarn", "start:prod" ]