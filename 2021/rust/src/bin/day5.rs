use std::cmp;
use std::{collections::HashMap, num::ParseIntError, str::FromStr};

#[derive(PartialEq, Eq, Hash, Copy, Clone)]
struct Point {
    x: i32,
    y: i32,
}
impl FromStr for Point {
    type Err = ParseIntError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let (x, y) = s.trim().split_once(',').unwrap();

        Ok(Point {
            x: x.parse()?,
            y: y.parse()?,
        })
    }
}

struct Segment {
    start: Point,
    end: Point,
}
impl FromStr for Segment {
    type Err = ParseIntError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let (p1, p2) = s.trim().split_once("->").unwrap();
        Ok(Segment {
            start: p1.parse()?,
            end: p2.parse()?,
        })
    }
}

fn main() {
    // let path = "./data/day5ex.txt";
    let path = "./data/day5.txt";
    let input: Vec<String> = aoc::read_from_file(path);

    let segments: Vec<Segment> = input
        .iter()
        .map(|input| input.parse::<Segment>().unwrap())
        .collect();

    let dangerous_one = find_dangerout_areas(&segments, false);
    let dangerous_two = find_dangerout_areas(&segments, true);
    println!("Part one: {}", dangerous_one);
    println!("Part two: {}", dangerous_two);
}

fn find_dangerout_areas(segments: &[Segment], diagonal: bool) -> i32 {
    let mut map = HashMap::<Point, i32>::new();

    segments.iter().for_each(|segment| {
        walk_segment(segment, diagonal).iter().for_each(|point| {
            *map.entry(*point).or_insert(0) += 1;
        })
    });

    let mut count = 0;
    for val in map.values() {
        if *val >= 2 {
            count += 1;
        }
    }

    count
}
//
// fn walk_segment(segment: &Segment) -> Vec<Point> {
//     let mut points = Vec::<Point>::new();
//
//     if segment.start.x == segment.end.x {
//         let min = cmp::min(segment.start.y, segment.end.y);
//         let max = cmp::max(segment.start.y, segment.end.y);
//
//         for i in min..=max {
//             points.push(Point {
//                 x: segment.start.x,
//                 y: i,
//             });
//         }
//     } else if segment.start.y == segment.end.y {
//         let min = cmp::min(segment.start.x, segment.end.x);
//         let max = cmp::max(segment.start.x, segment.end.x);
//
//         for i in min..=max {
//             points.push(Point {
//                 x: i,
//                 y: segment.start.y,
//             });
//         }
//     } else if segment.start.x != segment.end.x && segment.start.y != segment.end.y {
//         let x_min = cmp::min(segment.start.x, segment.end.x);
//         let x_max = cmp::max(segment.start.x, segment.end.x);
//         let range_x = (x_min..=x_max).collect::<Vec<i32>>();
//
//         let y_min = cmp::min(segment.start.y, segment.end.y);
//         let y_max = cmp::max(segment.start.y, segment.end.y);
//         let range_y = (y_min..=y_max).collect::<Vec<i32>>();
//         println!(
//             "Segment:{} {} - {} {}",
//             segment.start.x, segment.start.y, segment.end.x, segment.end.y
//         );
//         std::iter::zip(range_x, range_y).for_each(|(x, y)| {
//             println!("{} {}", x, y);
//             points.push(Point { x, y })
//         });
//     }
//
//     points
// }

fn walk_segment(segment: &Segment, diagonal: bool) -> Vec<Point> {
    let mut points = Vec::<Point>::new();

    if !diagonal && (segment.start.x != segment.end.x && segment.start.y != segment.end.y) {
        return vec![];
    }

    let dx = (segment.end.x - segment.start.x).signum();
    let dy = (segment.end.y - segment.start.y).signum();

    let mut x = segment.start.x;
    let mut y = segment.start.y;

    while (x, y) != (segment.end.x + dx, segment.end.y + dy) {
        points.push(Point { x, y });
        x += dx;
        y += dy;
    }

    points
}
