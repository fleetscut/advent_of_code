package day5

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(143, "example.txt", 2024, 5 , t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(0, "example.txt", 2024, 5 , t, runPartTwo)
}
