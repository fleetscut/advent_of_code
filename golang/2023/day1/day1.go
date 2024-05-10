package day1

import (
	"github.com/spf13/cobra"
)

func RegisterCommand(parent *cobra.Command) {
    day1Cmd := &cobra.Command{
        Use: "1",
    }
    partOneCmd := &cobra.Command{
        Use: "1",
        Run: func(cmd *cobra.Command, args []string){
            runPartOne()
        },
        Short: "Run Part One",
    }
    partTwoCmd := &cobra.Command{
        Use: "2",
        Run: func(cmd *cobra.Command, args []string){
            runPartTwo()
        },
        Short: "Run Part Two",
    }
    allCmd := &cobra.Command{
        Use: "a",
        Run: func(cmd *cobra.Command, args []string) {
            runPartOne()
            runPartTwo()
        },
        Short: "Run Parts One & Two",
    }
    parent.AddCommand(day1Cmd)
    day1Cmd.AddCommand(partOneCmd)
    day1Cmd.AddCommand(partTwoCmd)
    day1Cmd.AddCommand(allCmd)
}
