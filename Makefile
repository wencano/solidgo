.PHONY: dev ui build generate

BIN ?= bin/solidgo

generate:
	@if ! command -v templ > /dev/null; then \
		echo "Installing templ..."; \
		go install github.com/a-h/templ/cmd/templ@v0.3.960; \
	fi
	templ generate -path .

dev:
	go run .

ui:
	cd vite-solid && npm run build

build: generate ui
	CGO_ENABLED=0 go build -o $(BIN) .

