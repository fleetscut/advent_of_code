package day1

import (
	"aoc/golang/utils"
	"fmt"
	"slices"
	"strconv"
	"strings"
)

func findLists(input []string) ([]int, []int, map[int]int) {
	l1 := []int{}
	l2 := []int{}
	count := map[int]int{}

	for _, line := range input {
		fields := strings.Fields(line)
		a, _ := strconv.Atoi(fields[0])
		b, _ := strconv.Atoi(fields[1])
		l1 = append(l1, a)
		l2 = append(l2, b)
		count[b]++
	}

	slices.Sort(l1)
	slices.Sort(l2)

	return l1, l2, count
}

func findDistance(l1 []int, l2 []int) int {
	distance := 0

	for i := range l1 {
		distance += utils.Abs(l1[i] - l2[i])
	}

	return distance
}

func simScore(l1 []int, count map[int]int) int {
	sim := 0

	for _, i := range l1 {
		sim += i * count[i]
	}

	return sim
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsSlice[string](filename)
	l1, l2, _ := findLists(input)
	return findDistance(l1, l2)
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsSlice[string](filename)
	l1, _, count := findLists(input)
	return simScore(l1, count)
}
