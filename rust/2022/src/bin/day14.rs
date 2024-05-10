use itertools::Itertools;
use std::{cmp, collections::HashMap, fs::read_to_string};

fn main() {
    let day = 14;
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

fn drop_sand(start: (i32, i32), walls: &mut HashMap<i32, Vec<i32>>) -> bool {
    // let sand = (start.0, *walls.get(&500).unwrap().first().unwrap() - 1);

    let y_pos = walls.get(&start.0).unwrap().iter().find(|y| *y > &start.1);
    if y_pos.is_some() && walls.contains_key(&(start.0 - 1)) && walls.contains_key(&(start.0 + 1)) {
        let y_pos = y_pos.unwrap();
        let mut sand = (start.0, y_pos - 1);
        let left = (sand.0 - 1, sand.1 + 1);
        let right = (sand.0 + 1, sand.1 + 1);

        if !walls.get(&left.0).unwrap().contains(&left.1) {
            sand = (left.0, left.1);
            drop_sand(sand, walls)
        } else if !walls.get(&right.0).unwrap().contains(&right.1) {
            sand = (right.0, right.1);
            drop_sand(sand, walls)
        } else {
            walls.get_mut(&sand.0).unwrap().push(sand.1);
            walls.get_mut(&sand.0).unwrap().sort();
            false
        }
    } else {
        true
    }
}
fn drop_sand2(start: (i32, i32), walls: &mut HashMap<i32, Vec<i32>>, bottom: i32) -> bool {
    let y_pos = walls.get(&start.0).unwrap().iter().find(|y| *y > &start.1);
    if y_pos.is_some() {
        let y_pos = y_pos.unwrap();
        let mut sand = (start.0, y_pos - 1);
        let left = (sand.0 - 1, sand.1 + 1);
        let right = (sand.0 + 1, sand.1 + 1);

        if walls.get(&500).unwrap().contains(&0) {
            return true;
        }

        if walls.contains_key(&left.0) && walls.contains_key(&right.0) {
            if !walls.get(&left.0).unwrap().contains(&left.1) {
                sand = (left.0, left.1);
                return drop_sand2(sand, walls, bottom);
            }
            if !walls.get(&right.0).unwrap().contains(&right.1) {
                sand = (right.0, right.1);
                return drop_sand2(sand, walls, bottom);
            }
            walls.get_mut(&sand.0).unwrap().push(sand.1);
            walls.get_mut(&sand.0).unwrap().sort();
            false
        } else {
            walls.entry(left.0).or_default().push(bottom - 1);
            walls.entry(right.0).or_default().push(bottom - 1);
            false
        }
    } else {
        walls.entry(start.0).or_default().push(bottom - 1);
        false
    }
}

fn find_walls(input: &str) -> (HashMap<i32, Vec<i32>>, i32) {
    let mut walls: HashMap<i32, Vec<i32>> = HashMap::new();
    let mut bottom = 0;
    input.lines().for_each(|line| {
        let line: Vec<(i32, i32)> = line
            .split(" -> ")
            .map(|val| val.split_once(',').unwrap())
            .map(|(x, y)| (x.parse().unwrap(), y.parse().unwrap()))
            .collect();
        for i in 1..line.len() {
            let start_x = cmp::min(line[i].0, line[i - 1].0);
            let end_x = cmp::max(line[i].0, line[i - 1].0);
            let start_y = cmp::min(line[i].1, line[i - 1].1);
            let end_y = cmp::max(line[i].1, line[i - 1].1);

            for x in start_x..=end_x {
                for y in start_y..=end_y {
                    if y > bottom {
                        bottom = y;
                    }
                    walls.entry(x).or_default().push(y);
                }
            }
        }
    });
    (walls, bottom + 2)
}

fn part_one(input: &str) -> i32 {
    let (mut walls, _) = find_walls(input);

    walls.iter_mut().for_each(|wall| wall.1.sort());

    let mut count = 0;
    while !drop_sand((500, 0), &mut walls) {
        count += 1;
    }

    count
}

fn part_two(input: &str) -> i32 {
    let (mut walls, bottom) = find_walls(input);
    let test = walls.clone();
    walls.iter_mut().for_each(|wall| wall.1.sort());

    let mut count = 0;
    while !drop_sand2((500, 0), &mut walls, bottom) {
        count += 1;
    }

    for key in test.keys().sorted() {
        print!("{}:", key);
        for i in (0..=11).rev() {
            if test.get(key).unwrap().contains(&i) {
                print!("o");
            } else {
                print!("-");
            }
        }
        println!();
    }
    for key in walls.keys().sorted() {
        print!("{}:", key);
        for i in (0..=11).rev() {
            if walls.get(key).unwrap().contains(&i) {
                print!("o");
            } else {
                print!("-");
            }
        }
        println!();
    }
    count
}
