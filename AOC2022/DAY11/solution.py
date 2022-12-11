# Get the input
inp = open("input.txt", "r").read().split("\n\n")

monkeys = []
mi = 0

def parseMonkey(monkey):
    global mi
    global monkeys
    new_monk = {}
    new_monk["index"] = mi
    mi += 1

    lines = monkey.split("\n")
    starting_items = [int(x) for x in lines[1].split(":")[1].split(",")]
    test_divisible_by = int(lines[3][21:])
    if_true_throw_to = int(lines[4][29:])
    if_false_throw_to = int(lines[5][30:])

    new_monk["op_txt"] = lines[2].split(":")[1].replace("old", "x")[7:]
    new_monk["items"] = starting_items
    new_monk["operation"] = lambda x: eval(lines[2].split(":")[1].replace("old", "x")[7:])
    new_monk["test_divisible_by"] = test_divisible_by
    new_monk["if_true_throw_to"] = if_true_throw_to
    new_monk["if_false_throw_to"] = if_false_throw_to
    monkeys.append(new_monk)
    return monkey

for monkey in inp:
    parseMonkey(monkey)

# Multiply all the test_divisible_by numbers of all monkeys
monkey_test_mod = 1
for monkey in monkeys:
    monkey_test_mod *= monkey["test_divisible_by"]
    
monkey_activity = {}

def reset():
    global monkeys
    global monkey_activity
    monkey_activity = {}

    monkeys = []
    for monkey in inp:
        parseMonkey(monkey)

def do_round(division = True):
    i = 0
    global monkey_activity
    
    for monkey in monkeys:
        if monkey["index"] not in monkey_activity:
            monkey_activity[monkey["index"]] = 0

        # Increment the monkey's activity
        monkey_activity[monkey["index"]] += len(monkey["items"])

        for item_worry_level in monkey["items"]:
            item_worry_level =
                (monkey["operation"](item_worry_level) // 3 if division else monkey["operation"](item_worry_level)) % item_worry_level
            
            if item_worry_level % monkey["test_divisible_by"] == 0:
                monkeys[monkey["if_true_throw_to"]]["items"].append(item_worry_level)
            else:
                monkeys[monkey["if_false_throw_to"]]["items"].append(item_worry_level)
        monkey["items"] = []

    # Gather all the worry level numbers from all the monkeys
    all_worry_levels = []
    for monkey in monkeys:
        all_worry_levels += monkey["items"]

# 31:10
def part1():
    
    # do 20 rounds
    for i in range(20):
        do_round()

    # Multiply the activity of the 2 most active monkey
    most_active = sorted(monkey_activity.items(), key=lambda x: x[1], reverse=True)[:2]
    
    return most_active[0][1] * most_active[1][1]

# 33:40
def part2():
    # do 10 000 rounds
    for i in range(10000):
        do_round(False)

    # Multiply the activity of the 2 most active monkey
    most_active = sorted(monkey_activity.items(), key=lambda x: x[1], reverse=True)[:2]
    
    return most_active[0][1] * most_active[1][1]

# Print the solutions
print("Part 1: " + str(part1()))
reset()
print("Part 2: " + str(part2()))