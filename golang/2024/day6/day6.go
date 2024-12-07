package day6

import (
	. "aoc/golang/utils"
	"fmt"
	"slices"
)

type Guard = Point[Dir]

func createGrid(input [][]string) (*Grid[string], Guard) {
	grid := GridFromArray(input)
	guard := Point[Dir]{}

	startDirs := map[string]Dir{
		"^": {X: 0, Y: -1},
		"v": {X: 0, Y: 1},
		">": {X: 1, Y: 0},
		"<": {X: -1, Y: 0},
	}

	for k, v := range startDirs {
		start, found := grid.FindInGrid(k, func(a, b string) bool { return a == b })
		if found {
			start.Val = "."
			guard = NewPoint(start.X, start.Y, v)
		}
	}

	return grid, guard
}

func walk(grid *Grid[string], guard Guard) (map[int]Dir, bool) {
	path := map[int]Dir{}
	loop := false

	for {
		p := grid.Get2DIndexXY(guard.X, guard.Y)

		dir := guard.Val

		next, oob := grid.GetPoint(guard.X+dir.X, guard.Y+dir.Y)
		if oob != nil {
			break
		}

		if path[p].X == guard.Val.X && path[p].Y == guard.Val.Y {
			loop = true
			break
		}

		path[p] = guard.Val

		if next.Val != "." {
			guard.Val.X = -dir.Y
			guard.Val.Y = dir.X
		}

		guard.X += guard.Val.X
		guard.Y += guard.Val.Y

	}

	lastStep := grid.Get2DIndexXY(guard.X, guard.Y)
	path[lastStep] = guard.Val
	return path, loop
}

func crossPath(grid *Grid[string], guard Guard) int {
	loops := 0
	obsstructions := []int{}

	path, _ := walk(grid, guard)

	for step, dir := range path {
		x, y := grid.IndexFrom2D(step)

		gridCopy := grid.Copy()
		obstruction := Point[any]{
			X: x + dir.X,
			Y: y + dir.Y,
		}
		obs := grid.Get2DIndexXY(obstruction.X, obstruction.Y)
		gridCopy.SetPoint(obstruction.X, obstruction.Y, "O")
		if !slices.Contains(obsstructions, obs) {
			if _, loop := walk(gridCopy, guard); loop {
				obsstructions = append(obsstructions, obs)
				loops++
			}
		}
		gridCopy.SetPoint(x+dir.X, y+dir.Y, ".")
	}
	return loops
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := ReadAsGrid[string](filename)
	grid, guard := createGrid(input)
	path, _ := walk(grid, guard)
	return len(path)
}

//Still a bug
func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := ReadAsGrid[string](filename)
	grid, guard := createGrid(input)
	return crossPath(grid, guard)
}
