# Get the input
inp = open("input.txt", "r").readlines()

# For each line in the input
#  Split the line into a list of strings
inp = [list(line) for line in inp]

# Filter out the new lines
forrest = [list(filter(lambda x: x != "\n", line)) for line in inp]

# Calculate the width and height of the 2d array
width = len(forrest[0])
height = len(forrest)

# 23:24
def part1():
    goodTrees = []

    # Loop trough all x and y coords
    for y in range(len(forrest)):
        for x in range(len(forrest[y])):
            # tree is just a number representing the height
            tree = forrest[y][x]
            goodTree = False

            # Loop over all of the trees that are to the left of this tree
            neighboors = []
            for i in range(x):
                neighboors.append(forrest[y][i])

            # If all of them are lower numbers, set goodTree to true
            if all([tree > n for n in neighboors]):
                goodTree = True

            # Loop over all of the trees that are to the right of this tree
            neighboors = []
            for i in range(x + 1, width):
                neighboors.append(forrest[y][i])

            # If all of them are lower numbers, set goodTree to true
            if all([tree > n for n in neighboors]):
                goodTree = True

            # Loop over all of the trees that are above this tree
            neighboors = []
            for i in range(y):
                neighboors.append(forrest[i][x])
            
            # If all of them are lower numbers, set goodTree to true
            if all([tree > n for n in neighboors]):
                goodTree = True

            # Loop over all of the trees that are below this tree
            neighboors = []
            for i in range(y + 1, height):
                neighboors.append(forrest[i][x])
            
            # If all of them are lower numbers, set goodTree to true
            if all([tree > n for n in neighboors]):
                goodTree = True
            
            if goodTree:
                goodTrees.append(tree)

    return len(goodTrees)

# Return an array of the ascending neighboors
# From the end of the neighboors array, get the ones that are lower than the tree
# and also not blocked
def ascendingNeigboors(neighboors, tree):
    an = []
    previus = 0
    for current in neighboors:
        # If the current is bigger than the previous one
        if int(current) < int(tree):
            an.append(current)
        else:
            an.append(current)
            break

    return an


# 13:20
def part2():
    scenicScoreRecord = 0
    
    # Loop trough all x and y coords
    for y in range(len(forrest)):
        for x in range(len(forrest[y])):
            scenicScore = 1

            # tree is just a number representing the height
            tree = forrest[y][x]
            treesInSightCount = []

            # Loop over all of the trees that are to the left of this tree
            neighboors = []
            for i in range(x):
                neighboors.append(forrest[y][i])

            neighboors.reverse()
            scenicScore *= len(ascendingNeigboors(neighboors, tree))

            # Loop over all of the trees that are to the right of this tree
            neighboors = []
            for i in range(x + 1, width):
                neighboors.append(forrest[y][i])
            
            scenicScore *= len(ascendingNeigboors(neighboors, tree))

            # Loop over all of the trees that are above this tree
            neighboors = []
            for i in range(y):
                neighboors.append(forrest[i][x])

            neighboors.reverse()
            scenicScore *= len(ascendingNeigboors(neighboors, tree))
                
            # Loop over all of the trees that are below this tree
            neighboors = []
            for i in range(y + 1, height):
                neighboors.append(forrest[i][x])

            scenicScore *= len(ascendingNeigboors(neighboors, tree))
            
            # Register score record
            if scenicScore > scenicScoreRecord:
                scenicScoreRecord = scenicScore

    return scenicScoreRecord

print(f"p1 = {part1()}")
print(f"p2 = {part2()}")