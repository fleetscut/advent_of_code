package day9

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(0, "example.txt", 2023, 9, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(0, "example.txt", 2023, 9, t, runPartTwo)
}
