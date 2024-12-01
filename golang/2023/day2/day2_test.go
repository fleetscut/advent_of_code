package day2

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(8, "example.txt", 2023, 2, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(2286, "example.txt", 2023, 2, t, runPartTwo)
}
