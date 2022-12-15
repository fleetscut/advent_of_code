use std::collections::BinaryHeap;

#[derive(Debug)]
pub struct Grid {
    nodes: Vec<Node>,
}

#[derive(Debug)]
struct Edge {
    to: usize,
    cost: i32,
}

#[derive(Debug)]
struct Node {
    edges: Vec<Edge>,
}

#[derive(Eq, PartialEq)]
struct State {
    node_id: usize,
    cost: i32,
}

impl Ord for State {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        other.cost.cmp(&self.cost)
    }
}

impl PartialOrd for State {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

impl Grid {
    pub fn new() -> Self {
        Self { nodes: Vec::new() }
    }
    pub fn add_node(&mut self, edges: Vec<(usize, i32)>) {
        let node = Node {
            edges: edges
                .iter()
                .map(|(to, cost)| Edge {
                    to: *to,
                    cost: *cost,
                })
                .collect(),
        };
        self.nodes.push(node);
    }

    pub fn find_shortest_path(&self, start: Vec<usize>, end: usize) -> Option<(Vec<usize>, i32)> {
        let mut dists = vec![(i32::MAX, None); self.nodes.len()];
        let mut heap = BinaryHeap::new();

        for s in start {
            dists[s] = (0, None);
            heap.push(State {
                node_id: s,
                cost: 0,
            });
        }

        while let Some(State { node_id, cost }) = heap.pop() {
            if node_id == end {
                let mut path = Vec::new();
                let mut curr = dists[end];
                path.push(end);
                while let Some(prev) = curr.1 {
                    path.push(prev);
                    curr = dists[prev];
                }
                path.reverse();
                return Some((path, cost));
            }
            if cost > dists[node_id].0 {
                continue;
            }

            for edge in &self.nodes[node_id].edges {
                let next = State {
                    node_id: edge.to,
                    cost: cost + edge.cost,
                };
                if next.cost < dists[next.node_id].0 {
                    dists[next.node_id] = (next.cost, Some(node_id));
                    heap.push(next);
                }
            }
        }
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn dijkstra_test() {
        let mut grid = Grid::new();

        let mut list = Vec::new();
        list.push(vec![(1, 3), (2, 1)]);
        list.push(vec![(0, 3), (2, 4), (4, 1)]);
        list.push(vec![(1, 4), (3, 7), (0, 1)]);
        list.push(vec![(2, 7), (4, 5), (6, 1)]);
        list.push(vec![(1, 1), (3, 5), (5, 2)]);
        list.push(vec![(6, 1), (4, 2), (2, 18)]);

        list.push(vec![(3, 1), (5, 1)]);

        list.iter().enumerate().for_each(|(i, l)| {
            grid.add_node(l.to_vec());
        });

        assert_eq!(
            grid.find_shortest_path(0, 6),
            Some(([0, 1, 4, 5, 6].to_vec(), 7))
        );
    }
}
