#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

struct BoardSize {
    int rows;
    int cols;
};

struct BoardPosition {
    int y;
    int x;
};

void visualizeCookieBoard(char** input);
struct BoardSize getBoardSize(char** input);
int get_adjacent_touching_cookies(struct BoardPosition, struct BoardSize boardSize, char** cookieBoard);

/**
 * 
 * 
 *  values are supposed to be sorted in a grid like below
 *      '***'
 *      '* *'  
 *      '***'
 *  -> numbers = how many "cookies" are adjacent to the space
 * 
*/



char** initResultArray(struct BoardSize boardSize, char** input) {
    //boardSize.rows
    char** rows;
    rows = malloc(sizeof(*rows) * (boardSize.rows + sizeof(NULL)));

    //char** rows = malloc((boardSize.rows + 1) * sizeof(char*));

    if (rows == NULL) {
        printf("Allocating memory for the results failed, aborting.");
        return 1;
    }

    for (int i = 0; i < boardSize.rows + 1; i++) {

        rows[i] = malloc(sizeof(**rows) * (boardSize.cols + 1));

        if (rows[i] == NULL) {
            printf("Allocating memory for the results failed, aborting.");
            return 1;
        }

        if (i == boardSize.rows) {
            rows[i] = NULL;
            continue;
        }

        strcpy(rows[i], input[i]);
    }

    return rows;
}

char** cookieFinder(char** input) {

    //visualizeCookieBoard(input);
    struct BoardSize boardSize = getBoardSize(input);

    char** result_set = initResultArray(boardSize, input);

    for (int current_row = 0; current_row < boardSize.rows; current_row++) {        
        for (int current_col = 0; current_col < boardSize.cols; current_col++) {
            struct BoardPosition currentPosition = { .y = current_row, .x = current_col};
            char current_char = input[current_row][current_col];

            if (current_char == ' ') {
                int touching_cookies = get_adjacent_touching_cookies(currentPosition, boardSize, input);
                result_set[current_row][current_col] = (touching_cookies > 0) ? touching_cookies + '0' : ' ';
            }
        }

    }

    //visualizeCookieBoard(result_set);

    return result_set;
}


// TODO rename this terrible name
int get_adjacent_touching_cookies(struct BoardPosition currentPosition, struct BoardSize boardSize, char** cookieBoard) {
    

   struct BoardPosition topL = { .y = -1, .x = -1 };
   struct BoardPosition topM = { .y = -1, .x = 0 };
   struct BoardPosition topR = { .y = -1, .x = 1 };

   struct BoardPosition midL = { .y = 0, .x = -1 };
   // midM -> not needed 
   struct BoardPosition midR = { .y = 0, .x = 1 };

   struct BoardPosition botL = { .y = 1, .x = -1 };
   struct BoardPosition botM = { .y = 1, .x = 0 };
   struct BoardPosition botR = { .y = 1, .x = 1 };

    struct BoardPosition directions[8] = {
        { .y = -1, .x = -1 },
        { .y = -1, .x =  0 },
        { .y = -1, .x =  1 },
        { .y =  0, .x = -1 },
        { .y =  0, .x =  1 },
        { .y =  1, .x = -1 },
        { .y =  1, .x =  0 },
        { .y =  1, .x =  1 },
    };

    int cookieCounter = 0;
    for (int i = 0; i < 8; i++) {

        struct BoardPosition toCheck = {
            .x = currentPosition.x + directions[i].x,
            .y = currentPosition.y + directions[i].y
        };

        bool is_in_bounds = (toCheck.x < boardSize.cols && toCheck.x >= 0) 
                            && (toCheck.y <boardSize.rows && toCheck.y >= 0);
        //check if newPositions is "inBounds" -> if yes, get and check if cookie and count

        if (is_in_bounds) {
             
             //TODO replace '*' with CONSTANT
            if (cookieBoard[toCheck.y][toCheck.x] == '*') {
                cookieCounter++;
                //printf("found cookie, updating counter: %d\n", cookieCounter);
            } 
        }
        /*
        printf("x: %i, y: %i |->| x: %i, y: %i |->| xD: %i, yD: %i || inBounds: %d \n",
            currentPosition.x,
            currentPosition.y, 
            directions[i].x, 
            directions[i].y,
            toCheck.x,
            toCheck.y,
            is_in_bounds
        );
        */      
    }

    //printf("------found total of %d cookies\n", cookieCounter);

   return cookieCounter;
}


void visualizeCookieBoard(char** input) {

    int row = 0;
    printf("---CookieBoard---\n");
    while (input[row] != NULL) {
        int col = 0;
        printf("[");
        while (input[row][col] != '\0') {
            if (input[row][col] == '*') {
                printf(" %s ", "🞕");
            } else if (input[row][col] == ' ') {
                printf(" %s ", "🞔");
            } else {
                printf(" %c ", input[row][col]);

            }
            col++;
        }
        printf("]\n");
        row++;
    }

    printf("---end---\n");

}


struct BoardSize getBoardSize(char** input) {
    
    struct BoardSize boardSize = { .rows = 0, .cols = 0};
    
    while (input[boardSize.rows] != NULL) {
        boardSize.rows++;
    }

    while (input[boardSize.rows - 1][boardSize.cols] != '\0') {
        boardSize.cols++;
    }

    return boardSize;
}