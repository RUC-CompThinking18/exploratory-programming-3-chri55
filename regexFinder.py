import re

def main():
    f = open("book.txt", "r")
    split = f.readlines()
    matches = []
    for s in split:
        # need to precede the Regex String with r
        # this tells re that the string is a regex
        finder = lambda x: len(x) > 3 #small, anonymous function to find items with len > 3
        match = filter(finder, re.findall(r"[\w]*at\b", s)) # filter results using our func
        matches += match
    print matches

if __name__ == "__main__":
    main()
