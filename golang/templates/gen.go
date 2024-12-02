//lint:file-ignore U1000 Ignore all unused code, it's generated

package gen

import (
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	// "strconv"
	"text/template"

	"github.com/spf13/cobra"
)

func RegisterCommand(parent *cobra.Command) {
	genCmd := &cobra.Command{
		Use: "gen",
		Run: func(cmd *cobra.Command, args []string) {
			year, _ := cmd.Flags().GetString("year")
			day, _ := cmd.Flags().GetString("day")
			geneateFromTemplates(year, day)
		},
		Short: "Generate specified days files from template",
	}

	parent.AddCommand(genCmd)
	genCmd.PersistentFlags().StringP("year", "y", "", "Year to generate")
	genCmd.PersistentFlags().StringP("day", "d", "", "Day to generate")
	genCmd.MarkPersistentFlagRequired("year")
	genCmd.MarkPersistentFlagRequired("day")
}

func geneateFromTemplates(year string, day string) {
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal("Could not access working directory: ", err)
	}

	outDir := filepath.Join(wd, year, "day"+day)
	fmt.Println("Creating solution directory: ", outDir)
	err = createDir(outDir)
	if err != nil {
		log.Println(err)
	}

	inputDir := filepath.Join(wd, "input", "day"+day)
	fmt.Println("Creating input directory: ", inputDir)
	err = createDir(inputDir)
	if err != nil {
		log.Println(err)
	}

	tmplExt := ".tmpl"
	globPattern := "*"
	tmplPath := filepath.Join(wd, "templates", globPattern+tmplExt)
	tmplFiles, err := filepath.Glob(tmplPath)
	if err != nil {
		log.Fatal("Could not access template files: ", err)
	}

	for _, tmplFile := range tmplFiles {
		outFile := filepath.Base(tmplFile[:len(tmplFile)-len(tmplExt)])
		outFile = strings.ReplaceAll(outFile, "day", "day"+day)
		outpath := filepath.Join(outDir, outFile)
		if _, err := os.Stat(outpath); err == nil {
			fmt.Printf("File %v already exists\n", outFile)
			continue
		}

		file, err := os.Create(outpath)
		if err != nil {
			log.Fatal("Could not create new file: ", err)
		}
		defer file.Close()

		tmpl, err := template.ParseFiles(tmplFile)
		if err != nil {
			fmt.Println("Could not parse template: ", err)
		}
		if err := tmpl.Execute(file, struct{ Day string; Year string }{Day: day, Year: year}); err != nil {
			fmt.Println("Could not execute template: ", err)
		} else {
			fmt.Printf("Creating file: %v\n", filepath.Base(tmplFile))
		}

	}

}

func createDir(dir string) error {
	if _, err := os.Stat(dir); err == nil {
		return errors.New("Directory already exists")
	} else {
		os.Mkdir(dir, 0755)
	}
	return nil
}
