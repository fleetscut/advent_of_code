package utils

import (
	"fmt"
)

type Point[T any] struct {
	X   int
	Y   int
	Val T
}

func NewPoint[T any](x, y int, value T) Point[T] {
	return Point[T]{
		X:   x,
		Y:   y,
		Val: value,
	}
}

func (p Point[T]) GetPoint() (int, int) {
	return p.X, p.Y
}

func (p Point[T]) String() string {
	val, _ := ConvertToRune(p.Val)

	return fmt.Sprintf("{x: %d, y: %d: %c}", p.X, p.Y, val)
}

type Grid[T any] struct {
	Field []Point[T]
	W, H  int
}

func NewGrid[T any](width, height int, defaultValue T) *Grid[T] {
	grid := make([]Point[T], height)

	for y := range width {
		for x := range height {
			grid[width*y+x] = NewPoint(x, y, defaultValue)
		}
	}

	return &Grid[T]{Field: grid, W: width, H: height}
}

func (g *Grid[T]) CheckPointInGrid(p Point[T]) bool {
	return g.CheckXYInGrid(p.X, p.Y)
}

func (g *Grid[T]) CheckXYInGrid(x, y int) bool {
	return x >= 0 && y >= 0 && x < g.W && y < g.H

}

func (g *Grid[T]) GetPointNeighborsAll(p Point[T]) (neighbors []Point[T]) {
	neighbors = append(neighbors, g.GetPointNeighborsDiagonal(p)...)
	neighbors = append(neighbors, g.GetPointNeighborsCardinal(p)...)
	return
}

func GridFromStringSlices[T any](input []string) (Grid[T], error) {
	height := len(input)
	width := len(input[0])

	grid := Grid[T]{
		W:     height,
		H:     width,
		Field: make([]Point[T], width*height),
	}

	for y, line := range input {
		for x, c := range line {
			val, err := ConvertRuneToType[T](c)
			if err != nil {
				return grid, err
			}
			grid.Field[width*y+x] = NewPoint(
				x,
				y,
				val,
			)
		}
	}

	return grid, nil
}

func (g *Grid[T]) GetPointNeighborsDiagonal(p Point[T]) (neighbors []Point[T]) {
	dirs := map[string]Point[T]{
		"NW": {X: -1, Y: -1},
		"NE": {X: 1, Y: -1},
		"SW": {X: -1, Y: 1},
		"SE": {X: 1, Y: 1},
	}

	for _, dir := range dirs {
		n := Point[T]{
			X: p.X + dir.X,
			Y: p.Y + dir.Y,
		}
		if g.CheckPointInGrid(n) {
			neighbors = append(neighbors, g.Field[n.Y*g.W+n.X])
		}
	}
	return
}

func (g *Grid[T]) GetPointNeighborsCardinal(p Point[T]) (neighbors []Point[T]) {
	dirs := map[string]Point[T]{
		"N": {X: 0, Y: -1},
		"W": {X: -1, Y: 0},
		"E": {X: 1, Y: 0},
		"S": {X: 0, Y: 1},
	}

	for _, dir := range dirs {
		n := Point[T]{
			X: p.X + dir.X,
			Y: p.Y + dir.Y,
		}
		if g.CheckPointInGrid(n) {
			neighbors = append(neighbors, g.Field[n.Y*g.W+n.X])
		}
	}
	return
}

func (g *Grid[T]) Get2DIndex(p Point[T]) int {
	return g.Get2DIndexXY(p.X, p.Y)
}

func (g *Grid[T]) Get2DIndexXY(x, y int) int {
	return g.W*y + x
}

func (g *Grid[T]) PrintGrid() error {
	for i, p := range g.Field {
		r, err := ConvertToRune(p.Val)
		if err != nil {
			return err
		}
		fmt.Printf("%c", r)
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
	return Point[T]{}, fmt.Errorf("Point out of bounds")
}

func (g *Grid[T]) SetPoint(x, y int, value T) error {
	if g.CheckXYInGrid(x, y) {
		g.Field[y*g.W+x].Val = value
	}

	return fmt.Errorf("Point out of Bounds")
}
