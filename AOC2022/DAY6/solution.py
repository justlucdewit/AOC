# Read input.txt into a string
original_input = open("input.txt", "r").read()

inp = list(original_input)

def arrayIsAllUnique(arr):
    return len(arr) == len(set(arr))

# 4:49
def part1():
    idx = 0
    result = 0
    while idx < len(inp):
        # Get array of first 14 chars
        arr = inp[idx:idx+4]

        # If they are all different
        if arrayIsAllUnique(arr):
            result = idx + 4
            break

        idx += 1
        
    return result

# 1:40
def part2():
    idx = 0
    result = 0
    while idx < len(inp):
        # Get array of first 14 chars
        arr = inp[idx:idx+14]

        # If they are all different
        if arrayIsAllUnique(arr):
            result = idx + 14
            break

        idx += 1
        
    return result

print(f"p1 = {part1()}")
print(f"p2 = {part2()}")