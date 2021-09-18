
// МАССИВ ИЗ 6 ФОТОГРАФИЙ
const initialCards = [

  {
  caption: 'Болото',
  image: './images/hippos.jpg'
},
{
  caption: 'Нида',
  image: './images/nida.png'
},
{
  caption: 'Яффо',
  image: './images/jaffa.jpg'
},
{
  caption: 'Эфиопия',
  image: './images/ethiopia.jpg'
},
{
  caption: 'Серенгети',
  image: './images/serengeti.jpg'
},
{
  caption: 'Тарангире',
  image: './images/tarangire.jpg'
}
];


// ДЛЯ МАССИВА КАРТОЧЕК ВЫЗЫВАЕМ ФУНКЦИЮ, ЧТОБЫ ПРОЙТИСЬ ПО ВСЕМУ МАССИМУ И
//ВЫЛОЖИТЬ ВСЕ ЕГО ФОТКИ НА САЙТ. АРГУМЕНТ ФУНКЦИИ ОБОЗНАЧАЕМ КАК ЭЛЕМЕНТ ЭТОГО МАССИВА
initialCards.forEach((element) => {
  cardsElement.prepend(createCard(element));
});
