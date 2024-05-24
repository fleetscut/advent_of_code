package day5

import (
	"aoc/golang/utils"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type AlmanacMap []Conversions
type Seeds []int
type Conversions []int
type SeedRange []int

func getSettings(input string) (Seeds, []AlmanacMap) {
	settings := strings.Split(input, "\n\n")
	seedsStr, settings := strings.Fields(strings.Split(settings[0], ":")[1]), settings[1:]

	seeds := make(Seeds, 0, len(seedsStr))
	for _, s := range seedsStr {
		v, _ := strconv.Atoi(s)
		seeds = append(seeds, v)
	}

	var maps []AlmanacMap
	for _, mapSection := range settings {
		var section []Conversions
		mapSection := strings.TrimSpace(mapSection) // Fix line feeds
		for _, line := range strings.Split(mapSection, "\n")[1:] {
			var sectionVals []int
			for _, val := range strings.Fields(line) {
				intVal, _ := strconv.Atoi(val)
				sectionVals = append(sectionVals, intVal)
			}
			section = append(section, sectionVals)
		}

		maps = append(maps, section)
	}

	return seeds, maps
}

func runMap(seeds *Seeds, maps AlmanacMap) {
	for i, s := range *seeds {
		for _, m := range maps {
			dest, source, rnge := m[0], m[1], m[2]
			if s >= source && s < source+rnge {
				(*seeds)[i] = (s - source) + dest

			}
		}
	}
}

func runMapRanges(seeds []SeedRange, maps AlmanacMap) []SeedRange {
	var unmappedSeeds []SeedRange
	var mappedSeeds []SeedRange

	for _, m := range maps {
		unmappedSeeds = []SeedRange{}
		dest, source, rnge := m[0], m[1], m[2]
		sourceEnd := source + rnge

		for _, s := range seeds {
			seedStart, seedEnd := s[0], s[1]
			start := SeedRange{seedStart, min(source, seedEnd)}
			mid := SeedRange{max(seedStart, source), min(seedEnd, sourceEnd)}
			end := SeedRange{max(sourceEnd, seedStart), seedEnd}
			if start[1] > start[0] {
				unmappedSeeds = append(unmappedSeeds, start)
			}
			if mid[1] > mid[0] {
				mappedSeeds = append(mappedSeeds, SeedRange{(mid[0] - source) + dest, (mid[1] - source) + dest})
			}
			if end[1] > end[0] {
				unmappedSeeds = append(unmappedSeeds, end)
			}
		}
		seeds = unmappedSeeds
	}
	return append(mappedSeeds, seeds...)
}

func expandSeeds(seeds Seeds) []SeedRange {
	var expandedSeeds []SeedRange

	for i := 0; i < len(seeds); i += 2 {
		expandedSeeds = append(expandedSeeds, []int{seeds[i], seeds[i] + seeds[i+1] - 1})
	}
	return expandedSeeds
}

func minSeed(seeds Seeds) int {
	minSeed := seeds[0]
	for _, s := range seeds {
		if s < minSeed {
			minSeed = s
		}
	}
	return minSeed
}

func minSeedRange(seeds []SeedRange) int {
	minSeed := seeds[0][0]

	for _, s := range seeds {
		if s[0] < minSeed {
			minSeed = s[0]
		}
	}
	return minSeed
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsString(filename)
	seeds, maps := getSettings(input)
	for _, m := range maps {
		runMap(&seeds, m)
	}
	return minSeed(seeds)
}

func runPartTwo(filename string) int {
	start := time.Now()
	fmt.Println("Part Two")
	input := utils.ReadAsString(filename)
	seeds, maps := getSettings(input)
	seedsRanges := expandSeeds(seeds)
	for _, m := range maps {
		seedsRanges = runMapRanges(seedsRanges, m)
	}
	fmt.Println(time.Since(start))
	return minSeedRange(seedsRanges)
}
