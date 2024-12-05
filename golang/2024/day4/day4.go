package day4

import (
	"aoc/golang/utils"
	"fmt"
	"maps"
)

func search(input [][]string) int {
	grid := utils.GridFromArray(input)
	count := 0

	dirs := utils.CardinalDirs()
	maps.Copy(dirs, utils.DiagonalDirs())

	for _, p := range grid.Field {
		if p.Val == "X" {
			for _, dir := range dirs {
				next, inBounds := grid.GetPoint(dir.X+p.X, dir.Y+p.Y)
				if inBounds == nil {
					if findWord(grid, next, "MAS", dir) {
						count++
					}
				}
			}
		}
	}
	return count
}

func findWord(grid *utils.Grid[string], point utils.Point[string], word string, dir utils.Point[interface{}]) bool {
	if len(word) == 0 {
		return true
	}
	if point.Val == string(word[0]) {
		next, _ := grid.GetPoint(dir.X+point.X, dir.Y+point.Y)
		return findWord(grid, next, word[1:], dir)
	}
	return false
}

func crossSearch(input [][]string) int {
	grid := utils.GridFromArray(input)
	count := 0

	for _, p := range grid.Field {
		if p.Val == "A" {
			ne, neValid := grid.GetPoint(p.X+1, p.Y-1)
			nw, nwValid := grid.GetPoint(p.X-1, p.Y-1)
			se, seValid := grid.GetPoint(p.X+1, p.Y+1)
			sw, swValid := grid.GetPoint(p.X-1, p.Y+1)

			if (neValid == nil && swValid == nil) && ((ne.Val == "M" && sw.Val == "S") || (ne.Val == "S" && sw.Val == "M")) &&
				(nwValid == nil && seValid == nil) && ((nw.Val == "M" && se.Val == "S") || (nw.Val == "S" && se.Val == "M")) {
				count++
			}
		}
	}
	return count
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsGrid[string](filename)
	return search(input)
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsGrid[string](filename)
	return crossSearch(input)
}
