package main

import (
	"embed"
	"fmt"
	"log"
	"net/http"
	"solidgo/handlers"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

//go:embed static/**/*
var staticFiles embed.FS

/**
 * main
 *
 * Entry point for the Fiber server application
 *
 * Sets up routes and starts the server on port 3000
 */
func requestLogger(c *fiber.Ctx) error {
	start := time.Now()
	
	err := c.Next()
	
	duration := time.Since(start)
	status := c.Response().StatusCode()
	ip := c.IP()
	method := c.Method()
	path := string(c.Request().URI().Path())
	
	timestamp := time.Now().Format("15:04:05")
	
	fmt.Printf("%s | %d | %12.6fms | %s | %s | %s | -\n",
		timestamp,
		status,
		float64(duration.Nanoseconds())/1e6,
		ip,
		method,
		path,
	)
	
	return err
}

func staticCache(c *fiber.Ctx) error {
	path := string(c.Request().URI().Path())
	
	if len(path) > 8 && path[:8] == "/static/" {
		if len(path) > 13 {
			ext4 := path[len(path)-4:]
			ext5 := ""
			if len(path) > 14 {
				ext5 = path[len(path)-5:]
			}
			
			if ext4 == ".css" || ext4 == ".js" || ext4 == ".png" || ext4 == ".jpg" || ext4 == ".gif" || ext4 == ".svg" || ext4 == ".ico" || ext4 == ".webp" || ext4 == ".woff" || ext4 == ".ttf" || ext4 == ".eot" {
				c.Set("Cache-Control", "public, max-age=31536000, immutable")
			} else if ext5 == ".woff2" || ext5 == ".jpeg" {
				c.Set("Cache-Control", "public, max-age=31536000, immutable")
			} else {
				c.Set("Cache-Control", "public, max-age=86400")
			}
		} else {
			c.Set("Cache-Control", "public, max-age=86400")
		}
	}
	
	return c.Next()
}

func main() {
	app := fiber.New()

	app.Use(requestLogger)

	app.Use("/static", staticCache)
	app.Use("/static", filesystem.New(filesystem.Config{
		Root:       http.FS(staticFiles),
		PathPrefix: "static",
	}))

	app.Get("/", handlers.Dashboard)

	app.Get("/entities", handlers.ListEntities)
	app.Get("/entities/new", handlers.NewEntity)
	app.Get("/entities/:id", handlers.ViewEntity)
	app.Get("/entities/:id/edit", handlers.EditEntity)
	app.Post("/entities", handlers.CreateEntity)
	app.Put("/entities/:id", handlers.UpdateEntity)
	app.Delete("/entities/:id", handlers.DeleteEntity)

	app.Get("/api/notifications", handlers.GetNotifications)

	log.Println("Server starting on :9001")
	log.Fatal(app.Listen(":9001"))
}

