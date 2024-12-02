package day2

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(2, "example.txt", 2024, 2 , t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(4, "example.txt", 2024, 2 , t, runPartTwo)
}
