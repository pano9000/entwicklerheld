export const testData_1_2 = [
    {
        'inserts': [
            "hello", "hello world", "hello kitty", "hello plumplori"
        ],
        'search': [
            {
                'word': "hello",
                'expected': true
            },
            {
                'word': "hallo",
                'expected': false
            },
            {
                'word': "hello plumplori",
                'expected': true
            },
            {
                'word': "hello world",
                'expected': true
            },
            {
                'word': "hello kitty",
                'expected': true
            },
            {
                'word': "hello arnold",
                'expected': false
            }
        ]
    },
    {
        'inserts': [
            "open", "open source", "open data", "open mind"
        ],
        'search': [
            {
                'word': "open",
                'expected': true
            },
            {
                'word': "open source",
                'expected': true
            },
            {
                'word': "open data",
                'expected': true
            },
            {
                'word': "open mind",
                'expected': true
            },
            {
                'word': "open door",
                'expected': false
            },
            {
                'word': "open sesame",
                'expected': false
            }
        ]
    },
    {
        'inserts': [
            "car", "car parking", "car wash", "car rental"
        ],
        'search': [
            {
                'word': "car",
                'expected': true
            },
            {
                'word': "car parking",
                'expected': true
            },
            {
                'word': "car wash",
                'expected': true
            },
            {
                'word': "car rental",
                'expected': true
            },
            {
                'word': "car repair",
                'expected': false
            },
            {
                'word': "car insurance",
                'expected': false
            }
        ]
    }
];
export const testData_3 = [
    {
        'inserts': ["apple", "app", "application", "applause"],
        'deletes': ["app", "application", "applied"],
        'search': [
            {'word': 'app', 'expected': false},
            {'word': 'application', 'expected': false},
            {'word': 'applied', 'expected': false},
            {'word': 'apple', 'expected': true},
            {'word': 'applause', 'expected': true}
        ]
    },
    {
        'inserts': ["book", "bookmark", "bookstore", "bookshelf"],
        'deletes': ["bookmark", "bookstore", "bookworm"],
        'search': [
            {'word': 'bookmark', 'expected': false},
            {'word': 'bookstore', 'expected': false},
            {'word': 'bookworm', 'expected': false},
            {'word': 'book', 'expected': true},
            {'word': 'bookshelf', 'expected': true}
        ]
    },
    {
        'inserts': ["cat", "caterpillar", "catalyst", "category"],
        'deletes': ["caterpillar", "catalyst", "catastrophe"],
        'search': [
            {'word': 'caterpillar', 'expected': false},
            {'word': 'catalyst', 'expected': false},
            {'word': 'catastrophe', 'expected': false},
            {'word': 'cat', 'expected': true},
            {'word': 'category', 'expected': true}
        ]
    },
    {
        'inserts': ["precaution", "predict", "prefix", "premier"],
        'deletes': ["predict", "prefix", "premier"],
        'search': [
            {'word': 'predict', 'expected': false},
            {'word': 'prefix', 'expected': false},
            {'word': 'premier', 'expected': false},
            {'word': 'precaution', 'expected': true},
            {'word': 'premature', 'expected': false}
        ]
    }
];
