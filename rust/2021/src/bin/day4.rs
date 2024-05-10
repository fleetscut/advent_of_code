use itertools::Itertools;
use std::collections::HashSet;
use std::str::Lines;

#[derive(Clone)]
struct Board {
    sets: Vec<HashSet<i32>>,
    // test: i32,
}
impl Board {
    fn new(lines: &mut Lines) -> Option<Board> {
        // Skip the empty line
        // does this get stuck in a next loop if none is not returned?
        let empty = lines.next().unwrap_or("done");
        let mut sets: Vec<HashSet<i32>> = Vec::new();

        if empty == "done" {
            return None;
        }

        let board: Vec<Vec<i32>> = lines
            .take(5)
            .map(|line| {
                line.split_whitespace()
                    .map(|val| val.parse().unwrap())
                    .collect()
            })
            .collect_vec();
        // rows
        for i in 0..board.len() {
            let mut set = HashSet::new();
            for j in 0..board[i].len() {
                set.insert(board[i][j]);
            }
            sets.push(set);
        }
        for i in 0..board.len() {
            let mut set = HashSet::new();
            for j in 0..board[i].len() {
                set.insert(board[j][i]);
            }
            sets.push(set);
        }

        Some(Board { sets })
    }

    fn call_number(&mut self, num: &i32) -> bool {
        let mut bingo = false;
        for set in self.sets.iter_mut() {
            if set.remove(num) {
                bingo |= set.is_empty();
            }
        }
        bingo
    }

    fn score(&self) -> i32 {
        HashSet::<&i32>::from_iter(self.sets.iter().flatten())
            .into_iter()
            .sum()
    }
}

fn main() {
    // let path = "./data/day4ex.txt";
    // let mut lines = include_str!("../../data/day4ex.txt").lines();
    let mut lines = include_str!("../../data/day4.txt").lines();
    // let input = aoc::read_from_file::<String>(path);
    // let mut lines = input.iter();

    let draws: Vec<i32> = lines
        .next()
        .unwrap()
        .split(',')
        .map(|val| val.parse::<i32>().unwrap())
        .collect_vec();

    let mut boards = Vec::new();
    while let Some(board) = Board::new(&mut lines) {
        boards.push(board);
    }

    part_one(&boards, &draws);
    part_two(&boards, &draws);
}
fn part_one(boards: &Vec<Board>, draws: &Vec<i32>) {
    let mut boards = boards.clone();
    'draws: for draw in draws {
        for board in boards.iter_mut() {
            if board.call_number(draw) {
                println!("Part 1: {}", draw * board.score());
                break 'draws;
            }
        }
    }
}

fn part_two(boards: &Vec<Board>, draws: &Vec<i32>) {
    let mut boards = boards.clone();
    let mut last = 0;

    for draw in draws {
        let mut remove = Vec::new();
        for (index, board) in boards.iter_mut().enumerate() {
            let result = board.call_number(draw);
            if result {
                last = draw * board.score();
                remove.push(index);
            }
        }

        for index in remove.iter().rev() {
            boards.remove(*index);
        }
    }
    println!("Part 2: {}", last);
}
