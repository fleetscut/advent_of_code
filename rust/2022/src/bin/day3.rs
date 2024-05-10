use std::collections::{HashMap, HashSet};

use aoc::read_lines_from_file;

fn main() {
    let day = 3;
    let example_path = format!("./data/day{}ex.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_lines_from_file::<String>(&example_path);
    let input = read_lines_from_file::<String>(&input_path);

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);

    let p2 = part_two(&example_input);
    println!("Part Two Example: {}", p2);
    let p2 = part_two(&input);
    println!("Part Two: {}", p2);
}

fn part_one(input: &Vec<String>) -> i32 {
    let mut sum = 0;
    for item in input {
        let size = item.len() / 2;
        let mut items_one = HashSet::<char>::new();
        let mut items_two = HashSet::<char>::new();
        let (compartment_one, compartment_two) = &item.split_at(size);

        compartment_one.chars().for_each(|c| {
            items_one.insert(c);
        });
        compartment_two.chars().for_each(|c| {
            items_two.insert(c);
        });

        let common_item: &char = items_one.intersection(&items_two).next().unwrap();
        let common_item = match common_item.is_lowercase() {
            true => *common_item as u8 - 96,
            false => *common_item as u8 - 64 + 26,
        };

        sum += common_item as i32;
    }
    sum
}

fn part_two(input: &Vec<String>) -> i32 {
    let mut sum = 0;
    for group in input.chunks(3) {
        let mut items_one = HashSet::<char>::new();
        let mut items_two = HashSet::<char>::new();
        let mut items_three = HashSet::<char>::new();

        group[0].chars().for_each(|c| {
            items_one.insert(c);
        });
        group[1].chars().for_each(|c| {
            items_two.insert(c);
        });
        group[2].chars().for_each(|c| {
            items_three.insert(c);
        });

        let common_item: HashSet<char> = items_one.intersection(&items_two).copied().collect();
        let common_item: &char = common_item.intersection(&items_three).next().unwrap();
        println!("{}", common_item);
        let common_item = match common_item.is_lowercase() {
            true => *common_item as u8 - 96,
            false => *common_item as u8 - 64 + 26,
        };

        sum += common_item as i32;
    }
    sum
}
