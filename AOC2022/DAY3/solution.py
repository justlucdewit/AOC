# Read input.txt into a string
original_input = open("input.txt", "r").read()

# Split by newlines and spaces
rucksacks = original_input.split("\n")

# Item is a characters a to z and A to Z
# The value is determined by the position in the alphabet
# lowercase items a trough z have values 1 to 26
# uppercase items A trough Z have values 27 to 52
def valueOfItem(item):
    if item.islower():
        return ord(item) - 96
    else:
        return ord(item) - 38

# 8:56
def part1():
    sum = 0
    for rucksack in rucksacks:
        # Turn array into list of characters
        items = list(rucksack)
        
        # Split the items array into 2 arrays of equal halfs
        a = items[:len(items)//2]
        b = items[len(items)//2:]

        # Find the one item that is in both piles
        duplicate = None
        for item in a:
            if item in b:
                duplicate = item
                break

        value = valueOfItem(duplicate)
        sum += value
    return sum

# 5:59
def part2():
    # Loop over the rucksacks 3 items at a time
    sum = 0
    for i in range(0, len(rucksacks), 3):
    
        # Find the one item that is in all 3 rucksacks
        duplicate = None
        for item in rucksacks[i]:
            if item in rucksacks[i + 1] and item in rucksacks[i + 2]:
                duplicate = item
                break

        value = valueOfItem(duplicate)
        sum += value
    return sum

print(f"p1 = {part1()}")
print(f"p2 = {part2()}")