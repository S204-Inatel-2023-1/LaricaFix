const Favorites = {}
Favorites.add = (userId, id, name, image) => {
    const list = JSON.parse(localStorage.getItem("favorites")) || []
    const index = list.findIndex(f => f.userId === userId)

    const userFavorites = index === -1 ? {
        userId,
        favorites: []
    } : list[index]

    userFavorites.favorites.push({ id, name, image, type: image.includes("https") ? "recipe" : "ingredient" })

    if (index === -1)
        list.push(userFavorites)

    localStorage.setItem("favorites", JSON.stringify(list))
}
Favorites.get = (userId) => {
    const list = JSON.parse(localStorage.getItem("favorites")) || []
    const index = list.findIndex(f => f.userId === userId)

    if (index === -1)
        list.push({ userId, favorites: [] })

    localStorage.setItem("favorites", JSON.stringify(list))
    return list.find(f => f.userId === userId).favorites
}
Favorites.remove = (userId, id) => {
    const list = JSON.parse(localStorage.getItem("favorites")) || []
    const index = list.findIndex(f => f.userId === userId)

    if (index === -1)
        return

    const userFavorites = list[index]
    userFavorites.favorites = userFavorites.favorites.filter(f => f.id !== id)

    localStorage.setItem("favorites", JSON.stringify(list))
}
Favorites.toggle = (userId, id, name, image) => {
    const list = JSON.parse(localStorage.getItem("favorites")) || []
    const index = list.findIndex(f => f.userId === userId)

    const userFavorites = index === -1 ? {
        userId,
        favorites: []
    } : list[index]

    const favoriteIndex = userFavorites.favorites.findIndex(f => f.id === id)

    if (favoriteIndex === -1)
        return Favorites.add(userId, id, name, image)
    return Favorites.remove(userId, id)
}
Favorites.isFavorite = (userId, id) => {
    const list = JSON.parse(localStorage.getItem("favorites")) || []
    const index = list.findIndex(f => f.userId === userId)

    if (index === -1)
        return false

    const userFavorites = list[index]
    return userFavorites.favorites.findIndex(f => f.id === id) !== -1
}
export default Favorites