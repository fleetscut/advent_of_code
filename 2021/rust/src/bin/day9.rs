use itertools::Itertools;

#[derive(PartialEq, Clone, Copy)]
struct Point {
    x: usize,
    y: usize,
    value: u32,
}

fn main() {
    // let path = "./data/day9ex.txt";
    let path = "./data/day9.txt";
    let input = aoc::read_from_file::<String>(path);
    let input = input
        .iter()
        .map(|line| {
            line.chars()
                .map(|c| c.to_digit(10).unwrap())
                .collect::<Vec<u32>>()
        })
        .collect::<Vec<Vec<u32>>>();

    let risk = get_risk(&input);
    println!("Part one: {}", risk);
    let size = find_basins(&input);
    println!("Part two: {}", size);
}

fn get_risk(matrix: &Vec<Vec<u32>>) -> u32 {
    find_pits(matrix)
        .iter()
        .fold(0, |acc, point| acc + point.value + 1)
}

fn find_pits(matrix: &Vec<Vec<u32>>) -> Vec<Point> {
    let mut pits = Vec::<Point>::new();
    let x_size = matrix.len() - 1;
    for (i, line) in matrix.iter().enumerate() {
        let y_size = line.len() - 1;
        'inner: for (j, num) in line.iter().enumerate() {
            let neighbors = get_neighbors(i, j, x_size, y_size);
            for point in neighbors {
                if num >= &matrix[point.0][point.1] {
                    continue 'inner;
                }
            }
            pits.push(Point {
                x: i,
                y: j,
                value: *num,
            })
        }
    }
    pits
}

fn find_basins(matrix: &Vec<Vec<u32>>) -> usize {
    let pits = find_pits(matrix);

    let size = pits
        .iter()
        .map(|pit| {
            let mut basin = Vec::<Point>::new();
            flood_fill(matrix, pit, &mut basin);
            basin.len()
        })
        .sorted()
        .rev()
        .take(3)
        .product::<usize>();

    size
}

fn flood_fill(matrix: &Vec<Vec<u32>>, point: &Point, basin: &mut Vec<Point>) {
    get_neighbors(point.x, point.y, matrix.len() - 1, matrix[0].len() - 1)
        .iter()
        .map(|p| Point {
            x: p.0,
            y: p.1,
            value: matrix[p.0][p.1],
        })
        .filter(|p| matrix[p.x][p.y] != 9 && p.value > point.value)
        .for_each(|p| flood_fill(matrix, &p, basin));
    if !basin.contains(point) {
        basin.push(*point);
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
    neighbors
}
