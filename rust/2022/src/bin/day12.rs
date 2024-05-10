use aoc::dijkstra;
use std::fs::read_to_string;

fn main() {
    let day = 12;
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
    // part_two(&example_input);
}

fn find_path(input: &str, multiple_paths: bool) -> i32 {
    let mut grid = dijkstra::Grid::new();
    let mut start = Vec::new();
    let mut end = 0;
    let input: Vec<Vec<i32>> = input
        .lines()
        .enumerate()
        .map(|(x, line)| {
            line.chars()
                .enumerate()
                .map(|(y, c)| match c {
                    'S' => {
                        start.push(x * line.len() + y);
                        'a'
                    }
                    'a' => {
                        if multiple_paths {
                            start.push(x * line.len() + y);
                        }
                        'a'
                    }
                    'E' => {
                        end = x * line.len() + y;
                        'z'
                    }
                    c => c,
                })
                .map(|c| c as i32)
                .collect()
        })
        .collect();

    for x in 0..input.len() {
        for y in 0..input[0].len() {
            // print!("{:02},", one_d_index(x, y, input[0].len()));
            // print!("{:02},", input[x][y]);
        }
        // println!();
    }
    // println!();
    for x in 0..input.len() {
        for y in 0..input[0].len() {
            // print!("{:02},", one_d_index(x, y, input[0].len()));
        }
        // println!();
    }

    let mut edges: Vec<Vec<(usize, i32)>> = Vec::new();
    input.iter().enumerate().for_each(|(x, row)| {
        row.iter().enumerate().for_each(|(y, _)| {
            let neighbors: Vec<(usize, usize)> =
                get_neighbors(x, y, input.len() - 1, row.len() - 1)
                    .into_iter()
                    .filter(|n| neighbor_filter(input[x][y], input[n.0][n.1]))
                    .collect();
            edges.push(
                neighbors
                    .iter()
                    .map(|(x, y)| (x * row.len() + y, input[*x][*y]))
                    .collect(),
            )
        });
    });

    input.iter().flatten().enumerate().for_each(|(i, _)| {
        grid.add_node(edges.get(i).unwrap().to_vec());
    });

    // for edge in edges {
    //     println!("{:?}", edge);
    // }
    let (path, cost) = grid.find_shortest_path(start, end).unwrap();
    for p in &path {
        // println!(
        //     "{}",
        //     // (input[p % input.len()][p / input[0].len()] + 97) as u8 as char
        //     p
        // )
    }
    println!("len {}", path.len());
    println!("{:?}", cost);
    path.len() as i32 - 1
}
fn part_one(input: &str) -> i32 {
    find_path(input, false)
}

fn part_two(input: &str) -> i32 {
    find_path(input, true)
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
    neighbors
}

fn neighbor_filter(p1: i32, p2: i32) -> bool {
    p2 - p1 < 2
}

fn one_d_index(x: usize, y: usize, w: usize) -> usize {
    x * w + y
}
