const continents = [
    {
        _id: 1,
        name: '  전공도서  ',
    },
    {
        _id: 2,
        name: '  교양도서  ',
    },
    {
        _id: 3,
        name: '  전자기기  ',
    },
    {
        _id: 4,
        name: '  생활용품  ',
    },
    {
        _id: 5,
        name: '  기타  ',
    },
    {
        _id: 6,
        name: '  무료나눔  ',
    },
    {
        _id: 7,
        name: '  주인을 찾아요  ',
    },
]

const price = [
    {
        _id: 0,
        name: 'Any',
        array: [],
    },
    {
        _id: 1,
        name: '0원 ~ 5000원',
        array: [0, 5000],
    },
    {
        _id: 2,
        name: '5000원 ~ 10000원',
        array: [5000, 10000],
    },
    {
        _id: 3,
        name: '10000원 ~ 20000원',
        array: [10000, 20000],
    },
    {
        _id: 4,
        name: '20000원 ~ 30000원',
        array: [20000, 30000],
    },
    {
        _id: 5,
        name: 'More than 30000원',
        array: [30000, 9900000],
    },
]

export {continents, price}
