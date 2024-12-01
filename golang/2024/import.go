package y2024

import (
	"github.com/spf13/cobra"

	"aoc/golang/2024/day1"
)

func RegisterCommand(parent *cobra.Command) {
	y2024 := &cobra.Command{
		Use:     "2024",
		Example: "2024 [number]",
		Short:   "Run 2024 Challenges",
	}
	parent.AddCommand(y2024)
	day1.RegisterCommand(y2024)
}
