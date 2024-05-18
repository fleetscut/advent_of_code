package day1

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(142, "example.txt", t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(281, "example2.txt", t, runPartTwo)
}
