package day3

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(161, "example.txt", 2024, 3 , t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(0, "example.txt", 2024, 3 , t, runPartTwo)
}
