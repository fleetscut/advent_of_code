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

func (p Point[T]) String(formatter func(T) string) string {
	return fmt.Sprintf("{x: %d, y: %d: %s}", p.X, p.Y, formatter(p.Val))
}

func (p Point[T]) DefaultString() string {
	return p.String(func(t T) string { return fmt.Sprintf("%v", t) })
}
