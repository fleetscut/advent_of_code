package day2

import (
	"aoc/golang/utils"
	"fmt"
)

func isSafe(input [][]int) int {
	count := 0
	for _, line := range input {
		if isMonotonic(line) {
			count++
		}
	}
	return count
}

func dampened(input [][]int) int {
	count := 0

	for _, line := range input {
		if isMonotonic(line) || canDampen(line) {
			count++
		}
	}
	return count
}

func isMonotonic(input []int) bool {
	dec := true
	inc := true

	// fields := strings.Fields(input)

	for i := 0; i < len(input)-1; i++ {
		a  := input[i]
		b  := input[i+1]
		if a < b {
			dec = false
		} else if a > b {
			inc = false
		}

		if utils.Abs(a-b) > 3 || a == b {
			return false
		}
	}

	return dec || inc
}

func canDampen(input []int) bool {
	for i := 0; i < len(input); i++ {
		subList := make([]int, 0, len(input)-1)
		subList = append(subList, input[:i]...)
		subList = append(subList, input[i+1:]...)
		if isMonotonic(subList){
			return true
		}
	}

	return false
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsGrid[int](filename)
	return isSafe(input)
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsGrid[int](filename)
	return dampened(input)
}
