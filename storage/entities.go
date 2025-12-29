package storage

import (
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"solidgo/models"
	"sort"
	"strings"
)

const dataFile = "data.md"

var nextID = 0

func init() {
	entities, _ := LoadEntities()
	if len(entities) > 0 {
		maxID := 0
		for _, e := range entities {
			if e.ID > maxID {
				maxID = e.ID
			}
		}
		nextID = maxID + 1
	} else {
		nextID = 1
	}
}

func LoadEntities() ([]models.Entity, error) {
	data, err := os.ReadFile(dataFile)
	if err != nil {
		if os.IsNotExist(err) {
			return []models.Entity{}, nil
		}
		return nil, err
	}

	content := string(data)
	jsonMatch := regexp.MustCompile("(?s)```json\\s*(\\[.*?\\])\\s*```").FindStringSubmatch(content)
	if len(jsonMatch) < 2 {
		return []models.Entity{}, nil
	}

	var entities []models.Entity
	if err := json.Unmarshal([]byte(jsonMatch[1]), &entities); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %w", err)
	}

	return entities, nil
}

func SaveEntities(entities []models.Entity) error {
	sort.Slice(entities, func(i, j int) bool {
		return entities[i].ID < entities[j].ID
	})

	jsonData, err := json.MarshalIndent(entities, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal JSON: %w", err)
	}

	data, err := os.ReadFile(dataFile)
	if err != nil && !os.IsNotExist(err) {
		return err
	}

	content := string(data)
	jsonBlock := fmt.Sprintf("```json\n%s\n```", string(jsonData))

	jsonRegex := regexp.MustCompile("(?s)(## Entity Data \\(JSON\\)\\n\\n)```json\\s*\\[.*?\\]\\s*```")
	if jsonRegex.MatchString(content) {
		content = jsonRegex.ReplaceAllString(content, fmt.Sprintf("${1}%s", jsonBlock))
	} else {
		if !strings.Contains(content, "## Entity Data (JSON)") {
			content += "\n\n## Entity Data (JSON)\n\n"
		}
		content += jsonBlock + "\n"
	}

	return os.WriteFile(dataFile, []byte(content), 0644)
}

func GetNextID() int {
	id := nextID
	nextID++
	return id
}

func FindEntityByID(id int) (*models.Entity, error) {
	entities, err := LoadEntities()
	if err != nil {
		return nil, err
	}

	for i := range entities {
		if entities[i].ID == id {
			return &entities[i], nil
		}
	}
	return nil, nil
}

func CreateEntity(entity models.Entity) error {
	entities, err := LoadEntities()
	if err != nil {
		return err
	}

	if entity.ID == 0 {
		entity.ID = GetNextID()
	}

	entities = append(entities, entity)
	return SaveEntities(entities)
}

func UpdateEntity(id int, entity models.Entity) error {
	entities, err := LoadEntities()
	if err != nil {
		return err
	}

	entity.ID = id
	found := false
	for i := range entities {
		if entities[i].ID == id {
			entities[i] = entity
			found = true
			break
		}
	}

	if !found {
		return fmt.Errorf("entity not found")
	}

	return SaveEntities(entities)
}

func DeleteEntity(id int) error {
	entities, err := LoadEntities()
	if err != nil {
		return err
	}

	filtered := []models.Entity{}
	for _, e := range entities {
		if e.ID != id {
			filtered = append(filtered, e)
		}
	}

	return SaveEntities(filtered)
}

