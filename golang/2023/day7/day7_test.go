package day7

import (
	"aoc/golang/utils"
	"testing"
)

func TestPartOne(t *testing.T) {
	utils.RunTest(0, "example.txt", 7 , t, runPartOne)
}

func TestPartTwo(t *testing.T) {
	utils.RunTest(0, "example.txt", 7 , t, runPartTwo)
}
