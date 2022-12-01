use std::{fmt::Debug, fs::read_to_string, str::FromStr};

pub fn test_print() {
    println!("test lib");
}

pub fn read_lines_from_file<T>(path: &str) -> Vec<T>
where
    T: FromStr,
    <T as FromStr>::Err: Debug,
{
    read_to_string(path)
        .expect("Could not open {path}")
        .lines()
        .map(|line| line.trim().parse::<T>().unwrap())
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_read_lines() {
        let result = vec!["This is a", "file that", "has", "multiple lines"];
        // let result = vec![5, 5];
        assert_eq!(
            result,
            read_lines_from_file::<String>("./data/testLines.txt")
        );
    }
}
