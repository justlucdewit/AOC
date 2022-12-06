# Get the input
inp = list(open("input.txt", "r").read())

def solve(n):
    idx = 0
    result = 0
    while idx < len(inp):
        # Get array of first 14 chars
        arr = inp[idx:idx+n]

        # If they are all different
        if len(arr) == len(set(arr)):
            result = idx + n
            break

        idx += 1
    return result

# 4:49
def part1():
    return solve(4)

# 1:40
def part2():
    return solve(14)

print(f"p1 = {part1()}")
print(f"p2 = {part2()}")