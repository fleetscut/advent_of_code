package utils

func GetLCM(a int, b int) int {
	return (a * b) / GetGCD(a, b)
}

func GetGCD(a int, b int) int {
	if b == 0 {
		return a
	} else {
		return GetGCD(b, a%b)
	}
}
