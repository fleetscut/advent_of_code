use aoc::*;

trait Rps {
    fn get_move(val: &str) -> Result<Self, String>
    where
        Self: Sized;

    fn points(&self) -> i32;
}

#[derive(Debug, PartialEq)]
enum Move {
    Rock,
    Paper,
    Scissors,
}

impl Rps for Move {
    fn get_move(val: &str) -> Result<Self, String> {
        match val {
            "A" | "X" => Ok(Move::Rock),
            "B" | "Y" => Ok(Move::Paper),
            "C" | "Z" => Ok(Move::Scissors),
            _ => Err("Invalid Move".to_string()),
        }
    }

    fn points(&self) -> i32 {
        match self {
            Self::Rock => 1,
            Self::Paper => 2,
            Self::Scissors => 3,
        }
    }
}

impl Move {
    fn beats(&self) -> Self {
        match self {
            Self::Rock => Self::Scissors,
            Self::Paper => Self::Rock,
            Self::Scissors => Self::Paper,
        }
    }

    fn loses(&self) -> Self {
        match self {
            Self::Rock => Self::Paper,
            Self::Paper => Self::Scissors,
            Self::Scissors => Self::Rock,
        }
    }
}

#[derive(Debug, PartialEq)]
enum Outcome {
    Draw,
    Win,
    Lose,
}

impl Rps for Outcome {
    fn get_move(val: &str) -> Result<Self, String> {
        match val {
            "X" => Ok(Self::Lose),
            "Y" => Ok(Self::Draw),
            "Z" => Ok(Self::Win),
            _ => Err("Not a valid outcome".to_string()),
        }
    }

    fn points(&self) -> i32 {
        match self {
            Self::Draw => 3,
            Self::Lose => 0,
            Self::Win => 6,
        }
    }
}

fn main() {
    let day = 2;
    let example_path = format!("./data/day{}ex.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_lines_from_file::<String>(&example_path);
    let input = read_lines_from_file::<String>(&input_path);

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);

    let p1 = part_two(&example_input);
    println!("Part Two Example: {}", p1);
    let p1 = part_two(&input);
    println!("Part Two: {}", p1);
}

fn part_one(input: &Vec<String>) -> i32 {
    let mut total_score = 0;
    let rounds = translate_input::<Move, Move>(input);
    for round in rounds {
        let mut score = 0;
        let elf = &round.0;
        let you = &round.1;
        score += you.points();
        if elf == you {
            // DRAW
            score += Outcome::Draw.points();
        } else if elf.beats() == *you {
            // LOSE
            score += Outcome::Lose.points();
        } else if you.beats() == *elf {
            // WIN
            score += Outcome::Win.points();
        }
        total_score += score;
        println!("{}", total_score)
    }

    total_score
}

fn translate_input<L, R>(input: &Vec<String>) -> Vec<(L, R)>
where
    L: Rps,
    R: Rps,
{
    input
        .iter()
        .map(|line| {
            line.split_once(' ')
                .map(|(elf, you)| (L::get_move(elf).unwrap(), R::get_move(you).unwrap()))
                .unwrap()
        })
        .collect()
}

fn part_two(input: &Vec<String>) -> i32 {
    let mut total_score = 0;
    let rounds = translate_input::<Move, Outcome>(input);
    for round in rounds {
        let mut score = 0;
        let elf = round.0;
        let outcome = round.1;

        score += outcome.points();

        if outcome == Outcome::Draw {
            score += elf.points();
        } else if outcome == Outcome::Lose {
            score += elf.beats().points();
        } else if outcome == Outcome::Win {
            score += elf.loses().points();
        }
        total_score += score;
    }

    total_score
}
