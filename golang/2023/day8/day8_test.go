package day8

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(2, "example.txt", 2023, 8, t, runPartOne)
}

func TestPartOneEx2(t *testing.T) {
	utils.RunTest(6, "example2.txt", 2023, 8, t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(6, "example3.txt", 2023, 8, t, runPartTwo)
}
