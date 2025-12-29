package models

type Notification struct {
	ID        int    `json:"id"`
	Message   string `json:"message"`
	Type      string `json:"type"`
	Read      bool   `json:"read"`
	CreatedAt string `json:"created_at"`
}

