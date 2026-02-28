package storage

import (
	"os"
	"path/filepath"
)

func dataFilePath() string {
	if path := os.Getenv("DATA_FILE"); path != "" {
		return path
	}
	return "data/data.md"
}

func EnsureDataFile() error {
	path := dataFilePath()
	if _, err := os.Stat(path); err == nil {
		return nil
	} else if !os.IsNotExist(err) {
		return err
	}

	defaultPath := os.Getenv("DATA_DEFAULT_FILE")
	if defaultPath == "" {
		defaultPath = "data-default.md"
	}

	data, err := os.ReadFile(defaultPath)
	if err != nil {
		return err
	}

	if dir := filepath.Dir(path); dir != "." {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return err
		}
	}

	return os.WriteFile(path, data, 0644)
}
