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

ENV NODE_ENV=production

WORKDIR /build

COPY src ./src
COPY *.json *.lock *.js ./

# yarn depends on bash and git
RUN apk add --no-cache bash git

# nest build
RUN npm install && \
    npm run build 

#
# Runtime
#
FROM base

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /build/dist dist
COPY --from=builder /build/node_modules node_modules
COPY --from=builder /build/package.json package.json
COPY --from=builder /build/tsconfig.json tsconfig.json
COPY --from=builder /build/nest-cli.json nest-cli.json

# Create a non-root user
RUN adduser -D myuser && \
    chown -R myuser: /app

USER myuser

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
