use std::{
    cmp::{self, Ordering},
    fs::read_to_string,
};

fn main() {
    let day = 13;
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

fn compare(left: &serde_json::Value, right: &serde_json::Value) -> Ordering {
    if left.is_number() && right.is_number() {
        let left = left.as_u64().unwrap();
        let right = right.as_u64().unwrap();
        match left.cmp(&right) {
            Ordering::Less => return Ordering::Less,
            Ordering::Greater => return Ordering::Greater,
            Ordering::Equal => return Ordering::Equal,
        }
    }
    if left.is_array() && right.is_array() {
        let l = left.as_array().unwrap();
        let r = right.as_array().unwrap();
        let mut result = Ordering::Equal;
        for i in 0..cmp::max(l.len(), r.len()) {
            if i == l.len() {
                return Ordering::Less;
            } else if i == r.len() {
                return Ordering::Greater;
            }
            result = compare(l.get(i).unwrap(), r.get(i).unwrap());
            if result != Ordering::Equal {
                break;
            }
        }
        return result;
    }
    if left.is_number() && right.is_array() {
        compare(
            &serde_json::Value::from(vec![left.as_u64().unwrap()]),
            right,
        )
    } else if right.is_number() && left.is_array() {
        compare(
            left,
            &serde_json::Value::from(vec![right.as_u64().unwrap()]),
        )
    } else {
        unreachable!();
    }
}

fn part_one(input: &str) -> i32 {
    let mut correct: Vec<i32> = Vec::new();
    input
        .split("\n\n")
        .map(|pair| pair.split_once('\n').unwrap())
        .map(|(left, right)| {
            (
                serde_json::from_str::<serde_json::Value>(left).unwrap(),
                serde_json::from_str::<serde_json::Value>(right).unwrap(),
            )
        })
        .enumerate()
        .for_each(|(index, (left, right))| {
            match compare(&left, &right) {
                Ordering::Less => {
                    correct.push(index as i32 + 1);
                }
                Ordering::Greater => {}
                _ => (),
            }
            // }
        });
    correct.iter().sum()
}

fn part_two(input: &str) -> i32 {
    let mut input: String = input.to_owned();
    input.push_str("[[2]]\n[[6]]\n");
    let mut packets: Vec<_> = input
        .split('\n')
        .filter(|line| !line.is_empty())
        .map(|packet| serde_json::from_str::<serde_json::Value>(packet).unwrap())
        .collect();
    packets.sort_by(compare);
    let packets: Vec<String> = packets.iter().map(|line| line.to_string()).collect();

    let p1 = packets.iter().position(|p| p == "[[2]]").unwrap() as i32 + 1;
    let p2 = packets.iter().position(|p| p == "[[6]]").unwrap() as i32 + 1;

    p1 * p2
}
