package day1

import (
	"fmt"
	"github.com/spf13/cobra"
)

func RegisterCommand(parent *cobra.Command) {
	file1 := "input/2023/day1/input.txt"
	file2 := "input/2023/day1/input.txt"
	example := "input/2023/day1/example.txt"
	example2 := "input/2023/day1/example2.txt"

	day1Cmd := &cobra.Command{
		Use: "1",
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
				filename = example2
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
				filename2 = example2
			}
			fmt.Println("Result:", runPartOne(filename1))
			fmt.Println("Result:", runPartTwo(filename2))
		},
		Short: "Run Parts One & Two",
	}
	parent.AddCommand(day1Cmd)
	day1Cmd.AddCommand(partOneCmd)
	day1Cmd.AddCommand(partTwoCmd)
	day1Cmd.AddCommand(allCmd)
}
