use std::collections::HashSet;

fn main() {
    let path = "./data/day11.txt";
    let input: Vec<Vec<u32>> = aoc::read_matrix(path);

    part_one(input.clone());
    println!("-----");
    part_two(input);
}

fn part_one(mut input: Vec<Vec<u32>>) -> u32 {
    let mut count = 0;

    for i in 1..=100 {
        count += step(&mut input);
    }
    print_board(&input);
    println!("Flashes: {count}");
    count
}

fn part_two(mut input: Vec<Vec<u32>>) -> u32 {
    let mut count = 0;
    let mut synced = false;
    let mut i = 0;
    let size = input[0].len() * input.len();

    while !synced {
        count = step(&mut input);
        i += 1;

        if count == size as u32 {
            synced = true;
        }
    }
    print_board(&input);
    println!("Synced at {i}");
    i
}

fn step(octopuses: &mut Vec<Vec<u32>>) -> u32 {
    let mut flashed: HashSet<(usize, usize)> = HashSet::new();
    let rows = octopuses.len();
    let cols = octopuses[0].len();

    for x in 0..rows {
        for y in 0..cols {
            octopuses[x][y] += 1;
            check_flash(octopuses, &mut flashed, x, y);
        }
    }

    for flash in &flashed {
        octopuses[flash.0][flash.1] = 0;
    }

    flashed.len() as u32
}

fn check_flash(
    octopuses: &mut Vec<Vec<u32>>,
    flashed: &mut HashSet<(usize, usize)>,
    x: usize,
    y: usize,
) {
    if octopuses[x][y] > 9 && !flashed.contains(&(x, y)) {
        let neighbors = get_neighbors(x, y, 9, 9);
        flashed.insert((x, y));

        for neighbor in neighbors {
            octopuses[neighbor.0][neighbor.1] += 1;
            check_flash(octopuses, flashed, neighbor.0, neighbor.1);
        }
    }
}

fn get_neighbors(x: usize, y: usize, x_max: usize, y_max: usize) -> Vec<(usize, usize)> {
    let mut neighbors = Vec::new();
    if x > 0 {
        neighbors.push((x - 1, y));
    }
    if y > 0 {
        neighbors.push((x, y - 1));
    }
    if x < x_max {
        neighbors.push((x + 1, y));
    }
    if y < y_max {
        neighbors.push((x, y + 1));
    }
    if x > 0 && y > 0 {
        neighbors.push((x - 1, y - 1));
    }
    if x < x_max && y > 0 {
        neighbors.push((x + 1, y - 1));
    }
    if x > 0 && y < y_max {
        neighbors.push((x - 1, y + 1));
    }
    if x < x_max && y < y_max {
        neighbors.push((x + 1, y + 1));
    }
    neighbors
}

fn print_board(board: &[Vec<u32>]) {
    for line in board {
        println!(
            "{:?}",
            line.iter().map(|c| c.to_string()).collect::<String>()
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let path = "./data/day11ex.txt";
        let input: Vec<Vec<u32>> = aoc::read_matrix(path);

        let count = part_one(input);
        assert_eq!(count, 1656);
    }

    #[test]
    fn test_part_two() {
        let path = "./data/day11ex.txt";
        let input: Vec<Vec<u32>> = aoc::read_matrix(path);
        let synced = part_two(input);
        assert_eq!(synced, 195);
    }
}
