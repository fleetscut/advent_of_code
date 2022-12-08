use std::fs::read_to_string;

fn main() {
    let day = 7;
    let example_path = format!("./data/day{}ex.txt", day);
    let input_path = format!("./data/day{}.txt", day);

    let example_input = read_to_string(&example_path).expect("Could not open file");
    let input = read_to_string(input_path).expect("Could not open file");

    let p1 = part_one(&example_input);
    println!("Part One Example: {}", p1);
    let p1 = part_one(&input);
    println!("Part One: {}", p1);
    println!("-----");
    let p1 = part_two(&example_input);
    println!("Part Two Example: {}", p1);
    let p1 = part_two(&input);
    println!("Part Two: {}", p1);
}

fn part_one(input: &str) -> i32 {
    get_sizes(input)
        .iter()
        .filter(|size| **size <= 100000)
        .sum()
}

fn part_two(input: &str) -> i32 {
    let total_space = 70000000;
    let update_size = 30000000;
    let sizes = get_sizes(input);
    let used_space: i32 = *sizes.last().unwrap();
    let to_delete = update_size - (total_space - used_space);

    *sizes.iter().filter(|val| **val > to_delete).min().unwrap()
}

fn get_sizes(input: &str) -> Vec<i32> {
    let mut dir_sizes: Vec<i32> = vec![0];
    let mut stack: Vec<i32> = vec![0];

    for line in input
        .lines()
        .filter(|line| !line.contains("dir "))
        .filter(|line| !line.contains("$ cd /"))
        .filter(|line| !line.contains("$ ls"))
    {
        if line.contains("$ cd") {
            match line.split(' ').nth(2).unwrap() {
                ".." => {
                    let dir_size = stack.pop().unwrap();
                    *stack.last_mut().unwrap() += dir_size;
                    dir_sizes.push(dir_size);
                }
                _ => {
                    stack.push(0);
                }
            }
        } else {
            let dir_size = line.split_once(' ').unwrap().0.parse::<i32>().unwrap();
            *stack.last_mut().unwrap() += dir_size;
        }
    }
    //Input does not cd .. back to /. Need to finish the stack
    while !stack.is_empty() {
        let dir_size = stack.pop().unwrap();
        dir_sizes.push(dir_size);
        if !stack.is_empty() {
            *stack.last_mut().unwrap() += dir_size;
        }
    }

    dir_sizes
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn part_one_ex() {
        let example_path = format!("./data/day{}ex.txt", 7);
        let example_input = read_to_string(&example_path).expect("Could not open file");
        assert_eq!(part_one(&example_input), 95437);
    }

    #[test]
    fn part_one_main() {
        let input_path = format!("./data/day{}.txt", 7);
        let input = read_to_string(input_path).expect("Could not open file");
        assert_eq!(part_one(&input), 1792222);
    }

    #[test]
    fn part_two_ex() {
        let example_path = format!("./data/day{}ex.txt", 7);
        let example_input = read_to_string(&example_path).expect("Could not open file");
        assert_eq!(part_two(&example_input), 24933642);
    }

    #[test]
    fn part_two_main() {
        let input_path = format!("./data/day{}.txt", 7);
        let input = read_to_string(input_path).expect("Could not open file");
        assert_eq!(part_two(&input), 1112963);
    }
}
