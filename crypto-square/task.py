import re
from textwrap import wrap

def normalize_text(plain_text):
    return re.sub(r"(?i)[^a-z0-9]", "", plain_text).lower()


def is_passing_rectangle_rules(rows, cols, text_len):
    # in JS I would use '&&' for short-circuiting
    return all([
        (rows * cols >= text_len), 
        (cols >= rows), 
        (cols - rows <= 1)
    ])


def calculate_rectangle_size(text_normalized):
    rows = 1
    cols = 1
    increment_cols = True
    match_found = False

    while match_found == False:
        match_found = is_passing_rectangle_rules(rows, cols, len(text_normalized))

        if match_found:
            return { "rows": rows, "cols": cols }

        if increment_cols:
            cols += 1
        else:
            rows += 1

        # alternate between incrementing cols and rows
        increment_cols = not increment_cols

    return None


# chunk up the text to desired column size
def chunk_text(text_normalized, cols):
    text_chunked = wrap(text_normalized, cols)

    # pad last chunk with space, if it is less than the desired col size
    if (len(text_chunked) >= 1) and (len(text_chunked[-1]) < cols):
        text_chunked[-1] = text_chunked[-1].ljust(cols, " ")

    return text_chunked


def scramble_chunks(chunked_text, cols, rows):
    if len(chunked_text) < 1:
        return []
    scrambled_chunks = []
    for col in range(0, cols):
        scrambled_chunks.append("")
        for row in range(0, rows):
            scrambled_chunks[col] += chunked_text[row][col]

    return scrambled_chunks


def encrypt(plain_text):
    text_normalized = normalize_text(plain_text)
    rectangle_size = calculate_rectangle_size(text_normalized)
    text_chunked = chunk_text(text_normalized, rectangle_size["cols"])
    text_scrambled_chunked = scramble_chunks(text_chunked, rectangle_size["cols"], rectangle_size["rows"])
    text_output = " ".join(text_scrambled_chunked)

    return text_output


def cipher_text(plain_text):
    return encrypt(plain_text)