# Read input.txt into a string
original_input = open("input.txt", "r").read()

# Split each line by spaces and parse second one as int
inp = [(line.split(" ")[0], int(line.split(" ")[1])) for line in original_input.splitlines()]

def move_rope(move, head, tail, move_head=True, move_tail=True):
    head_x, head_y, tail_X, tail_y = None, None, None, None
    
    if head != None:
        head_x = head[0]
        head_y = head[1]

    if tail != None:
        tail_X = tail[0]
        tail_y = tail[1]
    
    if move_head:

        # Move the head
        if move == "R":
            head_x += 1
        elif move == "L":
            head_x -= 1
        elif move == "U":
            head_y += 1
        elif move == "D":
            head_y -= 1

    if move_tail:

        # The tail may at max be 1 unit different from head x or y
        is_too_far_away = abs(head_x - tail_X) > 1 or abs(head_y - tail_y) > 1

        # Move the tail of the rope in
        if is_too_far_away:
            if head_x > tail_X:
                tail_X += 1
            elif head_x < tail_X:
                tail_X -= 1

            if head_y > tail_y:
                tail_y += 1
            elif head_y < tail_y:
                tail_y -= 1
    
    return (head_x, head_y), (tail_X, tail_y)

# 11:26
def part1():
    moves = inp.copy()
    unique_tail_positions = set()

    head, tail = (0, 0), (0, 0)

    for move in moves:
        # Execute the move on the head
        for i in range(move[1]):
            head, tail = move_rope(move[0], head, tail)
            unique_tail_positions.add(tail)

    return len(unique_tail_positions)

# 13:16
def part2():
    moves = inp.copy()
    unique_tail_positions = set()

    # Create 10 rope nodes at 0,0
    rope_nodes = [(0, 0) for i in range(10)]

    for move in moves:
        for _ in range(move[1]):
            

            # Move the rope head
            rope_head = rope_nodes[0]
            rope_head, _ = move_rope(move[0], rope_head, None, move_tail=False)
            rope_nodes[0] = rope_head

            # Move all the tails one by one
            node_index = 1
            while node_index < len(rope_nodes):
                tail = rope_nodes[node_index]
                head = rope_nodes[node_index - 1]

                head, tail = move_rope(move[0], head, tail, move_head=False)

                rope_nodes[node_index] = tail

                node_index += 1
            
            # Add the new tail to the list
            unique_tail_positions.add(rope_nodes[-1])

    return len(unique_tail_positions)

print(f"p1 = {part1()}")
print(f"p2 = {part2()}")