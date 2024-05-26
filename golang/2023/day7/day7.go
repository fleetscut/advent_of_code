package day7

import (
	"aoc/golang/utils"
	"fmt"
	"log"
	"sort"
	"strconv"
	"strings"
)

type Hand struct {
	hand  string
	bid   int
	score int
}

func rankHands(input []string, joker bool) []Hand {
	hands := make([]Hand, len(input))

	for i, round := range input {
		tmp := strings.Fields(round)
		hand := tmp[0]
		bid, err := strconv.Atoi(tmp[1])
		if err != nil {
			log.Fatal("Could not convert string to int", err)
		}

		handMap := make(map[rune]int)
		for _, c := range hand {
			handMap[c] += 1
		}

		if joker {
			replaceJokers(handMap)
		}

		score := scoreHand(handMap)
		hands[i] = Hand{
			hand,
			bid,
			score,
		}
	}

	// The closure evalueates if hands[i] < hands[j]
	sort.Slice(hands, func(i, j int) bool {
		var cardStrengths = "AKQJT98765432"
		if joker {
			cardStrengths = "AKQT98765432J"
		}
		hand1 := hands[i]
		hand2 := hands[j]

		if hand1.score < hand2.score {
			return true
		} else if hand1.score == hand2.score {
			for c := 0; c < len(hand1.hand); c++ {
				cs1 := strings.IndexByte(cardStrengths, hand1.hand[c])
				cs2 := strings.IndexByte(cardStrengths, hand2.hand[c])

				if cs1 > cs2 {
					return true
				} else if cs1 < cs2 {
					return false
				}
			}
		}
		return false
	})

	return hands
}

func scoreHand(hand map[rune]int) (score int) {
	switch len(hand) {
	case 1:
		score = 7
	case 2:
		for _, v := range hand {
			if v == 4 {
				score = 6
			} else if v == 3 {
				score = 5
			}
		}
	case 3:
		for _, v := range hand {
			if v == 3 {
				score = 4
			} else if v == 2 {
				score = 3
			}
		}
	case 4:
		score = 2
	case 5:
		score = 1
	}
	return
}

func replaceJokers(hand map[rune]int) {
	largeKey := rune(0)
	largeVal := 0

	for k, v := range hand {
		if v > largeVal && k != 'J' {
			largeVal = v
			largeKey = k
		}
	}

	jokerVal := hand['J']
	hand[largeKey] += jokerVal
	delete(hand, 'J')
}

func runPartOne(filename string) int {
	fmt.Println("Part One")
	input := utils.ReadAsSlice[string](filename)
	hands := rankHands(input, false)
	score := 0
	for i, h := range hands {
		score += h.bid * (i + 1)
	}
	return score
}

func runPartTwo(filename string) int {
	fmt.Println("Part Two")
	input := utils.ReadAsSlice[string](filename)
	hands := rankHands(input, true)
	score := 0
	for i, h := range hands {
		score += h.bid * (i + 1)
	}
	return score
}
