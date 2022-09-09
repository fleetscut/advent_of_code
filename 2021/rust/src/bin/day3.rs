fn main() {
    // let path = "./data/day3ex.txt";
    let path = "./data/day3.txt";
    let input = aoc::read_from_file::<String>(path);
    let vals = get_numbers(&input);
    let part_one = power_consumption(&vals);
    println!("Power: {}", part_one);
    let oxygen_rating = bit_criteria(&vals, |val, common| val == common);
    let co2_rating = bit_criteria(&vals, |val, common| val != common);
    println!("O2: {}", oxygen_rating);
    println!("CO2: {}", co2_rating);
    println!("Life Support: {}", co2_rating * oxygen_rating);
}
fn get_numbers(input: &[String]) -> Vec<Vec<u32>> {
    let vals: Vec<Vec<u32>> = input
        .iter()
        .map(|line| {
            line.chars()
                .map(|char| char::to_digit(char, 2).unwrap())
                .collect()
        })
        .collect();
    vals
}

fn get_sums(vals: &Vec<Vec<u32>>) -> Vec<u32> {
    let size = vals[0].len();
    let mut sums = vec![0; size];
    vals.iter().for_each(|line| {
        for i in 0..line.len() {
            sums[i] += line[i];
        }
    });
    sums
}
fn power_consumption(vals: &Vec<Vec<u32>>) -> u32 {
    let sums = get_sums(&vals);
    let gamma: Vec<u32> = sums
        .iter()
        .map(|digit| {
            if digit > &((vals.len() as u32 + 1) / 2) {
                1
            } else {
                0
            }
        })
        .collect();
    let epsilon: Vec<u32> = gamma
        .iter()
        .map(|val| if *val == 1 { 0 } else { 1 })
        .collect();
    let gamma = convert_to_decimal(&gamma);
    let epsilon = convert_to_decimal(&epsilon);
    gamma * epsilon
}

fn bit_criteria(vals: &Vec<Vec<u32>>, common: fn(u32, u32) -> bool) -> u32 {
    let size = vals[0].len();
    let mut final_val = vals.clone();
    for index in 0..size {
        let sums = get_sums(&final_val);
        let half = (final_val.len() as u32 + 1) / 2;
        let most_common = if sums[index] < half { 0 } else { 1 };
        final_val = final_val
            .into_iter()
            .filter(|line| common(line[index], most_common))
            .collect();
        if final_val.len() == 1 {
            break;
        }
    }
    convert_to_decimal(&final_val[0])
}

fn convert_to_decimal(values: &Vec<u32>) -> u32 {
    let mut decimal = 0;
    let base: u32 = 2;
    for i in 0..values.len() {
        if values[values.len() - i - 1] == 1 {
            decimal += base.pow(i as u32);
        }
    }
    decimal
}
