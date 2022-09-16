use std::cmp;

fn main() {
    // let path = "./data/day7ex.txt";
    let path = "./data/day7.txt";
    let input = aoc::read_one_line(path, ",");

    let fuel = calculate_fuel(&input);
    println!("Part one: {}", fuel);
    let fuel = calculate_fuel_cost(&input);
    println!("Part two: {}", fuel);
}

fn calculate_fuel(input: &[i32]) -> i32 {
    let mut nums = input.to_vec();
    nums.sort();
    let median = nums[nums.len() / 2];

    nums.iter().fold(0, |sum, val| sum + (val - median).abs())
}

fn calculate_fuel_cost(input: &[i32]) -> i32 {
    // https://www.reddit.com/r/adventofcode/comments/rawxad/2021_day_7_part_2_i_wrote_a_paper_on_todays/
    let sum: i32 = input.iter().sum();
    let mean: f32 = sum as f32 / input.len() as f32;

    let floor = mean.floor() as i32;
    let ceil = mean.ceil() as i32;

    cmp::min(sum_fuel(input, floor), sum_fuel(input, ceil))
}

fn sum_fuel(input: &[i32], cost: i32) -> i32 {
    input.iter().fold(0, |sum, val| {
        let n = (val - cost).abs();
        // sum of n numbers
        (n * (n + 1) / 2) + sum
    })
}
