# SolidGo - Experimental Framework

**An experimental full-stack framework** combining Go Fiber, Templ, and SolidJS for server-side rendering with client-side interactivity.

This is a proof-of-concept framework exploring the integration of:
- **Go Fiber** - Fast HTTP web framework
- **Templ** - Type-safe HTML templating
- **SolidJS** - Reactive UI library
- **Vite** - Build tool for SolidJS
- **Tailwind CSS** - Utility-first CSS framework

⚠️ **Note**: This is an experimental project and should not be used in production without thorough testing and evaluation.

## Features

- **Server-Side Rendering** with Go Fiber and Templ
- **Client-Side Interactivity** with SolidJS
- **Page-Specific Bundles** - Each page has its own optimized JavaScript bundle
- **Dashboard** - Comprehensive dashboard with stats, activity feed, and metrics
- **Dynamic Forms** - Create and edit entities with dynamic field management
- **State Management** - SolidJS signals for reactive UI updates
- **Static Asset Caching** - Browser caching for optimal performance
- **Request Logging** - Runtime logging for all HTTP requests
- **Notifications** - Global notification dropdown with real-time updates

## Project Structure

```
solidgo/
├── main.go                      # Fiber server entry point
├── handlers/                    # HTTP request handlers
│   ├── dashboard.go
│   ├── entities.go
│   └── notifications.go
├── models/                      # Data models
│   ├── entity.go
│   └── notification.go
├── modules/                     # Modular view structure
│   ├── dashboard/
│   │   └── views/
│   │       └── dashboard.templ
│   └── entities/
│       └── views/
│           ├── list.templ
│           ├── new.templ
│           ├── edit.templ
│           └── details.templ
├── templates/                   # Shared templates
│   ├── layout.templ             # Global layout with navbar
│   └── helpers.go               # Template helper functions
├── src/                         # SolidJS source files
│   ├── dashboard.tsx            # Dashboard component
│   ├── dashboard-index.tsx      # Dashboard entry point
│   ├── entities-list.tsx
│   ├── entities-new.tsx
│   ├── entities-edit.tsx
│   ├── entities-view.tsx
│   ├── navbar.tsx               # Notifications dropdown
│   └── input.css                # Tailwind CSS
├── storage/                     # Data persistence
│   ├── entities.go
│   └── notifications.go
├── static/                      # Built static assets (generated)
│   ├── assets/                  # CSS files
│   └── js/                      # JavaScript bundles
├── Makefile
├── .air.toml                    # Air hot reload config
└── data.md                      # Entities and notifications data store
```

## Setup

### Prerequisites

- Go 1.21+
- Node.js 18+
- npm or yarn

### Installation

1. Install Go dependencies:
```bash
go mod download
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Generate Templ files:
```bash
make generate
```

4. Build SolidJS assets:
```bash
make ui
```

## Development

### Run Go server with hot reload:
```bash
make dev
```

This will:
- Install `air` if not present
- Generate Templ files recursively
- Start the server with hot reload on port 3000
- Watch for changes in `.go` and `.templ` files

### Build SolidJS assets:
```bash
make ui
```

This will:
- Install npm dependencies
- Build all page-specific bundles to `static/js/`
- Process Tailwind CSS

### Build everything:
```bash
make build
```

This builds both Go binary and SolidJS assets.

## Routes

### Pages
- `GET /` - Dashboard (stats, activity, metrics)
- `GET /entities` - List all entities (table view with side panel)
- `GET /entities/new` - Create new entity (dynamic form)
- `GET /entities/:id` - View entity (side panel in table view)
- `GET /entities/:id/edit` - Edit entity (dynamic form)

### API
- `POST /entities` - Create entity
- `PUT /entities/:id` - Update entity
- `DELETE /entities/:id` - Delete entity
- `GET /api/notifications` - Get notifications list (JSON)

## How It Works

1. **Server-Side**: Go Fiber serves HTML pages rendered with Templ templates
2. **Client-Side**: SolidJS components hydrate the page and manage interactive state
3. **Data Flow**: Entity data is serialized to JSON in data attributes, which SolidJS reads on mount
4. **State Management**: SolidJS signals manage form state, field lists, and UI interactions
5. **Static Assets**: Files are served with cache headers (1 year for versioned assets, 1 day for others)
6. **Request Logging**: All requests are logged with timestamp, status, duration, IP, method, and path

## Data Model

### Entities
Entities have:
- `id` - Unique identifier
- `name` - Entity name
- `fields` - Array of field definitions

### Fields
Fields have:
- `name` - Field name
- `type` - Field type (text, number, email, textarea, date, boolean)
- `required` - Whether the field is required

### Notifications
Notifications have:
- `id` - Unique identifier
- `message` - Notification message
- `type` - Notification type (info, warning, error, success)
- `read` - Read status
- `created_at` - Timestamp

## Data Storage

Data is stored in `data.md` using JSON blocks:
- Entities are stored in a "Entities Data (JSON)" section
- Notifications are stored in a "Notifications Data (JSON)" section

The storage package handles reading and writing to these JSON blocks while preserving the markdown structure.

## Performance

- **Static Asset Caching**: CSS, JS, images, and fonts are cached for 1 year with `immutable` directive
- **Page-Specific Bundles**: Each page loads only its required JavaScript
- **Server-Side Rendering**: Initial HTML is rendered on the server for fast first paint
- **Request Logging**: All requests are logged with runtime metrics

## Request Logging Format

```
HH:MM:SS | STATUS | DURATION | IP | METHOD | PATH | -
```

Example:
```
17:25:57 | 200 |   24.957584ms | 127.0.0.1 | GET | /entities/loan_products | -
```

## Technologies

- **Go Fiber** - Fast HTTP web framework
- **Templ** - Type-safe HTML templating
- **SolidJS** - Reactive UI library
- **Vite** - Build tool for SolidJS
- **Tailwind CSS** - Utility-first CSS framework
- **Air** - Live reload for Go applications
