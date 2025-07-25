package day6

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(41, "example.txt", 2024, 6, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(6, "example.txt", 2024, 6, t, runPartTwo)
}
