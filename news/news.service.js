// users hardcoded for simplicity, store in a db for production applications
const news = [{
    id: 1,
    title: 'Новина 1',
    text: 'Текст новини 1'
}];

module.exports = {
    getAll
};

async function getAll() {
    return news;
}
