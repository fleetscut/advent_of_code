use std::fs::read_to_string;

use aoc::*;

fn main() {
    let day = 1;
    let example_path = format!("./data/day{}ex.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_to_string(&example_path).expect("Could not open file");
    let input = read_to_string(&input_path).expect("Could not open file");

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);
    println!("-----");
    let p2 = part_two(&example_input);
    println!("Part Two Example: {}", p2);
    let p2 = part_two(&input);
    println!("Part Two: {}", p2);
}

fn part_one(input: &str) -> i32 {
    let lines: Vec<_> = input.split('\n').collect();
    *get_calories(input).last().unwrap()
}

fn part_two(input: &str) -> i32 {
    let mut calories = get_calories(input);
    calories.reverse();
    calories.iter().take(3).sum()
}

fn get_calories(input: &str) -> Vec<i32> {
    let mut calories: Vec<i32> = input
        .split("\n\n")
        .map(|chunk| chunk.lines().map(|line| line.parse::<i32>().unwrap()).sum())
        .collect();
    calories.sort();
    calories
}
