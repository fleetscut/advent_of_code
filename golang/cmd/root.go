package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"

	"aoc/golang/2023"
	"aoc/golang/2024"
	"aoc/golang/templates"
)

var rootCmd = &cobra.Command{
	Use:   "aocgo",
	Short: "Run advent of code challenges in golang",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("rawr")
		fmt.Println(args)
	},
}

func Execute() {
	y2023.RegisterCommand(rootCmd)
	y2024.RegisterCommand(rootCmd)
	gen.RegisterCommand(rootCmd)

	rootCmd.PersistentFlags().Bool("ex", false, "Run with example.txt")
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(os.Stderr, err)
		os.Exit(1)
	}

}
