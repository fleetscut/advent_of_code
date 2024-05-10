use std::{fs::read_to_string, str::FromStr};

use anyhow::{Error, Result};

#[derive(Debug)]
struct Crane {
    stacks: Vec<Vec<char>>,
}

impl FromStr for Crane {
    type Err = Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut crates = s.lines().rev();
        let size = (crates.next().unwrap().len() + 1) / 4;
        let mut stacks = vec![Vec::new(); size];

        crates.for_each(|line| {
            line.chars().enumerate().for_each(|val| {
                if val.1.is_alphabetic() {
                    stacks[val.0 / 4].push(val.1);
                }
            })
        });

        Ok(Self { stacks })
    }
}

impl Crane {
    fn move_crates9000(&mut self, command: &Command) {
        (0..command.count).for_each(|_| {
            let to_move = self.stacks[command.from].pop().expect("Stack is empty");
            self.stacks[command.to].push(to_move);
        });
    }

    fn move_crates9001(&mut self, command: &Command) {
        let mut to_move: Vec<char> = (0..command.count)
            .map(|_| self.stacks[command.from].pop().unwrap())
            .collect();

        to_move.reverse();
        self.stacks[command.to].extend_from_slice(&to_move);
    }

    fn get_top(&self) -> String {
        self.stacks
            .iter()
            .map(|stack| stack.last().unwrap())
            .collect()
    }
}

#[derive(Debug)]
struct Command {
    count: usize,
    from: usize,
    to: usize,
}

impl FromStr for Command {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(s.split(' ')
            .filter_map(|c| c.parse::<usize>().ok())
            .collect::<Self>())
    }
}

impl FromIterator<usize> for Command {
    fn from_iter<T: IntoIterator<Item = usize>>(iter: T) -> Self {
        let mut iter = iter.into_iter();

        Self {
            count: iter.next().unwrap(),
            from: iter.next().unwrap() - 1,
            to: iter.next().unwrap() - 1,
        }
    }
}

fn main() {
    let day = 5;
    let example_path = format!("./data/day{}ex.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_to_string(&example_path).expect("Could not open file");
    let input = read_to_string(input_path).expect("Could not open file");

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);

    let p2 = part_two(&example_input);
    println!("Part Two Example: {}", p2);
    let p2 = part_two(&input);
    println!("Part Two: {}", p2);
}

fn setup(input: &str) -> (Crane, Vec<Command>) {
    let (crane, commands) = input.split_once("\n\n").unwrap();

    let crane = crane.parse::<Crane>().unwrap();
    let commands: Vec<Command> = commands
        .lines()
        .map(|line| line.parse::<Command>().unwrap())
        .collect();

    (crane, commands)
}

fn part_one(input: &str) -> String {
    let (mut crane, commands) = setup(input);
    commands
        .iter()
        .for_each(|command| crane.move_crates9000(command));

    crane.get_top()
}

fn part_two(input: &str) -> String {
    let (mut crane, commands) = setup(input);
    commands
        .iter()
        .for_each(|command| crane.move_crates9001(command));

    crane.get_top()
}
