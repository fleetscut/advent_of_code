package utils

import (
	"fmt"
	"os"
	"path"
	"testing"
)

func RunTest(answer int, filename string, year int, day int, t *testing.T, callback func(string) int) {
	rp := fmt.Sprintf("../../input/%d/day%d", year, day)
	wd, _ := os.Getwd()
	wd = path.Join(wd, rp, filename)
	result := callback(wd)
	if result != answer {
		t.Errorf("Expected %v, got %v", answer, result)
	}
}
