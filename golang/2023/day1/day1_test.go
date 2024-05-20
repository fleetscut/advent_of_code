package day1

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(142, "example.txt", 1, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(281, "example2.txt", 1, t, runPartTwo)
}
