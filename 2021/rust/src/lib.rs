use std::fmt::Debug;
use std::fs::{self, read_to_string};
use std::str::FromStr;

pub fn read_from_file<T>(path: &str) -> Vec<T>
where
    T: FromStr,
    <T as FromStr>::Err: Debug,
{
    read_to_string(path)
        .expect("Could not open file")
        .lines()
        .map(|line| line.trim().parse::<T>().unwrap())
        .collect()
}

pub fn read_one_line<T>(path: &str, delim: &str) -> Vec<T>
where
    T: FromStr,
    <T as FromStr>::Err: Debug,
{
    read_to_string(path)
        .expect("Could not open file")
        .trim()
        .split(delim)
        .map(|val| val.parse::<T>().unwrap())
        .collect()
}
