package utils

import (
	"os"
	"path"
	"testing"
)

func RunTest(answer int, filename string, t *testing.T, callback func(string) int) {
	wd, _ := os.Getwd()
	wd = path.Join(wd, "../../input/day1/", filename)
	t.Log(wd)
	result := callback(wd)
	if result != answer {
		t.Errorf("Expected %v, got %v", answer, result)
	}
}
