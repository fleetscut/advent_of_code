use std::collections::VecDeque;

fn main() {
    // let path = "./data/day6ex.txt";
    let path = "./data/day6.txt";
    let input = aoc::read_one_line(path, ",");

    let count = tick(&input, 80);
    println!("Part one: {}", count);
    let count = tick(&input, 256);
    println!("Part two: {}", count);
}

fn tick(input: &[u64], days: u32) -> u64 {
    let mut lifetimes = VecDeque::from(vec![0; 9]);
    input.iter().for_each(|life| lifetimes[*life as usize] += 1);

    for _ in 0..days {
        let spawns = lifetimes.pop_front().unwrap();
        lifetimes[6] += spawns;
        lifetimes.push_back(spawns);
    }

    lifetimes.iter().sum()
}
