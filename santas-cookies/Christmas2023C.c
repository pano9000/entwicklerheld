#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

#define COOKIE_CHAR '*'
#define SPACE_CHAR ' '

struct BoardSize {
    int rows;
    int cols;
};

struct BoardPosition {
    int y;
    int x;
};

char** copy_cookie_board(struct BoardSize board_size, char** cookie_board);
int get_adjacent_cookies_count(struct BoardPosition current_position, struct BoardSize board_size, char** cookie_board);
struct BoardSize get_board_size(char** cookie_board);
void visualize_cookie_board(char** cookie_board);

/**
 *  values are supposed to be sorted in a grid like below
 *      '***'
 *      '* *'  
 *      '***'
 *  the "numbers" = the count of cookies adjacent around a space character in a box like surrounding
*/

char** copy_cookie_board(struct BoardSize board_size, char** cookie_board) {

    char** rows;
    rows = malloc(sizeof(*rows) * (board_size.rows + sizeof(NULL)));

    if (rows == NULL) {
        printf("Allocating memory for the results failed, aborting.");
        exit(EXIT_FAILURE);
    }

    for (int i = 0; i < board_size.rows + 1; i++) {

        rows[i] = malloc(sizeof(**rows) * (board_size.cols + 1));

        if (rows[i] == NULL) {
            printf("Allocating memory for the results failed, aborting.");
            exit(EXIT_FAILURE);
        }

        if (i == board_size.rows) {
            rows[i] = NULL;
            continue;
        }

        strcpy(rows[i], cookie_board[i]);
    }

    return rows;
}

char** cookieFinder(char** cookie_board) {

    //visualize_cookie_board(cookie_board);
    struct BoardSize board_size = get_board_size(cookie_board);

    char** result_board = copy_cookie_board(board_size, cookie_board);

    // iterate through all characters
    for (int current_row = 0; current_row < board_size.rows; current_row++) {        
        for (int current_col = 0; current_col < board_size.cols; current_col++) {

            struct BoardPosition current_position = { .y = current_row, .x = current_col};
            char current_char = cookie_board[current_row][current_col];

            if (current_char == SPACE_CHAR) {
                int adjacent_cookies_count = get_adjacent_cookies_count(current_position, board_size, cookie_board);
                result_board[current_row][current_col] = (adjacent_cookies_count > 0) ? (adjacent_cookies_count + '0') : SPACE_CHAR;
            }
        }
    }

    //visualize_cookie_board(result_board);

    return result_board;
}


int get_adjacent_cookies_count(struct BoardPosition current_position, struct BoardSize board_size, char** cookie_board) {

    // positions to be used for navigating a "box" around the current position
    struct BoardPosition directions[8] = {
        { .y = -1, .x = -1 },   // top left
        { .y = -1, .x =  0 },   // top center
        { .y = -1, .x =  1 },   // top right
        { .y =  0, .x = -1 },   // center left
        { .y =  0, .x =  1 },   // center right
        { .y =  1, .x = -1 },   // bottom left
        { .y =  1, .x =  0 },   // bottom center
        { .y =  1, .x =  1 },   // bottom right
    };

    int cookie_counter = 0;

    // iterate through the 8 directions
    for (int i = 0; i < 8; i++) {

        struct BoardPosition pos_in_check = {
            .x = current_position.x + directions[i].x,
            .y = current_position.y + directions[i].y
        };

        bool is_in_bounds =    (pos_in_check.x < board_size.cols && pos_in_check.x >= 0) 
                            && (pos_in_check.y < board_size.rows && pos_in_check.y >= 0);

        if (is_in_bounds) {             
            if (cookie_board[pos_in_check.y][pos_in_check.x] == COOKIE_CHAR) {
                cookie_counter++;
            } 
        }
    }

    return cookie_counter;
}


void visualize_cookie_board(char** cookie_board) {

    int row = 0;
    printf("---cookie_board_start---\n");
    while (cookie_board[row] != NULL) {
        int col = 0;
        printf("[");
        while (cookie_board[row][col] != '\0') {

            if (cookie_board[row][col] == COOKIE_CHAR) {
                printf(" %s ", "🞕");
            } else if (cookie_board[row][col] == SPACE_CHAR) {
                printf(" %s ", "🞔");
            } else {
                printf(" %c ", cookie_board[row][col]);
            }
            col++;
        }
        printf("]\n");
        row++;
    }

    printf("---cookie_board_end---\n");

}


struct BoardSize get_board_size(char** cookie_board) {

    struct BoardSize board_size = { .rows = 0, .cols = 0};

    while (cookie_board[board_size.rows] != NULL) {
        board_size.rows++;
    }

    while (cookie_board[board_size.rows - 1][board_size.cols] != '\0') {
        board_size.cols++;
    }

    return board_size;
}