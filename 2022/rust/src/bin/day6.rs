use std::{collections::HashSet, fs::read_to_string};

fn main() {
    let day = 6;
    let example_path = format!("./data/day{}ex.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_to_string(&example_path).expect("Could not open file");
    let input = read_to_string(input_path).expect("Could not open file");

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);

    let p1 = part_two(&example_input);
    println!("Part Two Example: {}", p1);
    let p1 = part_two(&input);
    println!("Part Two: {}", p1);
}

fn part_one(input: &String) -> i32 {
    find_start(input, 4)
}

fn part_two(input: &String) -> i32 {
    find_start(input, 14)
}

fn find_start(input: &String, size: usize) -> i32 {
    input
        .as_bytes()
        .windows(size)
        .enumerate()
        .find(|(_, window)| window.iter().collect::<HashSet<&u8>>().len() == size)
        .map(|(index, _)| index + size)
        .unwrap() as i32
}
