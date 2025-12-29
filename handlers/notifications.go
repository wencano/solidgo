package handlers

import (
	"solidgo/storage"

	"github.com/gofiber/fiber/v2"
)

func GetNotifications(c *fiber.Ctx) error {
	notifications, err := storage.LoadNotifications()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to load notifications: " + err.Error()})
	}
	return c.JSON(notifications)
}

