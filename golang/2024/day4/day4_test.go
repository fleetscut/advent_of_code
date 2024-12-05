package day4

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(18, "example.txt", 2024, 4 , t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(9, "example.txt", 2024, 4 , t, runPartTwo)
}
