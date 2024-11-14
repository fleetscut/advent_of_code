package day8

import (
	"aoc/golang/utils"
	"fmt"
	"regexp"
	"strings"
)

type Destinations []string
type Map map[string]Destinations

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsSlice[string](filename)
	path, nodeMap := readMap(input)
	steps := runMap(path, nodeMap, "AAA", "Z")
	return steps
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsSlice[string](filename)
	path, nodeMap := readMap(input)
	steps := ghostMap(path, nodeMap)

	return steps
}

func readMap(input []string) ([]string, Map) {
	path := strings.Split(input[0], "")
	nodes := input[2:]

	nodeMap := Map{}

	for _, n := range nodes {
		re := regexp.MustCompile("[()=, ]+")
		tmp := re.ReplaceAllString(n, " ")
		node := strings.Split(tmp, " ")
		nodeMap[node[0]] = Destinations{node[1], node[2]}
	}

	return path, nodeMap
}

func runMap(path []string, nodeMap Map, start string, end string) int {
	node := start

	steps := 0
	for i := 0; !strings.HasSuffix(node, end); i = (i + 1) % len(path) {
		current := nodeMap[node]
		if path[i] == "L" {
			node = current[0]
		}
		if path[i] == "R" {
			node = current[1]
		}
		steps++
	}

	return steps
}

func ghostMap(path []string, nodeMap Map) int {
	lcm := 1
	for k := range nodeMap {
		if strings.HasSuffix(k, "A") {
			steps := runMap(path, nodeMap, k, "Z")
			lcm = utils.GetLCM(lcm, steps)
		}
	}
	return lcm
}
