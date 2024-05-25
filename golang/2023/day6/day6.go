package day6

import (
	"aoc/golang/utils"
	"fmt"
	"log"
	"math"
	"strconv"
	"strings"
)

type Game [2]float64

func getRaces(input []string, kerning bool) []Game {
	if kerning {
		input[0] = strings.ReplaceAll(input[0], " ", "")
		input[1] = strings.ReplaceAll(input[1], " ", "")
	}
	times := strings.Split(input[0], ":")
	distances := strings.Split(input[1], ":")

	times = strings.Fields(times[1])
	distances = strings.Fields(distances[1])

	races := make([]Game, len(times))
	for i := range times {
		t, err := strconv.ParseFloat(times[i], 64)
		if err != nil {
			log.Fatal("Error in atoi conversion: ", err)
		}
		d, err := strconv.ParseFloat(distances[i], 64)
		if err != nil {
			log.Fatal("Error in atoi conversion: ", err)
		}
		race := Game{t, d}
		races[i] = race
	}
	fmt.Println(races)
	return races
}

func findRoots(time, distance float64) int {
	// Roots are non inclusive
	right := math.Ceil(((time + math.Sqrt(time*time-4*distance)) / 2) - 1)
	left := math.Floor(((time - math.Sqrt(time*time-4*distance)) / 2) + 1)

	return int(right - left + 1)
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsSlice[string](filename)
	result := 1
	races := getRaces(input, false)
	for _, race := range races {
		result = result * findRoots(race[0], race[1])
	}
	return result
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsSlice[string](filename)
	race := getRaces(input, true)[0]
	return findRoots(race[0], race[1])
}
