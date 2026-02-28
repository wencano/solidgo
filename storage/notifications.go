package storage

import (
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"solidgo/models"
	"sort"
	"strings"
	"time"
)

func LoadNotifications() ([]models.Notification, error) {
	data, err := os.ReadFile(dataFilePath())
	if err != nil {
		if os.IsNotExist(err) {
			return []models.Notification{}, nil
		}
		return nil, err
	}

	content := string(data)
	notificationsPattern := regexp.MustCompile("(?s)## Notifications Data \\(JSON\\)\\n\\n```json\\s*(\\[.*?\\])\\s*```")
	notificationsMatch := notificationsPattern.FindStringSubmatch(content)
	if len(notificationsMatch) < 2 {
		return []models.Notification{}, nil
	}

	var notifications []models.Notification
	if err := json.Unmarshal([]byte(notificationsMatch[1]), &notifications); err != nil {
		return nil, fmt.Errorf("failed to parse notifications JSON: %w", err)
	}

	return notifications, nil
}

func SaveNotifications(notifications []models.Notification) error {
	sort.Slice(notifications, func(i, j int) bool {
		return notifications[i].ID > notifications[j].ID
	})

	jsonData, err := json.MarshalIndent(notifications, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal JSON: %w", err)
	}

	data, err := os.ReadFile(dataFilePath())
	if err != nil && !os.IsNotExist(err) {
		return err
	}

	content := string(data)
	jsonBlock := fmt.Sprintf("```json\n%s\n```", string(jsonData))

	notificationsRegex := regexp.MustCompile("(?s)(## Notifications Data \\(JSON\\)\\n\\n)```json\\s*\\[.*?\\]\\s*```")
	if notificationsRegex.MatchString(content) {
		content = notificationsRegex.ReplaceAllString(content, fmt.Sprintf("${1}%s", jsonBlock))
	} else {
		if !strings.Contains(content, "## Notifications Data (JSON)") {
			content += "\n\n## Notifications Data (JSON)\n\n"
		}
		content += jsonBlock + "\n"
	}

	return os.WriteFile(dataFilePath(), []byte(content), 0644)
}

func CreateNotification(message, notifType string) error {
	notifications, err := LoadNotifications()
	if err != nil {
		return err
	}

	maxID := 0
	for _, n := range notifications {
		if n.ID > maxID {
			maxID = n.ID
		}
	}

	notification := models.Notification{
		ID:        maxID + 1,
		Message:   message,
		Type:      notifType,
		Read:      false,
		CreatedAt: time.Now().Format(time.RFC3339),
	}

	notifications = append(notifications, notification)
	return SaveNotifications(notifications)
}

