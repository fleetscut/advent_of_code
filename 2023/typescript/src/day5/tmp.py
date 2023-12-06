def get(depth, src):
    for c, d, dst in map_ranges[depth]:
        if c <= src < d:
            new = src - c + dst
            return new if depth == 6 else get(depth + 1, new)
    return src if depth == 6 else get(depth + 1, src)


with open("input.txt") as f:
    ls = f.read().split("\n\n")

seeds, maps = [int(n) for n in ls[0].split(": ")[1].split()], [
    [[int(m) for m in n.split()] for n in l.split(":\n")[1].splitlines()]
    for l in ls[1:]
]

map_ranges = [[] for _ in range(7)]
for depth, m in enumerate(maps):
    for dst, src, l in m:
        map_ranges[depth].append([src, src + l, dst])

print(min([get(0, seed) for seed in seeds]))
