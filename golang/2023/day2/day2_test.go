package day2

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(0, "example.txt", t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(0, "example.txt", t, runPartTwo)
}
