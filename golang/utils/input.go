package utils

import (
	"bufio"
	"log"
	"os"
	"strconv"
	"strings"
)

type inputType interface {
	int | string
}

func ReadAsString(filename string) string {
	data, err := os.ReadFile(filename)
	if err != nil {
		log.Fatal("Could not open file:", filename)
	}
	return string(data)

}

func ReadAsSlice[T inputType](filename string) []T {
	f, err := os.Open(filename)
	if err != nil {
		log.Fatal("Could not open file:", filename)
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)

	var data []T
	for scanner.Scan() {
		text := scanner.Text()
		var val T
		switch any(val).(type) {
		case int:
			intVal, _ := strconv.Atoi(text)
			val = any(intVal).(T)
		case string:
			val = any(text).(T)
		}

		data = append(data, val)
	}

	return data
}

// func ReadAsGrid[T inputType](filename string) [][]T {
// 	f, err := os.Open(filename)
// 	if err != nil {
// 		log.Fatal("Could not open file:", filename)
// 	}
// 	defer f.Close()
//
// 	scanner := bufio.NewScanner(f)
//
// 	var data [][]T
//
// 	for scanner.Scan() {
// 		text := scanner.Text()
// 		text = strings.ReplaceAll(text," ", "")
// 		fields := strings.Split(text, "")
// 		var row []T
//
// 		for _, field := range fields {
// 			var val T
// 			switch any(val).(type) {
// 			case int:
// 				intVal, _ := strconv.Atoi(field)
// 				val = any(intVal).(T)
// 			case string:
// 				val = any(field).(T)
// 			}
// 			row = append(row,val)
// 		}
// 		data = append(data,row)
//
// 	}
//
// 	return data
// }

func ReadAsGrid[T inputType](filename string) [][]T {
	f, err := os.Open(filename)
	if err != nil {
		log.Fatal("Could not open file:", filename)
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)

	var data [][]T

	for scanner.Scan() {
		text := scanner.Text()
		fields := strings.Fields(text)
		if len(fields) == 1 {
			text = strings.ReplaceAll(text, " ", "")
			fields = strings.Split(text, "")
		}
		var row []T

		for _, field := range fields {
			var val T
			switch any(val).(type) {
			case int:
				intVal, _ := strconv.Atoi(field)
				val = any(intVal).(T)
			case string:
				val = any(field).(T)
			}
			row = append(row,val)
		}
		data = append(data,row)

	}

	return data
}
