package day1

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(11, "example.txt", 2024, 1, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(31, "example.txt", 2024, 1, t, runPartTwo)
}
