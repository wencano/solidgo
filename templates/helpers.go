package templates

import (
	"encoding/json"
	"os"
	"regexp"
	"solidgo/models"
)

func EntitiesJSON(entities []models.Entity) string {
	data, _ := json.Marshal(entities)
	return string(data)
}

func EntityJSON(entity models.Entity) string {
	data, _ := json.Marshal(entity)
	return string(data)
}

func GetCSSPath() string {
	assetsDir := "static/assets"
	files, err := os.ReadDir(assetsDir)
	if err != nil {
		return "/static/assets/style.css"
	}

	pattern := regexp.MustCompile(`^style.*\.css$`)
	for _, file := range files {
		if !file.IsDir() && pattern.MatchString(file.Name()) {
			return "/static/assets/" + file.Name()
		}
	}

	return "/static/assets/style.css"
}

func GetPageScriptTag(pageScript string) string {
	if pageScript == "" {
		return ""
	}
	return `<script type="module" src="` + pageScript + `"></script>`
}

func HasPageScript(pageScript string) bool {
	return pageScript != ""
}
