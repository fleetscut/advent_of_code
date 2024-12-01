package day3

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(4361, "example.txt", 2023, 3, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(467835, "example.txt", 2023, 3, t, runPartTwo)
}
