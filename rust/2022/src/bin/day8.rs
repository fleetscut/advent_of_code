use std::fs::read_to_string;

fn main() {
    let day = 8;
    let example_path = format!("./data/day{}ex.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_to_string(&example_path).expect("Could not open file");
    let input = read_to_string(input_path).expect("Could not open file");

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);
    let p2 = part_two(&example_input);
    println!("Part One Example: {}", p2);
    let p2 = part_two(&input);
    println!("Part One: {}", p2);
}

fn part_one(input: &String) -> i32 {
    let mut count = 0;
    let trees: Vec<Vec<i32>> = input
        .lines()
        .map(|line| {
            line.chars()
                .map(|c| c.to_digit(10).unwrap() as i32)
                .collect()
        })
        .collect();
    let boundary = trees.first().unwrap().len() as i32 * 2 - 4 + trees.len() as i32 * 2;

    for i in 1..trees.len() - 1 {
        for j in 1..trees.first().unwrap().len() - 1 {
            let tree = trees[i][j];

            let left = &trees[i][0..j].iter().any(|x| *x >= tree);
            let right = &trees[i][j + 1..].iter().any(|x| *x >= tree);
            let up = &trees[0..i].iter().any(|row| row[j] >= tree);
            let down = &trees[i + 1..].iter().any(|row| row[j] >= tree);

            if !(*left && *right && *up && *down) {
                count += 1;
            }
        }
    }

    count + boundary
}

fn part_two(input: &String) -> i32 {
    let mut highest = 0;
    let trees: Vec<Vec<i32>> = input
        .lines()
        .map(|line| {
            line.chars()
                .map(|c| c.to_digit(10).unwrap() as i32)
                .collect()
        })
        .collect();

    for i in 0..trees.len() - 1 {
        for j in 0..trees.first().unwrap().len() - 1 {
            let tree = trees[i][j];

            let left = if let Some((pos, _)) = trees[i][0..j]
                .iter()
                .rev()
                .enumerate()
                .find(|(_, x)| **x >= tree)
            {
                pos + 1
            } else {
                j
            };
            let right = if let Some((pos, _)) = trees[i][j + 1..]
                .iter()
                .enumerate()
                .find(|(_, x)| **x >= tree)
            {
                pos + 1
            } else {
                trees[i].len() - j - 1
            };
            let up = if let Some((pos, _)) = trees[0..i]
                .iter()
                .rev()
                .enumerate()
                .find(|(_, row)| row[j] >= tree)
            {
                pos + 1
            } else {
                i
            };
            let down = if let Some((pos, _)) = trees[i + 1..]
                .iter()
                .enumerate()
                .find(|(_, row)| row[j] >= tree)
            {
                pos + 1
            } else {
                trees.len() - i - 1
            };

            let total = left * right * up * down;
            // println!("{} {} {} {} ", left, right, up, down);
            // println!("{}", left * right * up * down);
            if (total) > highest {
                highest = total
            };
        }
    }
    highest as i32
}
