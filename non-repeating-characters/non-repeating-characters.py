def find_first_non_repeated_char(sequence: str):
    if len(sequence) == 0:
        return None;
    loweredSeq: str = sequence.lower();

    for i in range(0, len(loweredSeq)):
        if (loweredSeq.rfind(loweredSeq[i]) == i) and (loweredSeq.find(loweredSeq[i]) == i):
            return sequence[i]
    
    return None