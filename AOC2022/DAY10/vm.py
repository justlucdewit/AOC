class VM:
    def __init__(self):
        self.cycle_count = 1
        self.program = []
        self.cycles_since_last_opcode = 0
        self.current_instruction_idx = 0
        self.current_instruction = None
        self.regX = 1

    def load_program(self, code):
        self.cycle_count = 1

        # Parse the code into a list of instructions
        self.program = code.splitlines()

        # Parse the instructions into a list of tuples
        self.program = [tuple(line.split(" ")) for line in self.program]
        self.current_instruction_idx = 0
        self.current_instruction = self.program[self.current_instruction_idx]
        self.regX

    def debug(self):
        # Print the current cycle and the x register
        print(f"Cycle = {self.cycle_count}; x = {self.regX}; istr_idx = {self.current_instruction_idx};")

    def isDone(self):
        # Check if the current instruction is the last instruction
        return self.current_instruction_idx >= len(self.program)

    def cycle(self):
        # Increment the cycle count
        self.cycle_count += 1

        # Get the current instruction
        self.current_instruction = self.program[self.current_instruction_idx]

        # Get the opcode and the argument
        opcode = self.current_instruction[0]

        # noop opcode which takes one cycle to complete
        if opcode == "noop" and self.cycles_since_last_opcode == 0:
            self.cycles_since_last_opcode = 0
            self.current_instruction_idx += 1
            return

        # addx V opcode which takes one cycle to complete
        elif opcode == "addx" and self.cycles_since_last_opcode == 1:
            arg = int(self.current_instruction[1])
            self.regX += int(arg)
            self.cycles_since_last_opcode = 0
            self.current_instruction_idx += 1
            return
        
        else:
            self.cycles_since_last_opcode += 1