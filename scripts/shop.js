
//Removing Items

var removeCartItemBttns = document.getElementsByClassName('btn-danger');

function removeCartItem(event){
    var bttnClicked = event.target
    bttnClicked.parentElement.parentElement.parentElement.remove()
    updateTotal()
}
    for (var i = 0; i < removeCartItemBttns.length; i++){
        var bttn= removeCartItemBttns[i]
        bttn.addEventListener('click', removeCartItem)
    }


//Changing the quantity

var quantityInputs = document.getElementsByClassName('cart-quantity-input')

for( var i = 0 ; i < quantityInputs.length ; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChange)
}

function quantityChange(event){
    
    var input = event.target
    
    if( isNaN(input.value) || input.value <= 0){
        input.value = 1    
    }

    updateTotal()
}

//Adding items

var cartItems = document.getElementsByClassName('cart-items')[0]

var addToCartButtons = document.getElementsByClassName('shop-item-add')
for(var i = 0 ; i < addToCartButtons.length ; i++){
    var  button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}


function addToCartClicked(event)
{
    var button = event.target
    var shopItem = button.parentElement

    var title = shopItem.getElementsByClassName('product-title')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText     
    var imageSrc = shopItem.getElementsByClassName('product-image')[0].src

    addItemToCart(title,price,imageSrc)
    updateTotal()
}

function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0 ; i < cartItemsNames.length ; i++){
       
        if(cartItemsNames[i].innerText == title){
            alert('This item is already in the cart!')
            return
        }
    }

    var cartRowContent = 
`
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button"><i class="fa-solid fa-trash"></i></button>
    </div>`

    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange)
}

// Purchase

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

function purchaseClicked(){

if( !(cartItems.hasChildNodes()) ){
    alert("There's no items to buy!")
    return
}

    alert("Thank you for your purchase! (You didn't actually purchase anything, chill) ")

    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }

    updateTotal()
}

function updateTotal()
{
    var cartItem_cont= document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItem_cont.getElementsByClassName('cart-row')
    var total = 0

    for(var i = 0 ; i < cartRows.length; i++)
        {
            var cartRow = cartRows[i]
            var priceEl = cartRow.getElementsByClassName('cart-price')[0]
            var quantityEl = cartRow.getElementsByClassName('cart-quantity-input')[0]

            var price = parseFloat(priceEl.innerText.replace('$',''))
            var quantity= quantityEl.value

            total = total + (price * quantity)
        }

        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}