use std::fs::read_to_string;

fn main() {
    let day = 5;
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

fn part_one(input: &str) -> String {
    let (crates, commands) = input.split_once("\n\n").unwrap();

    let mut crates: Vec<&str> = crates.lines().collect();
    let commands: Vec<&str> = commands.lines().collect();

    crates.reverse();

    let mut stacks = create_stack(&crates);
    let commands = create_commands(&commands);

    move_crates9000(&mut stacks, &commands);

    stacks.iter().map(|stack| stack.last().unwrap()).collect()
}

fn create_stack(crates: &[&str]) -> Vec<Vec<char>> {
    let mut crates = crates.iter();
    let size = crates.next().unwrap();
    let size = (size.len() + 1) / 4;

    let mut stacks: Vec<Vec<char>> = Vec::new();

    for _ in 0..size {
        stacks.push(Vec::new());
    }

    for line in crates {
        line.chars().enumerate().for_each(|val| {
            if val.1.is_alphabetic() {
                stacks[val.0 / 4].push(val.1);
            }
        })
    }

    stacks
}

fn move_crates9001(stacks: &mut [Vec<char>], commands: &[Vec<i32>]) {
    for command in commands {
        let mut to_move = Vec::new();
        for _ in 0..command[0] {
            to_move.push(stacks[command[1] as usize - 1].pop().unwrap());
        }

        to_move.reverse();
        stacks[command[2] as usize - 1].extend_from_slice(&to_move);
    }
}

fn move_crates9000(stacks: &mut [Vec<char>], commands: &[Vec<i32>]) {
    for command in commands {
        for _ in 0..command[0] {
            let to_move = stacks[command[1] as usize - 1]
                .pop()
                .expect("Stack is empty");
            stacks[command[2] as usize - 1].push(to_move);
        }
    }
}

fn create_commands(commands: &[&str]) -> Vec<Vec<i32>> {
    commands
        .iter()
        .map(|line| {
            line.split(' ')
                .filter_map(|c| c.parse::<i32>().ok())
                .collect()
        })
        .collect()
}

fn part_two(input: &String) -> String {
    let (crates, commands) = input.split_once("\n\n").unwrap();

    let mut crates: Vec<&str> = crates.lines().collect();
    let commands: Vec<&str> = commands.lines().collect();

    crates.reverse();

    let mut stacks = create_stack(&crates);
    let commands = create_commands(&commands);

    move_crates9001(&mut stacks, &commands);

    stacks.iter().map(|stack| stack.last().unwrap()).collect()
}
