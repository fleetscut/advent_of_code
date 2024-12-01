package day1

import (
	"aoc/golang/utils"
	"fmt"
	"slices"
	"strconv"
	"strings"
)

func Abs(val int) int {
	if val < 0 {
		return -val
	}
	return val
}

func findLists(input []string) ([]int, []int) {
	l1 := []int{}
	l2 := []int{}

	for _, line := range input {
		fields := strings.Fields(line)
		a, _ := strconv.Atoi(fields[0])
		b, _ := strconv.Atoi(fields[1])
		l1 = append(l1, a)
		l2 = append(l2, b)
	}
	slices.Sort(l1)
	slices.Sort(l2)

	return l1, l2
}

func findDistance(l1 []int, l2 []int) int {
	distance := 0

	for i := range l1 {
		distance += Abs(l1[i] - l2[i])
	}

	return distance
}

func simScore(l1 []int, l2 []int) int {
	sim := 0

	for _, i := range l1 {
		found := 0
		for _, j := range l2 {
			if i == j {
				found++
			}
		}
		sim += i * found
	}

	return sim
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsSlice[string](filename)
	l1, l2 := findLists(input)
	return findDistance(l1, l2)
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsSlice[string](filename)
	l1, l2 := findLists(input)
	return simScore(l1, l2)
}
