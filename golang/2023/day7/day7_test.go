package day7

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(6440, "example.txt", 2023, 7, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(5905, "example.txt", 2023, 7, t, runPartTwo)
}
