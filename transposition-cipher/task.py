class TranspositionCipher:

    current_rail_step = [0, 0, 1]
    def encrypt(self, plain_text: str, rails: int) -> str:
        self.current_rail_step = [0, 0, 1]
        #print("yooo start", plain_text, self.current_rail_step)

        # Init rail accumulator
        li = []
        for i in range(0, rails):
            li.append([""] * len(plain_text))

        # populate with chars
        for i in range(0, len(plain_text)):
            a, b, _ = self.current_rail_step
            li[a][b] = plain_text[i]
            self.__next_step(rails)

        # turn into str
        final_str = ""
        for rail in li:
            final_str += "".join(rail)

        #print("final: ", final_str)
        #print(self.__visualize_res(li))
        return final_str

    def __visualize_res(self, accum_list):
        accum_str = ""
        
        for item in accum_list:
            #accum_str += "|" + "".join(list(map(lambda x: f"{x}, " if x != '' else '￭, ', item))) + "|\n"
            try:
                accum_str += "|" + "".join(list(map(lambda x: f"{chr(ord(x) + 0xFEE0)} " if x != '' else '＃ ', item))) + "|\n"
            except Exception as err:
                print("aaa", err)

        return accum_str
        

    def __next_step(self, rails):
        """
            go from 0 + 1 to rails with each call, then set second tuple value to -1
            then from rails to 0
        """
        at_upper_boundary = (self.current_rail_step[0] == rails - 1)
        at_lower_boundary = (self.current_rail_step[0] == 0)

        if at_upper_boundary:
            self.current_rail_step[2] = -1

        if at_lower_boundary:
            self.current_rail_step[2] = 1

        #todo: refactor this -> if rails = 0 
        if (not(at_upper_boundary and at_lower_boundary)):
            self.current_rail_step[0] += self.current_rail_step[2]

        self.current_rail_step[1] += 1

        #print("after", self.current_rail_step)

    def decrypt(self, cipher: str, rails: int) -> str:
        self.current_rail_step = [0, 0, 1]

        # Implement this in test scenario 3 and 4
        print("yooo start decr", cipher, rails)
        # Init rail accumulator
        li = []
        for i in range(0, rails):
            li.append([""] * len(cipher))

        for i in range(0, len(cipher)):
            a, b, _ = self.current_rail_step
            li[a][b] = cipher[i]
            
            #print(li)
            self.__next_step(rails)

        # turn into str
        final_str = ""
        for rail in li:
            final_str += "".join(rail)

        #print("final: ", final_str)
        print(li)
        print(self.__visualize_res(li))

        return final_str
        pass

