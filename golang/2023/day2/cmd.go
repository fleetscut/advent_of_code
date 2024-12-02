package day2

import (
	"fmt"
	"github.com/spf13/cobra"
)

func RegisterCommand(parent *cobra.Command) {
	file1 := "input/2023/day2/input.txt"
	file2 := "input/2023/day2/input.txt"
	example := "input/2023/day2/example.txt"

	day2Cmd := &cobra.Command{
		Use:   "2",
		Short: "Run Day 2 solutions",
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
	parent.AddCommand(day2Cmd)
	day2Cmd.AddCommand(partOneCmd)
	day2Cmd.AddCommand(partTwoCmd)
	day2Cmd.AddCommand(allCmd)
}
