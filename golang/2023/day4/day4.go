package day4

import (
	"aoc/golang/utils"
	"fmt"
	// "math"
	"slices"
	"strings"
)

func checkWinning(input []string) (prizes []int) {
	for _, line := range input {
		game := strings.Split(line, ":")
		game = strings.Split(game[1], "|")
		winning, ticket := strings.Fields(game[0]), strings.Fields(game[1])

		wins := 0
		for _, num := range ticket {
			if slices.Contains(winning, num) {
				wins++
			}
		}
		prizes = append(prizes, wins)
	}

	return
}

func copyCards(prizes []int) (total int) {
	copies := make([]int, len(prizes))
	for i := range copies {
		copies[i] = 1
	}

	for i, prize := range prizes {
		for j := 1; j <= prize; j++ {
			copies[i+j] += copies[i]
		}
	}

	for _, c := range copies {
		total += c
	}
	return
}

func runPartOne(filename string) (points int) {
	fmt.Println("Part One")
	input := utils.ReadAsSlice[string](filename)
	for _, win := range checkWinning(input) {
		// points += int(math.Pow(2, float64(wins)-1))
		if win > 0 {
			points += 1 << (win - 1)
		}
	}
	return
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsSlice[string](filename)
	prizes := checkWinning(input)
	return copyCards(prizes)
}
