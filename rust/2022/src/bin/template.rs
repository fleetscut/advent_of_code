use std::fs::read_to_string;

fn main() {
    let day = 0;
    let example_path = format!("./data/day{}ex.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_to_string(&example_path).expect("Could not open file");
    let input = read_to_string(input_path).expect("Could not open file");

    part_one(&example_input);
    part_two(&example_input);
}

fn part_one(input: &String) -> String {
    println!("Part One:");
    println!("{}", input);
    "".to_string()
}

fn part_two(input: &String) -> String {
    println!("Part Two:");
    println!("{}", input);
    "".to_string()
}
