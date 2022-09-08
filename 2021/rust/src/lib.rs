use std::fmt::Debug;
use std::str::FromStr;

pub fn read_from_file<T>(path: &str) -> Vec<T>
where
    T: FromStr,
    <T as FromStr>::Err: Debug,
{
    std::fs::read_to_string(path)
        .expect("Could not open file")
        .lines()
        .map(|line| line.trim().parse::<T>().unwrap())
        .collect()
}
