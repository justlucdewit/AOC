# Read input.txt into a string
original_input = open("input.txt", "r").read()

# Split input on empty line
stacks, moves = original_input.split("\n\n")

# Split stack per line, and then each character
stacks = stacks.splitlines()
stacks = [list(stack) for stack in stacks]

# Moves look like this "move x from y to z"
# Parse the moves into a list of tuples
moves = moves.splitlines()
moves = [move.split() for move in moves]
moves = [(int(move[1]), int(move[3]), int(move[5])) for move in moves]

# 20:40
def part1():
    # Make a copy of the stacks
    stacks_copy = [stack.copy() for stack in stacks]

    # Execute the moves
    for move in moves:
        amount_to_move = move[0]
        from_location = move[1] - 1
        to_location = move[2] - 1

        # # Move the disks
        # moving_disks = []
        stack_to_move = []
        for _ in range(amount_to_move):
            stack_to_move.append(stacks_copy[from_location].pop())
        
        # # Add the disks to the new stack
        for disk in stack_to_move:
            stacks_copy[to_location].append(disk)

    output = ""

    # Last crate of each stack
    for stack in stacks_copy:
        output += stack[-1]

    return output 

# 1:24
def part2():
    # Make a copy of the stacks
    stacks_copy = [stack.copy() for stack in stacks]

    # Execute the moves
    for move in moves:
        amount_to_move = move[0]
        from_location = move[1] - 1
        to_location = move[2] - 1

        # # Move the disks
        # moving_disks = []
        stack_to_move = []
        for _ in range(amount_to_move):
            stack_to_move.append(stacks_copy[from_location].pop())
        
        # # Add the disks to the new stack
        stack_to_move.reverse()
        for disk in stack_to_move:
            stacks_copy[to_location].append(disk)

    output = ""

    # Last crate of each stack
    for stack in stacks_copy:
        output += stack[-1]

    return output 

print(f"p1 = {part1()}")
print(f"p2 = {part2()}")