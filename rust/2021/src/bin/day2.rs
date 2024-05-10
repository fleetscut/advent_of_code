fn main() {
    // let path = "./data/day2ex.txt";
    let path = "./data/day2.txt";
    let input = aoc::read_from_file::<String>(path);
    let (x, y) = part_one(&input);
    println!("Part 1: {}", x * y);
    let (x, y) = part_two(&input);
    println!("Part 2: {}", x * y);
}

fn part_one(input: &[String]) -> (u32, u32) {
    let (x, y) = input.iter().map(|line| line.split_once(' ').unwrap()).fold(
        (0, 0),
        |(x, y), (a, b)| match (a, b.parse::<u32>().unwrap()) {
            ("forward", b) => (x + b, y),
            ("down", b) => (x, y + b),
            ("up", b) => (x, y - b),
            _ => unreachable!(),
        },
    );
    (x, y)
}

fn part_two(input: &[String]) -> (u32, u32) {
    let (x, y, _) = input.iter().map(|line| line.split_once(' ').unwrap()).fold(
        (0, 0, 0),
        |(x, y, z), (a, b)| match (a, b.parse::<u32>().unwrap()) {
            ("forward", b) => (x + b, y + z * b, z),
            ("down", b) => (x, y, z + b),
            ("up", b) => (x, y, z - b),
            _ => unreachable!(),
        },
    );
    (x, y)
}
