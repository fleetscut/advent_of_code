package day2

import (
	"fmt"
	"github.com/spf13/cobra"
)

func RegisterCommand(parent *cobra.Command) {
	file1 := "input/day2/input.txt"
	file2 := "input/day2/input.txt"
	day2Cmd := &cobra.Command{
		Use: "2",
        Short: "Run Day 2 solutions",
	}
	partOneCmd := &cobra.Command{
		Use: "1",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Result:", runPartOne(file1))
		},
		Short: "Run Part One",
	}
	partTwoCmd := &cobra.Command{
		Use: "2",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Result:", runPartTwo(file2))
		},
		Short: "Run Part Two",
	}
	allCmd := &cobra.Command{
		Use: "a",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Result:", runPartOne(file1))
			fmt.Println("Result:", runPartTwo(file2))
		},
		Short: "Run Parts One & Two",
	}
	parent.AddCommand(day2Cmd)
	day2Cmd.AddCommand(partOneCmd)
	day2Cmd.AddCommand(partTwoCmd)
	day2Cmd.AddCommand(allCmd)
}
