package day5

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(35, "example.txt", 2023, 5, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(46, "example.txt", 2023, 5, t, runPartTwo)
}
