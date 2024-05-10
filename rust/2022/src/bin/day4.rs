use aoc::read_lines_from_file;
use std::cmp::max;
use std::cmp::min;
use std::str::FromStr;

#[derive(Debug)]
struct Pairs {
    one: (i32, i32),
    two: (i32, i32),
}

impl FromStr for Pairs {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let pair: Vec<i32> = s
            .split(',')
            .flat_map(|c| c.split('-').map(|y| y.parse::<i32>().unwrap()))
            .collect();

        Ok(Self {
            one: (pair[0], pair[1]),
            two: (pair[2], pair[3]),
        })
    }
}

impl Pairs {
    fn contains(&self) -> bool {
        if self.one.0 >= self.two.0 && self.one.1 <= self.two.1
            || self.two.0 >= self.one.0 && self.two.1 <= self.one.1
        {
            return true;
        }

        false
    }

    fn overlaps(&self) -> bool {
        if self.one.0 >= self.two.0 && self.one.0 <= self.two.1
            || self.two.0 >= self.one.0 && self.two.0 <= self.one.1
        {
            return true;
        }
        false
    }
}

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

    let p2 = part_two(&example_input);
    println!("Part Two Example: {}", p2);
    let p2 = part_two(&input);
    println!("Part Two: {}", p2);
}

fn part_one(input: &[String]) -> i32 {
    input
        .iter()
        .map(|line| line.parse::<Pairs>().unwrap())
        .filter(|pair| pair.contains())
        .fold(0, |acc, _| acc + 1)
}

fn part_two(input: &[String]) -> i32 {
    input
        .iter()
        .map(|line| line.parse::<Pairs>().unwrap())
        .filter(|pair| pair.overlaps())
        .fold(0, |acc, _| acc + 1)
}
