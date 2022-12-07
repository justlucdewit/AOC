# Get the input
inp = open("input.txt", "r").readlines()

# Parsing
class Directory:
    def __init__(self, name):
        self.name = name
        self.summedFileSizes = 0
        self.children = []

    def getTotalSize(self):
        total = self.summedFileSizes
        for child in self.children:
            total += child.getTotalSize()
        return total

    def __repr__(self):
        totalSize = self.getTotalSize()
        return f"{self.name} {totalSize}"


currentPath = "/"

# Loop over inp
idx = 0
all_dirs = {}
while idx < len(inp):
    line = inp[idx].strip()
    
    # If line begins with cd command
    if line.startswith("$ cd"):
        path = line[5:].strip()

        if path == "/":
            currentPath = "/"
        elif path == "..":
            currentPath = currentPath[:currentPath.rfind("/", 0, len(currentPath) - 1) + 1]
        else:
            currentPath += path + "/"

        # IF the directory doesnt exist, create it
        if currentPath not in all_dirs:
            all_dirs[currentPath] = Directory(currentPath)
    elif line.startswith("$ ls"):
        # Gather all the ls output
        # Which doesnt start with $
        content = []
        for i in range(idx + 1, len(inp)):
            if inp[i].startswith("$"):
                break
            content.append(inp[i].strip())

        # Filter for the contents that starts with a number
        content = [x for x in content if x[0].isdigit()]
        
        # Sum those numbers together
        total = 0
        for x in content:
            total += int(x.split(" ")[0])
        
        # Add the total to the current directory
        all_dirs[currentPath].summedFileSizes = total

    idx += 1

# For each directory, find and set its direct children
for dir in all_dirs.values():
    for otherDir in all_dirs.values():
        if otherDir.name != dir.name and otherDir.name.startswith(dir.name):

            # If the number of slashes is only one higher
            if otherDir.name.count("/") == dir.name.count("/") + 1:
                dir.children.append(otherDir)

# 20:46
def part1():
    sum = 0
    for dir in all_dirs.values():
        # If the total size is at most 100000
        if dir.getTotalSize() <= 100000:
            sum += dir.getTotalSize()

    return sum

# 13:20
def part2():
    # printAllDirs()

    # Space that the device could have
    totalSpace = 70000000

    # 
    targetFreeSpace = 30000000
    usedSpace = all_dirs["/"].getTotalSize()
    currentFreeSpace = totalSpace - usedSpace
    spaceToFree = targetFreeSpace - currentFreeSpace

    # Find the total size of the smallest directory
    # That is larger than the spaceToFree
    smallestDir = None
    for dir in all_dirs.values():
        if dir.getTotalSize() >= spaceToFree:
            if smallestDir == None:
                smallestDir = dir
            elif dir.getTotalSize() < smallestDir.getTotalSize():
                smallestDir = dir

    # Find the / directory and return its size
    return smallestDir.getTotalSize()


print(f"p1 = {part1()}")
print(f"p2 = {part2()}")