enum LineStatus {
    Incomplete(Vec<char>),
    Corrupt(char),
}

fn main() {
    // let path = "./data/day10ex.txt";
    let path = "./data/day10.txt";
    let input = aoc::read_from_file::<String>(path);
    let input = input
        .iter()
        .map(|line| line.chars().collect())
        .collect::<Vec<Vec<char>>>();

    get_score(&input);
}

fn get_score(input: &Vec<Vec<char>>) {
    let mut corrupt_score = 0;
    let mut incomplete_scores: Vec<u64> = Vec::new();

    for line in input {
        match find_corrupt(line) {
            LineStatus::Corrupt(corrupt) => {
                corrupt_score += match corrupt {
                    ')' => 3,
                    ']' => 57,
                    '}' => 1197,
                    '>' => 25137,
                    _ => 0,
                };
            }
            LineStatus::Incomplete(mut stack) => {
                stack.reverse();
                let mut score = 0;
                for val in stack {
                    score *= 5;
                    score += match val {
                        '(' => 1,
                        '[' => 2,
                        '{' => 3,
                        '<' => 4,
                        _ => 0,
                    };
                }
                incomplete_scores.push(score);
            }
        };
    }
    incomplete_scores.sort();
    println!("part one: {}", corrupt_score);
    println!(
        "part two: {}",
        incomplete_scores.get(incomplete_scores.len() / 2).unwrap()
    );
}

fn find_corrupt(input: &[char]) -> LineStatus {
    let mut stack: Vec<char> = Vec::new();

    for val in input {
        if let Some(opening) = get_opening(val) {
            let last_open = stack.pop().unwrap();
            if opening != last_open {
                return LineStatus::Corrupt(*val);
            }
        } else {
            stack.push(*val);
        }
    }
    LineStatus::Incomplete(stack)
}

fn get_opening(bracket: &char) -> Option<char> {
    match bracket {
        '}' => Some('{'),
        ')' => Some('('),
        ']' => Some('['),
        '>' => Some('<'),
        _ => None,
    }
}
