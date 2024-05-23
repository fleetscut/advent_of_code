package day3

import (
	"aoc/golang/utils"
	"fmt"
	"strconv"
	// "strconv"
)

func validateParts(input []string) (sum int) {
	parts := parseSchematic(input, findSymbol)
	for _, s := range parts {
		for v := range s {
			sum += v
		}
	}
	return
}

func validateGears(input []string) (sum int) {
	parts := parseSchematic(input, findGears)
	for _, s := range parts {
		if len(s) == 2 {
			num := 1
			for v := range s {
				num *= v
			}
			sum += num
		}
	}

	return
}

func parseSchematic(input []string, find func(rune) bool) (parts []utils.Set[int]) {
	grid, _ := utils.GridFromStringSlices[rune](input)

	for _, p := range grid.Field {
		if find(p.Val) {
			set := make(utils.Set[int])
			for _, n := range grid.GetPointNeighborsAll(p) {
				if n.Val >= '0' && n.Val <= '9' {
					val, _ := getPartNumber(&grid, n.X, n.Y)
					set.Add(val)
				}
			}
			parts = append(parts, set)
		}
	}
	return parts
}

func findSymbol(val rune) bool {
	return (val < '0' || val > '9') && val != '.'
}

func findGears(val rune) bool {
	return val == '*'
}

func getPartNumber(grid *utils.Grid[rune], x, y int) (int, bool) {
	// grid, _ := g.(utils.Grid[rune])

	testPoint, err := grid.GetPoint(x-1, y)
	for x > 0 && (testPoint.Val >= '0' && testPoint.Val <= '9') && err == nil {
		x--
		testPoint, err = grid.GetPoint(x-1, y)
		if err != nil {
			break
		}
	}
	partString := string(grid.Field[grid.Get2DIndexXY(x, y)].Val)

	testPoint, err = grid.GetPoint(x+1, y)
	for x < grid.W && (testPoint.Val >= '0' && testPoint.Val <= '9') {
		partString += string(grid.Field[grid.Get2DIndex(testPoint)].Val)
		x++
		testPoint, err = grid.GetPoint(x+1, y)
		if err != nil {
			break
		}
	}

	partNum, _ := strconv.Atoi(partString)

	return partNum, false
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsSlice[string](filename)
	return validateParts(input)
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsSlice[string](filename)
	return validateGears(input)
}
