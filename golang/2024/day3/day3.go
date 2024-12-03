package day3

import (
	"aoc/golang/utils"
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

func runInstructions(input string, override bool) int {
	result := 0
	pattern, _ := regexp.Compile(`mul\((\d+),(\d+)\)|do\(\)|don't\(\)`)
	enabled := true

	data := pattern.FindAllStringSubmatch(input, -1)
	for _, d := range data {
		if strings.Contains(d[0], "mul") && enabled {
			a, _ := strconv.Atoi(d[1])
			b, _ := strconv.Atoi(d[2])
			result += a * b
		}
		if strings.Contains(d[0], "do(") && !override {
			enabled = true
		}

		if strings.Contains(d[0], "don't(") && !override{
			enabled = false
		}
	}
	return result
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsString(filename)
	return runInstructions(input, true)
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsString(filename)
	return runInstructions(input, false)
}
