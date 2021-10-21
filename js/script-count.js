const cartWrapper = document.querySelector('.cart-wrapper')

window.addEventListener('click', function(event) {
// counter
    let counter;

    if (event.target.dataset.action === "plus" || event.target.dataset.action === "minus"){
        const countWrapper = event.target.closest('.counter-wrapper')
        counter = countWrapper.querySelector('[data-counter]')
    }

    if (event.target.dataset.action === "plus") {
       counter.innerText = ++counter.innerText
    }

    if (event.target.dataset.action === "minus") {
        if (counter.innerText > 1){
            counter.innerText = --counter.innerText
        }    
    }

// cart
// Проверяем есть ли кнопка. Получаем кнопку по дата-аттрибуту
if (event.target.hasAttribute('data-cart')){

    // Ищем родителя кнопки посредством св-ва closest()
    const cart = event.target.closest('.card')

    // Формируем объект с необходимыми данными для корзины
    const productInfo = {
        id: cart.dataset.id,
        imgSrc: cart.querySelector('.product-img').getAttribute('src'),
        title: cart.querySelector('.item-title').innerText,
        itemsInBox: cart.querySelector('[data-items-in-box]').innerText,
        weight: cart.querySelector('.price__weight').innerText,
        price: cart.querySelector('.price__currency').innerText,
        counter: cart.querySelector('[data-counter]').innerText
    };

    // Делаем верстку в HTML для отображения данных из объекта
    const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
    <div class="cart-item__top">
        <div class="cart-item__img">
            <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
        </div>
        <div class="cart-item__desc">
            <div class="cart-item__title">${productInfo.title}</div>
            <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

            <!-- cart-item__details -->
            <div class="cart-item__details">

                <div class="items items--small counter-wrapper">
                    <div class="items__control" data-action="minus">-</div>
                    <div class="items__current" data-counter="">${productInfo.counter}</div>
                    <div class="items__control" data-action="plus">+</div>
                </div>

                <div class="price">
                    <div class="price__currency">${productInfo.price}</div>
                </div>

            </div>
            <!-- // cart-item__details -->

        </div>
    </div>
</div>`

// Проверка есть ли элемент уже в корзине по ID
const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`)

if (itemInCart) {
    const counterEl = itemInCart.querySelector('[data-counter]')
    counterEl.innerText = parseInt(counterEl.innerText) + parseInt(productInfo.counter)
}else{
    // Вставляем получившийся шаблон разметки на страницу
    cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML)
};
}



});