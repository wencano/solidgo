.PHONY: dev ui build generate

generate:
	@if ! command -v templ > /dev/null; then \
		echo "Installing templ..."; \
		go install github.com/a-h/templ/cmd/templ@latest; \
	fi
	templ generate -path .

dev:
	go run .

ui:
	npm run build

build: generate ui
	go build -o bin/solidgo .

