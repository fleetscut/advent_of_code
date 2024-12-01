package day4

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(13, "example.txt", 2023, 4, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(30, "example.txt", 2023, 4, t, runPartTwo)
}
