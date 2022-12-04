use aoc::read_lines_from_file;
use std::cmp::max;
use std::cmp::min;

fn main() {
    let day = 4;
    let example_path = format!("./data/day{}ex.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_lines_from_file::<String>(&example_path);
    let input = read_lines_from_file::<String>(&input_path);

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);
    // part_two(&example_input);
    let p2 = part_two(&example_input);
    println!("Part Two Example: {}", p2);
    let p2 = part_two(&input);
    println!("Part Two: {}", p2);
}

fn part_one(input: &Vec<String>) -> i32 {
    let mut count = 0;

    let pairs = get_pairs(input);

    for pair in &pairs {
        if (pair[0]..=pair[1]).contains(&pair[2]) && (pair[0]..=pair[1]).contains(&pair[3])
            || (pair[2]..=pair[3]).contains(&pair[0]) && (pair[2]..=pair[3]).contains(&pair[1])
        {
            count += 1;
        }
    }
    count
}

fn get_pairs(input: &Vec<String>) -> Vec<Vec<i32>> {
    input
        .iter()
        .map(|line| {
            line.split(',')
                .flat_map(|c| c.split('-').map(|y| y.parse::<i32>().unwrap()))
                .collect()
        })
        .collect()
}

fn part_two(input: &Vec<String>) -> i32 {
    let mut count = 0;
    let pairs = get_pairs(input);

    for pair in pairs {
        if max(pair[1], pair[3]) - min(pair[0], pair[2])
            <= (pair[1] - pair[0]) + (pair[3] - pair[2])
        {
            count += 1;
        }
    }
    count
}
