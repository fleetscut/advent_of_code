package day2

import (
	"aoc/golang/utils"
	"fmt"
	"strconv"
	"strings"
)

func validateGames(input []string) (int, int) {
	const maxRed int = 12
	const maxGreen int = 13
	const maxBlue int = 14

	score := 0
	power := 0
	for _, line := range input {
		minRed := 0
		minBlue := 0
		minGreen := 0
		validGame := true

		splitLine := (strings.Split(line, ":"))
		id, _ := strconv.Atoi(strings.TrimPrefix(splitLine[0], "Game "))
		sets := strings.Split(splitLine[1], ";")

		for _, set := range sets {
			colors := strings.Split(set, ",")

			for _, color := range colors {
				cubes := strings.Fields(color)
				cubeCount, _ := strconv.Atoi(cubes[0])
				switch cubes[1] {
				case "red":
					validGame = validGame && (cubeCount <= maxRed)
					if cubeCount > minRed {
						minRed = cubeCount
					}
				case "green":
					validGame = validGame && (cubeCount <= maxGreen)
					if cubeCount > minGreen {
						minGreen = cubeCount
					}
				case "blue":
					validGame = validGame && (cubeCount <= maxBlue)
					if cubeCount > minBlue {
						minBlue = cubeCount
					}
				}
			}
		}

		if validGame {
			score += id
		}
		power += minRed * minBlue * minGreen
	}
	return score, power
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsSlice[string](filename)
	result, _ := validateGames(input)
	return result
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsSlice[string](filename)
	_, result := validateGames(input)
	return result
}
