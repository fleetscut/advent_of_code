use std::{collections::VecDeque, fs::read_to_string};

enum InstructionType {
    Noop,
    Add,
}

struct Instruction {
    instruction: InstructionType,
    cycles: i32,
    value: Option<i32>,
}
struct Cpu {
    instructions: VecDeque<Instruction>,
    x: i32,
    cycle_count: i32,
}

#[derive(Debug)]
struct Crt {
    pixels: Vec<char>,
}

impl Cpu {
    fn new() -> Self {
        Self {
            instructions: VecDeque::new(),
            x: 1,
            cycle_count: 1,
        }
    }

    fn run(&mut self, mut crt: Option<&mut Crt>) -> i32 {
        let mut signal = 0;

        while let Some(instruction) = self.instructions.pop_front() {
            for cycle in 0..instruction.cycles {
                if self.cycle_count % 40 == 20 {
                    signal += self.cycle_count * self.x;
                }
                if let Some(x) = &mut crt {
                    x.update_pixel(self.cycle_count, self.x);
                }
                let test = crt.as_ref();
                println!("{:?}", test);
                if cycle == instruction.cycles - 1 {
                    self.x += instruction.value.unwrap_or(0);
                }
                self.cycle_count += 1;
            }
        }
        println!("Ending {}:  -> {}", self.cycle_count, self.x);
        signal
    }

    fn add_instruction(&mut self, command: &str) {
        let instruction = if command.contains("noop") {
            Some(Instruction {
                instruction: InstructionType::Noop,
                cycles: 1,
                value: None,
            })
        } else {
            let (_, value) = command.split_once(' ').unwrap();
            Some(Instruction {
                instruction: InstructionType::Add,
                cycles: 2,
                value: value.parse::<i32>().ok(),
            })
        };
        self.instructions.push_back(instruction.unwrap());
    }
}

impl Crt {
    fn new() -> Self {
        Self { pixels: Vec::new() }
    }

    fn update_pixel(&mut self, count: i32, x: i32) {
        let pos = (count - 1) % 40;
        if pos >= x - 1 && pos <= x + 1 {
            self.pixels.push('#');
        } else {
            self.pixels.push('.');
        }
    }

    fn print(&self) {
        self.pixels
            .chunks(40)
            .map(|chunk| chunk.iter().collect::<String>())
            .for_each(|line| println!("{}", line))
    }
}

fn main() {
    let day = 10;
    // let example_path = format!("./data/day{}ex.txt", day);
    let example_path = format!("./data/day{}ex2.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_to_string(&example_path).expect("Could not open file");
    let input = read_to_string(input_path).expect("Could not open file");

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);
    println!("Part Two Example:");
    part_two(&example_input);
    println!("Part Two: {}", p1);
    part_two(&input);
}

fn part_one(input: &str) -> i32 {
    let mut cpu = Cpu::new();
    input.lines().for_each(|line| cpu.add_instruction(line));
    cpu.run(None)
}

fn part_two(input: &str) {
    let mut cpu = Cpu::new();
    let mut crt = Crt::new();
    input.lines().for_each(|line| cpu.add_instruction(line));
    cpu.run(Some(&mut crt));
    crt.print();
}
