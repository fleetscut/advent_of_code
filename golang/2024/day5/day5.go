package day5

import (
	"aoc/golang/utils"
	"fmt"
	"slices"
	"strconv"
	"strings"
)

type List []int

func parseInput(input string) (map[int]List, []List) {
	split := strings.Split(input, "\n\n")

	ruleMap := make(map[int]List)
	for _, line := range strings.Split(split[0], "\n") {
		rule := strings.Split(line, "|")
		a, _ := strconv.Atoi(rule[0])
		b, _ := strconv.Atoi(rule[1])
		ruleMap[a] = append(ruleMap[a], b)
	}

	pageOrders := []List{}
	split[1] = strings.TrimSuffix(split[1], "\n")
	for _, line := range strings.Split(split[1], "\n") {
		list := List{}
		for _, v := range strings.Split(line, ",") {
			num, _ := strconv.Atoi(v)
			list = append(list, num)
		}

		pageOrders = append(pageOrders, list)
	}

	return ruleMap, pageOrders
}

func validateOrders(ruleMap map[int]List, pageOrders []List, fix bool) int {
	sum := 0
	for _, order := range pageOrders{
		check := make([]int, len(order))
		copy(check,order)
		slices.SortFunc(check, func(a,b int) int {
			if slices.Contains(ruleMap[a], b){
				return -1
			}
			return 1
		})

		if slices.Equal(order,check) && ! fix{
			sum += order[len(order)/2]
		} 

		if fix && !slices.Equal(order,check){
			sum += check[len(check)/2]
		}
	}

	return sum
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsString(filename)
	ruleMap, pageOrders := parseInput(input)
	return validateOrders(ruleMap, pageOrders, false)
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsString(filename)
	ruleMap, pageOrders := parseInput(input)
	return validateOrders(ruleMap, pageOrders, true)
}
