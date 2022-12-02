# Read input.txt into a string
original_input = open("input.txt", "r").read()

# Split by newlines and spaces
games = [game.split(" ") for game in original_input.splitlines()]

def part1():
    def calculate_score(moveA, moveB):
        score = 0

        if moveB == "X":
            score += 1
        if moveB == "Y":
            score += 2
        if moveB == "Z":
            score += 3

        # Ties
        if moveA + moveB in ["AX", "BY", "CZ"]:
            score += 3
        
        # Wins
        if moveA + moveB in ["CX", "AY", "BZ"]:
            score += 6

        return score

    totalScore = 0
    for game in games:
        totalScore += calculate_score(game[0], game[1])

    return totalScore

def part2():
    def calculate_score(moveA, moveB):
        score = 0

        if moveB == "Y":
            score += 3
        if moveB == "Z":
            score += 6

        if moveA + moveB in ["BX", "AY", "CZ"]:
            score += 1
        if moveA + moveB in ["CX", "BY", "AZ"]:
            score += 2
        if moveA + moveB in ["AX", "CY", "BZ"]:
            score += 3

        return score

    totalScore = 0
    for game in games:
        totalScore += calculate_score(game[0], game[1])

    return totalScore

print(f"p1 = {part1()}")
print(f"p2 = {part2()}")