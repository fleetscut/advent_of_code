use std::{collections::HashSet, fs::read_to_string};

struct Rope {
    knots: Vec<(i32, i32)>,
    visited: HashSet<(i32, i32)>,
}

impl Rope {
    fn new(size: usize) -> Self {
        let mut visited = HashSet::new();
        visited.insert((0, 0));

        let knots = vec![(0, 0); size];
        Self { knots, visited }
    }

    fn move_tail(&mut self, h: usize, t: usize) {
        let head = *self.knots.get(h).unwrap();
        let mut tail = *self.knots.get(t).unwrap();

        match tail.0.cmp(&head.0) {
            std::cmp::Ordering::Less => tail.0 += 1,
            std::cmp::Ordering::Greater => tail.0 -= 1,
            _ => (),
        }
        match tail.1.cmp(&head.1) {
            std::cmp::Ordering::Less => tail.1 += 1,
            std::cmp::Ordering::Greater => tail.1 -= 1,
            _ => (),
        }

        *self.knots.get_mut(t).unwrap() = tail;

        if t == self.knots.len() - 1 {
            self.visited.insert(tail);
        }
    }

    fn move_head(&mut self, dir: &str) {
        let mut head = *self.knots.first_mut().unwrap();

        match dir {
            "R" => head.0 += 1,
            "L" => head.0 -= 1,
            "U" => head.1 += 1,
            "D" => head.1 -= 1,
            _ => (),
        }

        *self.knots.first_mut().unwrap() = head;
    }
}

fn is_adjacent(head: (i32, i32), tail: (i32, i32)) -> bool {
    if (head.0 == tail.0 + 1 || head.0 == tail.0 - 1) && (head.1 == tail.1) {
        return true;
    }
    //up or down
    if (head.1 == tail.1 + 1 || head.1 == tail.1 - 1) && (head.0 == tail.0) {
        return true;
    }
    if (tail.1 - head.1 == tail.0 - head.0)
        && (tail.1 - head.1).abs() <= 1
        && (tail.0 - head.0).abs() <= 1
    {
        return true;
    }
    if (tail.1 - head.1 == head.0 - tail.0)
        && (tail.1 - head.1).abs() <= 1
        && (head.0 - tail.0) <= 1
    {
        return true;
    }

    false
}

fn main() {
    let day = 9;
    let example_path = format!("./data/day{}ex.txt", day);
    let example_path2 = format!("./data/day{}ex2.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_to_string(&example_path).expect("Could not open file");
    let example_input2 = read_to_string(&example_path2).expect("Could not open file");
    let input = read_to_string(input_path).expect("Could not open file");

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);
    println!("-----");
    let p2 = part_two(&example_input);
    println!("Part Two Example: {}", p2);
    let p2 = part_two(&example_input2);
    println!("Part Two Example: {}", p2);
    let p2 = part_two(&input);
    println!("Part Two: {}", p2);
}

fn part_one(input: &str) -> i32 {
    run_simulation(input, 2)
}

fn part_two(input: &str) -> i32 {
    run_simulation(input, 10)
}

fn run_simulation(input: &str, size: usize) -> i32 {
    let mut rope = Rope::new(size);
    input
        .lines()
        .map(|line| line.split_once(' ').unwrap())
        .for_each(|(dir, step)| {
            //
            for _ in 0..step.parse().unwrap() {
                rope.move_head(dir);

                for knot in 1..rope.knots.len() {
                    if !is_adjacent(rope.knots[knot - 1], rope.knots[knot]) {
                        rope.move_tail(knot - 1, knot);
                    }
                }
            }
        });
    rope.visited.len() as i32
}
