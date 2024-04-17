#include <stdio.h>
#include "Christmas2023C.c"

int main()
{
    printf("You can add something to the std out by using printf(). Don't forget to add #include <stdio.h>\n");
    printf("Here is the std out for following example [' * ', ' * ', ' * ', NULL]:\n");
    char *input[] = {
            " * ",
            " * ",
            " * ",
            NULL
    };
    char **output = cookieFinder(input);
    return 0;
}