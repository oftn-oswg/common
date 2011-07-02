#include <stdio.h>

#include "spelling_wordlist.h"

#define SPELLING_WORDLIST_BUFFERSIZE 1024


SpellingWordlist * spelling_wordlist_create ()
{
	return malloc (sizeof(SpellingWordlist));
}

/**
 * spelling_wordlist_load:
 * @this: word list structure used to add the words to
 * @filename: filename of the list of words to load
 *
 * Loads the file specified by @filename into the wordlist.
 * The word list file is expected to be a newline-seperated list of words.
 **/
void spelling_wordlist_load (SpellingWordlist *this, const char* filename)
{
	FILE* fd;
	char buffer[SPELLING_WORDLIST_BUFFERSIZE];
	char *begptr, *endptr;
	int wordlength, bytesread;
	
	fd = fopen (filename, "r");
	if (fd == NULL) {
		return; // TODO: Throw error
	}
	
	wordlength = 0;

	while (fgets (buffer, SPELLING_WORDLIST_BUFFERSIZE, fd) != NULL) {
	
		bytesread = 0;
		
		/* We have loaded a chunk out of the file, parse and add words */
		begptr = buffer;
		
		/* Skip whitespace */
		while (bytesread++ <= SPELLING_WORDLIST_BUFFERSIZE) {
			if (*begptr != '\n' || *begptr != ' ' || *begptr != '\t') {
				break;
			}
			*begptr++;
		}
		
		while (bytesread++ 
		
		spelling_wordlist_add (this, begptr, wordlength);
		
	}

	if (ferror (fd)) { goto error; }

	error:
		return;
}


void spelling_wordlist_add (SpellingWordlist *this, char *word)
{
}


bool spelling_wordlist_find (SpellingWordlist *this, char *word)
{
}


void spelling_wordlist_destroy (SpellingWordlist *this)
{
}
