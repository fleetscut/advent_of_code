package day1

import (
	"aoc/golang/utils"
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func mapTextDigit(input []string) {
	numberMap := map[string]string{
		"one":   "o1e",
		"two":   "t2o",
		"three": "t3e",
		"four":  "f4r",
		"five":  "f5e",
		"six":   "s6x",
		"seven": "s7n",
		"eight": "e8t",
		"nine":  "n9e",
	}
	for i, _ := range input {
		for k, v := range numberMap {
			input[i] = strings.ReplaceAll(input[i], k, v)
		}
	}
}

func getCalibration(input []string) int {
	calibration := 0
	for _, s := range input {
		val := ""
		for _, c := range s {
			if unicode.IsDigit(c) {
				val += string(c)
			}
		}
		num, _ := strconv.Atoi(string(val[0]) + string(val[len(val)-1]))
		calibration += num
	}
	return calibration
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsSlice[string](filename)
	return getCalibration(input)
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsSlice[string](filename)
	mapTextDigit(input)
	return getCalibration(input)
}
