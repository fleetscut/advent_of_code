package y2023

import (
	"github.com/spf13/cobra"

    "aoc/golang/2023/day1"
)

func RegisterCommand(parent *cobra.Command) {
    y2023 := &cobra.Command{
        Use: "2023",
        Example: "2023 [number]",
        Short: "Run 2023 Challenges",
    }
    parent.AddCommand(y2023)
    day1.RegisterCommand(y2023)
}

