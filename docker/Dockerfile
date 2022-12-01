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

WORKDIR /build

COPY src ./src
COPY *.json *.lock *.js ./

# yarn depends on bash and git
RUN apk add --no-cache bash git

# nest build
RUN npm install && \
    npm run build && \
    rm -rf node_modules && \
    npm ci

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
RUN adduser -D myuser && \
    chown -R myuser: /app

USER myuser

EXPOSE 3000
EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]
