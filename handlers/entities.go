package handlers

import (
	"solidgo/models"
	"solidgo/modules/entities/views"
	"solidgo/storage"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func ListEntities(c *fiber.Ctx) error {
	entities, err := storage.LoadEntities()
	if err != nil {
		return c.Status(500).SendString("Failed to load entities: " + err.Error())
	}
	c.Set("Content-Type", "text/html; charset=utf-8")
	return views.List(entities).Render(c.Context(), c.Response().BodyWriter())
}

func NewEntity(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/html; charset=utf-8")
	return views.New().Render(c.Context(), c.Response().BodyWriter())
}

func ViewEntity(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	entity, err := storage.FindEntityByID(id)
	if err != nil {
		return c.Status(500).SendString("Failed to load entity: " + err.Error())
	}
	if entity == nil {
		return c.Status(404).SendString("Entity not found")
	}
	c.Set("Content-Type", "text/html; charset=utf-8")
	return views.Details(*entity).Render(c.Context(), c.Response().BodyWriter())
}

func EditEntity(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	entity, err := storage.FindEntityByID(id)
	if err != nil {
		return c.Status(500).SendString("Failed to load entity: " + err.Error())
	}
	if entity == nil {
		return c.Status(404).SendString("Entity not found")
	}
	c.Set("Content-Type", "text/html; charset=utf-8")
	return views.Edit(*entity).Render(c.Context(), c.Response().BodyWriter())
}

func CreateEntity(c *fiber.Ctx) error {
	var entity models.Entity
	if err := c.BodyParser(&entity); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	if err := storage.CreateEntity(entity); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create entity: " + err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Entity created successfully"})
}

func UpdateEntity(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var entity models.Entity
	if err := c.BodyParser(&entity); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	if err := storage.UpdateEntity(id, entity); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update entity: " + err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Entity updated successfully"})
}

func DeleteEntity(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	if err := storage.DeleteEntity(id); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete entity: " + err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Entity deleted successfully"})
}

