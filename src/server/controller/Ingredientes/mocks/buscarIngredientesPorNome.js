export default function () {
  return {
    data: {
      results: [
        {
          id: 9040,
          name: "banana",
          image: "bananas.jpg"
        },
        {
          id: 10011111,
          name: "banana leaves",
          image: "banana-leaf.jpg"
        }
      ],
      offset: 0,
      number: 2,
      totalResults: 14
    },
    headers: {
      'x-api-quota-request': 10,
      "x-api-quota-used": 10,
      "x-api-quota-left": 140,
    }
  }
}