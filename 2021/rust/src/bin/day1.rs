fn main() {
    println!("day1");
    // let path = "./data/day1ex.txt";
    let path = "./data/day1.txt";
    let input = aoc::read_from_file::<u32>(path);
    let count = part_one(&input);
    println!("Part 1: {}", count);
    let count = part_two(&input);
    println!("Part 2: {}", count);
}

fn part_one(input: &[u32]) -> u32 {
    let mut count = 0;
    // for i in 0..input.len() - 1 {
    //     if input[i + 1] > input[i] {
    //         count += 1;
    //     }
    // }
    // windows can create an iterator over overlapping elements
    for win in input.windows(2) {
        if win[1] > win[0] {
            count += 1;
        }
    }
    count
}

fn part_two(input: &[u32]) -> u32 {
    let mut count = 0;
    let mut prevSum = 10000;
    for win in input.windows(3) {
        if win[0] + win[1] + win[2] > prevSum {
            count += 1;
        }
        prevSum = win[0] + win[1] + win[2];
    }
    count
}
