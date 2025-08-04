import re
from textwrap import wrap

def normalize_text(plain_text):
    return re.sub(r"(?i)[^a-z0-9]", "", plain_text).lower()

def calculate_rectangle_size(normalized_text):
    text_len = len(normalized_text)
    rows = 1
    cols = 1

    match_found = False
    i = 0
    stop = False
    alternate_state = 0
    while match_found == False or stop == True:
        print(f"rows: {rows} | cols: {cols} | i: {i}")
        i += 1
        req_1 = rows * cols >= text_len
        req_2 = cols >= rows
        req_3 = cols - rows <= 1

        match_found = True if all([req_1, req_2, req_3]) else False

        if match_found:
            return { "rows": rows, "cols": cols }

        if i > 300:
            stop = True

        if alternate_state == 0:
            cols += 1
            alternate_state = 1
        else:
            rows += 1
            alternate_state = 0

    return None

def chunk_text(normalized_text, cols):
    chunked_text = wrap(normalized_text, cols)
    if (len(chunked_text) >= 1) and (len(chunked_text[-1]) < cols):
        chunked_text[-1] = chunked_text[-1].ljust(cols, " ")

    print(chunked_text)
    return chunked_text

# TODO rename
def scramble_chunks(chunked_text, cols, rows):
    if len(chunked_text) < 1:
        return []
    scrambled_chunks = []
    for col in range(0, cols):
        scrambled_chunks.append("")
        for row in range(0, rows):
            print("######", chunked_text)
            print("######", row, rows)

            scrambled_chunks[col] += chunked_text[row][col]

    return scrambled_chunks


def encrypt(plain_text):

    normalized_text = normalize_text(plain_text)

    rectangle_size = calculate_rectangle_size(normalized_text)
    print(rectangle_size)

    chunked_text = chunk_text(normalized_text, rectangle_size["cols"])
    scrambled = scramble_chunks(chunked_text, rectangle_size["cols"], rectangle_size["rows"])
    final_out = " ".join(scrambled)
    print(f"final: {final_out}")
    return final_out


def cipher_text(plain_text):
    # TODO: implement this function
    return encrypt(plain_text)