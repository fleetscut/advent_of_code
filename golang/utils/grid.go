package utils

import (
	"errors"
	"fmt"
)

type Dir struct {
	X int
	Y int
}

type Grid[T comparable] struct {
	Field []Point[T]
	W, H  int
}

func NewGrid[T comparable](width, height int, defaultValue T) (*Grid[T], error) {
	if height <= 0 || width <= 0 {
		return nil, errors.New("Width and height must be positive")
	}
	grid := make([]Point[T], width*height)

	for y := range height {
		for x := range width {
			grid[width*y+x] = Point[T]{X: x, Y: y, Val: defaultValue}
		}
	}

	return &Grid[T]{Field: grid, W: width, H: height}, nil
}

func GridFromArray[T comparable](arr [][]T) (*Grid[T], error) {
	height := len(arr)
	if height == 0 {
		return nil, errors.New("Invalid Height")
	}
	width := len(arr[0])
	for _, line := range arr {
		if len(line) != width {
			return nil, errors.New("Row lengths do not match")
		}
	}
	grid := make([]Point[T], width*height)

	for y := range height {
		for x := range width {
			grid[width*y+x] = Point[T]{X: x, Y: y, Val: arr[y][x]}
		}
	}
	return &Grid[T]{Field: grid, W: width, H: height}, nil
}

func (g *Grid[T]) CheckPointInGrid(p Point[T]) bool {
	return g.CheckXYInGrid(p.X, p.Y)
}

func (g *Grid[T]) CheckXYInGrid(x, y int) bool {
	return x >= 0 && y >= 0 && x < g.W && y < g.H

}

func GridFromStringSlices[T comparable](input []string, parser func(r rune) (T, error)) (*Grid[T], error) {
	height := len(input)
	if height == 0 {
		return nil, errors.New("Invalid height")
	}

	width := len(input[0])
	for _, line := range input {
		if len(line) != width {
			return nil, errors.New("Row lengths do not match")
		}
	}

	grid := Grid[T]{
		W:     width,
		H:     height,
		Field: make([]Point[T], width*height),
	}

	for y, line := range input {
		for x, c := range line {
			val, err := parser(c)
			if err != nil {
				return nil, err
			}
			grid.Field[width*y+x] = Point[T]{
				X:   x,
				Y:   y,
				Val: val,
			}
		}
	}

	return &grid, nil
}

func (g *Grid[T]) GetPointNeighbors(p Point[T], includeDiagonals bool) []Point[T] {
	dirs := CardinalDirs()
	if includeDiagonals {
		diags := DiagonalDirs()
		for k, v := range diags {
			dirs[k] = v
		}
	}

	var neighbors []Point[T]
	for _, dir := range dirs {
		x, y := p.X+dir.X, p.Y+dir.Y
		if g.CheckPointInGrid(n) {
			neighbors = append(neighbors, g.Field[y*g.W+x])
		}
	}
	return neighbors
}

func (g *Grid[T]) Get2DIndex(p Point[T]) (int, error) {
	if g.CheckXYInGrid(p.X, p.Y) {
		return g.Get2DIndexXY(p.X, p.Y), nil
	}
	return 0, fmt.Errorf("Point %d,%d out of Bounds. Max x,y [%d, %d]", p.X, p.Y, g.W-1, g.H-1)
}

func (g *Grid[T]) Get2DIndexXY(x, y int) int {
	return g.W*y + x
}

func (g *Grid[T]) IndexFrom2D(idx int) (x, y int) {
	return idx % g.W, idx / g.W
}

func (g *Grid[T]) PrintGrid(formatter func(T) string) error {
	for i, p := range g.Field {
		r := formatter(p.Val)
		fmt.Printf("%s", r)
		if (i+1)%g.W == 0 {
			fmt.Println("")
		}
	}
	return nil
}

func (g *Grid[T]) GetPoint(x, y int) (Point[T], error) {
	if g.CheckXYInGrid(x, y) {
		return g.Field[y*g.W+x], nil
	}
	return Point[T]{}, fmt.Errorf("Point %d,%d out of Bounds. Max x,y [%d, %d]", x, y, g.W-1, g.H-1)
}

func (g *Grid[T]) GetPointIndex(idx int) (Point[T], error) {
	x, y := g.IndexFrom2D(idx)
	if g.CheckXYInGrid(x, y) {
		return g.Field[idx], nil
	}
	return Point[T]{}, fmt.Errorf("Point %d,%d out of Bounds. Max x,y [%d, %d]", x, y, g.W-1, g.H-1)
}

func (g *Grid[T]) SetPoint(x, y int, value T) error {
	if g.CheckXYInGrid(x, y) {
		g.Field[y*g.W+x] = Point[T]{X: x, Y: y, Val: value}
		return nil
	}

	return fmt.Errorf("Point %d,%d out of Bounds. Max x,y [%d, %d]", x, y, g.W-1, g.H-1)
}

func (g *Grid[T]) FindInGrid(val T) (*Point[T], bool) {
	for i := range g.Field {
		if g.Field[i].Val == val {
			return &g.Field[i], true
		}
	}
	return nil, false
}

func CardinalDirs() map[string]Dir {
	return map[string]Dir{
		"N": {X: 0, Y: -1},
		"W": {X: -1, Y: 0},
		"E": {X: 1, Y: 0},
		"S": {X: 0, Y: 1},
	}
}

func DiagonalDirs() map[string]Dir {
	return map[string]Dir{
		"NW": {X: -1, Y: -1},
		"NE": {X: 1, Y: -1},
		"SW": {X: -1, Y: 1},
		"SE": {X: 1, Y: 1},
	}
}

func (g *Grid[T]) Copy() *Grid[T] {
	copyGrid := *g // Shallow copy of the struct
	// Deep copy the Field slice
	copyGrid.Field = make([]Point[T], len(g.Field))
	copy(copyGrid.Field, g.Field)
	return &copyGrid
}
