from vm import VM

# Read input.txt into a string
original_input = open("input.txt", "r").read()

# 25:11
def part1():
    vm = VM()
    vm.load_program(original_input)

    sum = 0
    while not vm.isDone():
        vm.cycle()

        if vm.cycle_count in [20, 60, 100, 140, 180, 220]:
            sum += vm.regX * vm.cycle_count
        
    return sum

# 3:33
def part2():
    vm = VM()
    vm.load_program(original_input)

    buffer = "\n "
    while not vm.isDone():
        vm.cycle()

        current_x_drawing = (vm.cycle_count - 1) % 40
        sprite_position = vm.regX
        delta_position = abs(sprite_position - current_x_drawing)

        if delta_position < 2:
            buffer += "#"
        else:
            buffer += " "

        if vm.cycle_count % 40 == 0:
            buffer += "\n"
        
    return buffer

print(f"p1 = {part1()}")
print(f"p2 = {part2()}")