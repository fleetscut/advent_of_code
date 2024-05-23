package utils

import (
	"fmt"
	"reflect"
)

func ConvertRuneToType[T any](r rune) (T, error) {
	var result T
	switch any(result).(type) {
	case int:
		return any(int(r)).(T), nil
	case float64:
		return any(float64(r)).(T), nil
	case string:
		return any(string(r)).(T), nil
	case rune:
		return any(rune(r)).(T), nil
	default:
		return result, fmt.Errorf("unsupported conversion to type %T", result)
	}
}

func ConvertToRune[T any](val T) (rune, error) {
	reflected := reflect.ValueOf(val)
	var r rune
	switch reflected.Kind() {
	case reflect.Int:
		r = rune(reflected.Int())
	case reflect.String:
		r = []rune(reflected.String())[0]
	case reflect.Int32:
		r = rune(reflected.Int())
	default:
		return r, fmt.Errorf("Value %T is not printable.", val)
	}
	return r, nil
}
