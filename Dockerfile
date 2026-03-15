FROM golang:1.24-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git make nodejs npm

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN cd vite-solid && npm ci \
	&& cd .. && make build BIN=/solidgo

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
