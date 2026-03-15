package templates

import (
	"encoding/json"
	"io/fs"
	"os"
	"regexp"
	"solidgo/models"
)

var cssPath = "/static/assets/style.css"

var cssFilePattern = regexp.MustCompile(`^style.*\.css$`)

func SetCSSPath(path string) {
	if path != "" {
		cssPath = path
	}
}

func EntitiesJSON(entities []models.Entity) string {
	data, _ := json.Marshal(entities)
	return string(data)
}

func EntityJSON(entity models.Entity) string {
	data, _ := json.Marshal(entity)
	return string(data)
}

func CSSPathFromAssets(entries []fs.DirEntry) string {
	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		if cssFilePattern.MatchString(entry.Name()) {
			return "/static/assets/" + entry.Name()
		}
	}
	return ""
}

func GetCSSPath() string {
	if path := cssPathFromDir("static/assets"); path != "" {
		return path
	}
	return cssPath
}

func cssPathFromDir(dir string) string {
	files, err := os.ReadDir(dir)
	if err != nil {
		return ""
	}

	for _, file := range files {
		if !file.IsDir() && cssFilePattern.MatchString(file.Name()) {
			return "/static/assets/" + file.Name()
		}
	}

	return ""
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
