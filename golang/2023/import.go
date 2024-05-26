package y2023

import (
	"github.com/spf13/cobra"

	"aoc/golang/2023/day1"
	"aoc/golang/2023/day2"
	"aoc/golang/2023/day3"
	"aoc/golang/2023/day4"
	"aoc/golang/2023/day5"
	"aoc/golang/2023/day6"
	"aoc/golang/2023/day7"
)

func RegisterCommand(parent *cobra.Command) {
	y2023 := &cobra.Command{
		Use:     "2023",
		Example: "2023 [number]",
		Short:   "Run 2023 Challenges",
	}
	parent.AddCommand(y2023)
	day1.RegisterCommand(y2023)
	day2.RegisterCommand(y2023)
	day3.RegisterCommand(y2023)
	day4.RegisterCommand(y2023)
	day5.RegisterCommand(y2023)
	day6.RegisterCommand(y2023)
	day7.RegisterCommand(y2023)
}
