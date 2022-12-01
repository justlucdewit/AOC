# Read input.txt into a string
original_input = open("input.txt", "r").read()

def get_inventories():
    problem_input = original_input

    # Split the input by a double newline
    inventories = problem_input.split("\n\n")

    # Split each inventory by a newline and parse as number
    inventories = [[int(x) for x in inventory.split("\n")] for inventory in inventories]

    return [sum(inventory) for inventory in inventories]


def part1():
    inventories = get_inventories()

    # Print the biggest sum
    return max(inventories)

def part2():
    inventories = get_inventories()


    # Find the top 3 biggest sums
    inventories.sort(reverse=True)
    inventories = inventories[:3]

    # Return the total of the top 3 sums
    return sum(inventories)

print(f"p1 = {part1()}")
print(f"p2 = {part2()}")