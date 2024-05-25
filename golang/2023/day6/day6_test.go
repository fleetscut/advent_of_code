package day6

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(288, "example.txt", 6, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(71503, "example.txt", 6, t, runPartTwo)
}
