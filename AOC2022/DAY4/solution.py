# Read input.txt into a string
original_input = open("input.txt", "r").read()

# Split by newlines and commas
rangePairs = [rangePair.split(",") for rangePair in original_input.split("\n")]

# Parse the individual ranges into integers
ranges = []
for pair in rangePairs:
    newRange = []
    for range in pair:
        newRange.append({
            "start": int(range.split("-")[0]),
            "end": int(range.split("-")[1])
        })

    ranges.append(newRange)

# 8:09
def part1():
    counter = 0
    for pair in ranges:
        # See if the first range is in the second range
        if pair[0]["start"] >= pair[1]["start"] and pair[0]["end"] <= pair[1]["end"]:
            counter += 1
        
        # See if the second range is in the first range
        elif pair[1]["start"] >= pair[0]["start"] and pair[1]["end"] <= pair[0]["end"]:
            counter += 1
    
    return counter

# 5:11
def part2():
    counter = 0

    # Find the number of pairs that overlap at all
    for pair in ranges:

        # See if the first range has overlap with the second range
        if pair[0]["start"] <= pair[1]["end"] and pair[0]["end"] >= pair[1]["start"]:
            counter += 1

        # See if the second range has overlap with the first range
        elif pair[1]["start"] <= pair[0]["end"] and pair[1]["end"] >= pair[0]["start"]:
            counter += 1
        
    return counter

print(f"p1 = {part1()}")
print(f"p2 = {part2()}")