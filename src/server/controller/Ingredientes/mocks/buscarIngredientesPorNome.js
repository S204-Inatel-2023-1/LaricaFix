export default async function (req, res) {
  const query = req.query.nome
  const number = req.query.quantidade

  console.log('O ingrediente desejado foi ', query, ' com quantidade ' + number)

  const data = {
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

  }

  res.status(200).json(data);
}

