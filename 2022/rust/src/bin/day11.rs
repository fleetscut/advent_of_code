use std::{collections::VecDeque, fs::read_to_string};

#[derive(Debug)]
enum Operation {
    Add(Option<u64>),
    Multiply(Option<u64>),
}

impl Operation {
    fn apply(&self, old: &u64) -> u64 {
        let new = match self {
            Operation::Add(x) => match x {
                Some(x) => old + x,
                None => old + old,
            },
            Operation::Multiply(x) => match x {
                Some(x) => old * x,
                None => old * old,
            },
        };
        new
    }
}

#[derive(Debug)]
struct MonkeyTree {
    monkeys: Vec<Monkey>,
}

#[derive(Debug)]
struct Monkey {
    num: usize,
    items: VecDeque<u64>,
    op: Operation,
    test: u64,
    neighbor_t: usize,
    neighbor_f: usize,
}

impl Monkey {
    fn new(monkey: &str) -> Self {
        let monkey: Vec<&str> = monkey.split('\n').collect();
        Self {
            num: monkey[0]
                .split(' ')
                .last()
                .unwrap()
                .trim_end_matches(':')
                .parse()
                .unwrap(),
            items: monkey[1]
                .split(' ')
                .filter_map(|val| val.trim_matches(',').parse().ok())
                .collect(),
            op: if monkey[2].contains('*') {
                Operation::Multiply(monkey[2].split(' ').last().unwrap().parse().ok())
            } else {
                Operation::Add(monkey[2].split(' ').last().unwrap().parse().ok())
            },
            test: monkey[3].split(' ').last().unwrap().parse().unwrap(),
            neighbor_t: monkey[4].split(' ').last().unwrap().parse().unwrap(),
            neighbor_f: monkey[5].split(' ').last().unwrap().parse().unwrap(),
        }
    }

    fn inspect(&mut self) -> u64 {
        self.items.iter_mut().for_each(|item| {
            *item = self.op.apply(item);
        });
        self.items.len() as u64
    }

    fn gets_bored(&mut self, worry: u64) {
        self.items.iter_mut().for_each(|item| {
            if worry == 0 {
                *item /= 3;
            } else {
                *item %= worry
            }
        });
    }

    fn throw(&mut self) -> Vec<(usize, u64)> {
        let mut thrown = Vec::new();
        for _ in 0..self.items.len() {
            let item = self.items.pop_front().unwrap();
            match item % self.test == 0 {
                true => thrown.push((self.neighbor_t, item)),
                false => thrown.push((self.neighbor_f, item)),
            }
        }
        thrown
    }
}

impl MonkeyTree {
    fn run(&mut self, rounds: usize, worry: u64) -> Vec<u64> {
        let mut watch = vec![0; self.monkeys.len()];
        for _ in 0..rounds {
            for index in 0..self.monkeys.len() {
                let monkey = &mut self.monkeys[index];
                watch[monkey.num] += monkey.inspect();
                monkey.gets_bored(worry);

                monkey
                    .throw()
                    .iter()
                    .for_each(|(thrown_to, item)| self.monkeys[*thrown_to].items.push_back(*item))
            }
        }
        watch
    }
}

fn main() {
    let day = 11;
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

fn part_one(input: &str) -> u64 {
    let mut monkeys = MonkeyTree {
        monkeys: Vec::new(),
    };
    input
        .split("\n\n")
        .map(Monkey::new)
        .for_each(|monkey| monkeys.monkeys.push(monkey));

    let mut watch = monkeys.run(20, 0);

    watch.sort();
    watch.reverse();
    watch[0] * watch[1]
}

fn part_two(input: &str) -> u64 {
    let mut monkeys = MonkeyTree {
        monkeys: Vec::new(),
    };
    input
        .split("\n\n")
        .map(Monkey::new)
        .for_each(|monkey| monkeys.monkeys.push(monkey));

    let base: u64 = monkeys.monkeys.iter().map(|monkey| monkey.test).product();
    let mut watch = monkeys.run(10000, base);

    watch.sort();
    watch.reverse();
    watch[0] * watch[1]
}
