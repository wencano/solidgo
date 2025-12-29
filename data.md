# Entities and Fields Data

## Entity: User

- **ID**: 1
- **Name**: User
- **Fields**:
  - `id` (number, required)
  - `email` (email, required)
  - `name` (text, optional)

## Entity: Product

- **ID**: 2
- **Name**: Product
- **Fields**:
  - `id` (number, required)
  - `title` (text, required)
  - `price` (number, required)
  - `description` (textarea, optional)

## Field Types

Available field types:
- `text` - Single-line text input
- `number` - Numeric input
- `email` - Email address input
- `textarea` - Multi-line text input
- `date` - Date picker
- `boolean` - Checkbox/boolean value

## Entity Structure

```json
{
  "id": 1,
  "name": "EntityName",
  "fields": [
    {
      "name": "fieldName",
      "type": "text|number|email|textarea|date|boolean",
      "required": true|false
    }
  ]
}
```

## Entity Data (JSON)

```json
[
  {
    "id": 1,
    "name": "User",
    "fields": [
      {
        "name": "id",
        "type": "number",
        "required": true
      },
      {
        "name": "email",
        "type": "email",
        "required": true
      },
      {
        "name": "name",
        "type": "text",
        "required": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Product",
    "fields": [
      {
        "name": "id",
        "type": "number",
        "required": true
      },
      {
        "name": "title",
        "type": "text",
        "required": true
      },
      {
        "name": "price",
        "type": "number",
        "required": true
      },
      {
        "name": "description",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "id": 3,
    "name": "Customer",
    "fields": [
      {
        "name": "id",
        "type": "number",
        "required": false
      },
      {
        "name": "name",
        "type": "text",
        "required": false
      },
      {
        "name": "name_last",
        "type": "text",
        "required": false
      },
      {
        "name": "name_middle",
        "type": "text",
        "required": false
      },
      {
        "name": "name_first",
        "type": "text",
        "required": false
      },
      {
        "name": "status",
        "type": "number",
        "required": false
      },
      {
        "name": "description",
        "type": "textarea",
        "required": false
      },
      {
        "name": "created_at",
        "type": "date",
        "required": false
      },
      {
        "name": "updated_at",
        "type": "date",
        "required": false
      },
      {
        "name": "trashed_at",
        "type": "date",
        "required": false
      },
      {
        "name": "created_by",
        "type": "number",
        "required": false
      },
      {
        "name": "updated_by",
        "type": "number",
        "required": false
      },
      {
        "name": "trashed_by",
        "type": "number",
        "required": false
      }
    ]
  }
]
```

## Notifications Data (JSON)

```json
[
  {
    "id": 1,
    "message": "Welcome to SolidGo! Your application is ready.",
    "type": "info",
    "read": false,
    "created_at": "2024-12-29T10:00:00Z"
  },
  {
    "id": 2,
    "message": "New entity 'Product' was created successfully.",
    "type": "success",
    "read": false,
    "created_at": "2024-12-29T11:30:00Z"
  },
  {
    "id": 3,
    "message": "System maintenance scheduled for tonight at 2 AM.",
    "type": "warning",
    "read": true,
    "created_at": "2024-12-29T09:00:00Z"
  }
]
```

