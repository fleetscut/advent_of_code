use std::collections::HashMap;

use itertools::Itertools;

fn main() {
    // let path = "./data/day8ex.txt";
    let path = "./data/day8.txt";
    let input: Vec<String> = aoc::read_from_file(path);

    let unique = check_unique(&input);
    println!("Part one: {}", unique);

    let mut sum = 0;
    for line in input {
        let test = decode(&line);
        sum += test;
    }

    println!("Part two: {}", sum);
}

fn check_unique(input: &[String]) -> u32 {
    input
        .iter()
        .map(|s| s.split_once('|').unwrap().1)
        .flat_map(|s| s.split_whitespace())
        .filter(|s| matches!(s.len(), 2 | 3 | 4 | 7))
        .count() as u32
}

fn decode(input: &String) -> u32 {
    let mut map = HashMap::<char, u32>::new();
    let (signals, outputs) = input.split_once('|').unwrap();
    signals
        .split(' ')
        .for_each(|s| s.chars().for_each(|c| *map.entry(c).or_insert(0) += 1));

    let mut b = '\0';
    let mut e = '\0';
    let mut f = '\0';

    let one = signals.split(' ').find(|signal| signal.len() == 2).unwrap();
    let four = signals.split(' ').find(|signal| signal.len() == 4).unwrap();
    let seven = signals.split(' ').find(|signal| signal.len() == 3).unwrap();
    let eight = signals.split(' ').find(|signal| signal.len() == 7).unwrap();

    for key in map.keys() {
        if map[key] == 6 {
            b = *key;
        } else if map[key] == 4 {
            e = *key;
        } else if map[key] == 9 {
            f = *key;
        }
    }

    let c = one.chars().find(|c| c != &f).unwrap();
    let d = four
        .chars()
        .find(|char| char != &b && char != &c && char != &f)
        .unwrap();
    let a = seven.chars().find(|char| char != &c && char != &f).unwrap();
    let g = eight
        .chars()
        .find(|char| {
            char != &a && char != &b && char != &c && char != &d && char != &e && char != &f
        })
        .unwrap();

    let mut numbers = Vec::<String>::new();
    numbers.push(vec![a, b, c, e, f, g].iter().sorted().collect::<String>());
    numbers.push(vec![c, f].iter().sorted().collect::<String>());
    numbers.push(vec![a, c, d, e, g].iter().sorted().collect::<String>());
    numbers.push(vec![a, c, d, f, g].iter().sorted().collect::<String>());
    numbers.push(vec![b, c, d, f].iter().sorted().collect::<String>());
    numbers.push(vec![a, b, d, f, g].iter().sorted().collect::<String>());
    numbers.push(vec![a, b, d, e, f, g].iter().sorted().collect::<String>());
    numbers.push(vec![a, c, f].iter().sorted().collect::<String>());
    numbers.push(
        vec![a, b, c, d, e, f, g]
            .iter()
            .sorted()
            .collect::<String>(),
    );
    numbers.push(vec![a, b, c, d, f, g].iter().sorted().collect::<String>());

    let mut num = String::new();
    for output in outputs.split(' ') {
        let sorted = output.chars().sorted().collect::<String>();
        // println!("{}", sorted);
        for (i, segments) in numbers.iter().enumerate() {
            if sorted == *segments {
                num += &i.to_string();
            }
        }
    }
    num.parse().unwrap()
}
