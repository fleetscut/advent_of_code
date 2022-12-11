use std::fs::read_to_string;

#[derive(Debug)]
enum Instruction {
    Noop { cycles: i32 },
    Add { cycles: i32, value: i32 },
}

fn main() {
    let day = 10;
    let example_path = format!("./data/day{}ex2.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_to_string(&example_path).expect("Could not open file");
    let input = read_to_string(input_path).expect("Could not open file");

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);
}

fn run(commands: &mut Vec<Instruction>) -> i32 {
    let mut x = 1;
    let mut update = 0;
    let mut count = 1;
    let mut cycles = 0;
    let mut signal = 0;

    while !commands.is_empty() {
        if count % 40 == 20 {
            signal += count * x;
        }
        if (count - 1) % 40 == 0 {
            println!("{}", count - 1);
            // x += 40;
        }
        let pos = (count - 1) % 40;
        if pos >= x - 1 && pos <= x + 1 {
            print!("#");
        } else {
            print!(".");
        }

        if cycles == 0 {
            let command = commands.pop().unwrap();
            // println!("{}: running {:?}", count, command);
            match command {
                Instruction::Noop { cycles: c } => cycles += c,
                Instruction::Add {
                    cycles: c,
                    value: val,
                } => {
                    cycles += c;
                    update = val;
                }
            };
        } else if cycles == 1 && update != 0 {
            x += update;
            update = 0;
        }
        cycles -= 1;
        count += 1;
    }

    signal
}

fn part_one(input: &str) -> i32 {
    let mut commands: Vec<Instruction> = input
        .lines()
        .map(|line| line.split(' ').collect::<Vec<&str>>())
        .map(|command| {
            //
            match command[0] {
                // "noop" => Some(Instruction::Noop { cycles: 1 }),
                "addx" => Instruction::Add {
                    value: command[1].parse().unwrap(),
                    cycles: 2,
                },
                _ => Instruction::Noop { cycles: 1 },
            }
        })
        .collect();
    commands.reverse();
    run(&mut commands)
}

fn part_two(input: &String) -> String {
    println!("Part Two:");
    println!("{}", input);
    "".to_string()
}
