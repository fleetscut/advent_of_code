package day1

import (
	"fmt"
	"github.com/spf13/cobra"
)

func RegisterCommand(parent *cobra.Command) {
	file1 := "input/day1/input.txt"
	file2 := "input/day1/input.txt"
	day1Cmd := &cobra.Command{
		Use: "1",
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
	parent.AddCommand(day1Cmd)
	day1Cmd.AddCommand(partOneCmd)
	day1Cmd.AddCommand(partTwoCmd)
	day1Cmd.AddCommand(allCmd)
}
