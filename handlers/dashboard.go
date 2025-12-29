package handlers

import (
	"solidgo/modules/dashboard/views"

	"github.com/gofiber/fiber/v2"
)

func Dashboard(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/html; charset=utf-8")
	return views.Dashboard().Render(c.Context(), c.Response().BodyWriter())
}

