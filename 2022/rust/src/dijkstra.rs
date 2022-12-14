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

    pub fn find_shortest_path(&self, start: usize, end: usize) -> Option<(Vec<usize>, i32)> {
        let mut dists = vec![(i32::MAX, None); self.nodes.len()];
        let mut heap = BinaryHeap::new();
        dists[start] = (0, None);
        heap.push(State {
            node_id: start,
            cost: 0,
        });

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
