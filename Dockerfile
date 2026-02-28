FROM node:20-alpine AS ui-builder

WORKDIR /app

COPY vite-solid/package.json vite-solid/package-lock.json ./vite-solid/
RUN cd vite-solid && npm ci

COPY vite-solid ./vite-solid
COPY src ./src
RUN cd vite-solid && npm run build

FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN apk add --no-cache git \
	&& go mod download

COPY . .
COPY --from=ui-builder /app/static ./static

RUN go install github.com/a-h/templ/cmd/templ@v0.3.960 \
	&& templ generate -path . \
	&& CGO_ENABLED=0 go build -o /solidgo .

FROM alpine:3.20

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

COPY --from=builder /solidgo /app/solidgo
COPY data-default.md /app/data-default.md

ENV PORT=9001
ENV DATA_FILE=/app/data/data.md
ENV DATA_DEFAULT_FILE=/app/data-default.md

EXPOSE 9001

CMD ["/app/solidgo"]
