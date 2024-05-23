package day4

import (
	"fmt"
	"github.com/spf13/cobra"
)

func RegisterCommand(parent *cobra.Command) {
	file1 := "input/day4/input.txt"
	file2 := "input/day4/input.txt"
	example := "input/day4/example.txt"

	day4Cmd := &cobra.Command{
		Use: "4",
        Short: "Run Day 4 solutions",
	}
	partOneCmd := &cobra.Command{
		Use: "1",
		Run: func(cmd *cobra.Command, args []string) {
			filename := file1
			if ex, _ := parent.Flags().GetBool("ex"); ex {
				filename = example
			}
			fmt.Println("Result:", runPartOne(filename))
		},
		Short: "Run Part One",
	}
	partTwoCmd := &cobra.Command{
		Use: "2",
		Run: func(cmd *cobra.Command, args []string) {
			filename := file2
			if ex, _ := parent.Flags().GetBool("ex"); ex {
				filename = example
			}
			fmt.Println("Result:", runPartTwo(filename))
		},
		Short: "Run Part Two",
	}
	allCmd := &cobra.Command{
		Use: "a",
		Run: func(cmd *cobra.Command, args []string) {
			filename1 := file1
			filename2 := file2
			if ex, _ := parent.Flags().GetBool("ex"); ex {
				filename1 = example
				filename2 = example
			}
			fmt.Println("Result:", runPartOne(filename1))
			fmt.Println("Result:", runPartTwo(filename2))
		},
		Short: "Run Parts One & Two",
	}
	parent.AddCommand(day4Cmd)
	day4Cmd.AddCommand(partOneCmd)
	day4Cmd.AddCommand(partTwoCmd)
	day4Cmd.AddCommand(allCmd)
}
