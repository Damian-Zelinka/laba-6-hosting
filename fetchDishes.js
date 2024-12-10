import { menuItems } from './assets.js';
                                                                            //tu si zadavame premenne
const soupContainer = document.getElementById("soup-container");
const mainDishContainer = document.getElementById("main-dish-container");
const drinkContainer = document.getElementById("drink-container");
const saladStarterContainer = document.getElementById('salad-starter-container');
const dessertContainer = document.getElementById('dessert-container');

const selectedSaladStarterText = document.getElementById('selected-salad-starter-text');
const selectedSaladStarterKeyword = document.getElementById('selected-salad-starter-keyword');

const selectedDessertText = document.getElementById('selected-dessert-text');
const selectedDessertKeyword = document.getElementById('selected-dessert-keyword');

const selectedDishText = document.getElementById("selected-dish-text");
const selectedDishKeyword = document.getElementById("selected-dish-keyword");

const selectedSoupText = document.getElementById("selected-soup-text");
const selectedSoupKeyword = document.getElementById("selected-soup-keyword");

const selectedDrinkText = document.getElementById("selected-drink-text");
const selectedDrinkKeyword = document.getElementById("selected-drink-keyword");



let priceValue = document.getElementById('final-price-value');



let finalPrice;
let count = 0;

function displayMenuItems() {                                           //toto nam loaduje itemy
    for (const category in menuItems) {

        const sortedItems = menuItems[category].sort((a, b) => {

            return a.name.localeCompare(b.name);
        });


        sortedItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-item';
            card.setAttribute('data-dish', item.keyword);
            card.setAttribute('data-kind', item.kind);

            const imgDiv = document.createElement('div');
            imgDiv.className = 'food-image';

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.keyword;

            const price = document.createElement('p');
            price.textContent = `${item.price}ք`;
            price.className = 'food-price';

            const name = document.createElement('p');
            name.textContent = item.name;
            name.className = 'food-name';

            const mass = document.createElement('p');
            mass.textContent = item.mass;
            mass.className = 'food-mass';

            const button = document.createElement('button');
            button.textContent = 'Добавить';
            button.className = 'add-to-cart-btn';
            button.id = `add-${item.keyword}`;


            imgDiv.appendChild(img);
            card.appendChild(imgDiv);
            card.appendChild(price);
            card.appendChild(name);
            card.appendChild(mass);
            card.appendChild(button);


            if (item.category == 'soup')
            {
                soupContainer.appendChild(card);
            }
            else if (item.category == 'mainDish')
            {
                mainDishContainer.appendChild(card);
            }
            else if (item.category == 'drink')
            {
                drinkContainer.appendChild(card);
            }
            else if (item.category == 'saladStarter')
            {
                saladStarterContainer.appendChild(card);
            }
            else if (item.category == 'dessert')
            {
                dessertContainer.appendChild(card);
            }


            button.addEventListener('click', () => addToOrder(item, card));
            button.addEventListener('click', () => selectItem(category, item, card));
        });
    }
};

displayMenuItems();


////////////////////////////////

function addToOrder(item, card) {

    document.getElementById('none-selected').style.display = 'none';

    document.getElementById('final-price').style.visibility = 'visible';
    priceValue.style.visibility ='visible';

    document.getElementById('selected-soup').style.visibility = 'visible';
    selectedSoupText.style.visibility = 'visible';

    document.getElementById('selected-dish').style.visibility = 'visible';
    selectedDishText.style.visibility = 'visible';

    document.getElementById('selected-drink').style.visibility = 'visible';
    selectedDrinkText.style.visibility = 'visible';

    document.getElementById('selected-salad-starter').style.visibility = 'visible';
    selectedSaladStarterText.style.visibility = 'visible';

    document.getElementById('selected-dessert').style.visibility = 'visible';
    selectedDessertText.style.visibility = 'visible';

    if (item.category == 'soup')
    {
        selectedSoupText.textContent = `${item.name} ${item.price}ք`; 
        selectedSoupKeyword.value = item.keyword;
    }
    else if (item.category == 'mainDish')
    {
        selectedDishText.textContent = `${item.name} ${item.price}ք`; 
        selectedDishKeyword.value = item.keyword;
    }
    else if (item.category == 'drink')
    {
        selectedDrinkText.textContent = `${item.name} ${item.price}ք`; 
        selectedDrinkKeyword.value = item.keyword;
    }
    else if (item.category == 'saladStarter')
    {
        selectedSaladStarterText.textContent = `${item.name} ${item.price}ք`; 
        selectedSaladStarterKeyword.value = item.keyword;
    }
    else if (item.category == 'dessert')
    {
        selectedDessertText.textContent = `${item.name} ${item.price}ք`; 
        selectedDessertKeyword.value = item.keyword;
    }


};


///////////////////////////////////////

const selectedItems = {
    soups: null,
    mainDishes: null,
    drinks: null,
    saladsStarters: null,
    desserts: null
  };
  
  function selectItem(category, item, card) {
    if (selectedItems[category]) {
      const prevCard = document.querySelector(`[data-dish="${selectedItems[category].keyword}"]`);
      if (prevCard) {
        prevCard.classList.remove('selected'); 
      }
    }
  
    selectedItems[category] = item;
    card.classList.add('selected'); 
    updateOrderSummary(); 
  }

  function deselectItem()
  {
    for (const category in selectedItems)
    {
        if (selectedItems[category]) 
        {
            const prevCard = document.querySelector(`[data-dish="${selectedItems[category].keyword}"]`);
            if (prevCard) 
            {
              prevCard.classList.remove('selected');
              selectedItems[category] = null;
            }
        }
    }
    updateOrderSummary();
  }




/////////////////////////////////////////

  function updateOrderSummary() {
    count = 0;
    finalPrice = '0ք';
    for (const category in selectedItems)
    {
        const item = selectedItems[category];
        if (item){
        count += item.price;
        }
    }
    finalPrice = `${count}ք`;
    priceValue.textContent = finalPrice;
  }


///////////////////////

document.getElementById("reset-btn").onclick = function() {

    document.getElementById('none-selected').style.display = 'block';

    document.getElementById('final-price').style.visibility = 'hidden';
    priceValue.style.visibility = 'hidden';
    deselectItem();



    document.getElementById('selected-drink').style.visibility = 'hidden';
    selectedDrinkText.style.visibility = 'hidden';
    selectedDrinkText.textContent = 'Сок не выбран'; 
    selectedDrinkKeyword.value = '';

    document.getElementById('selected-dish').style.visibility = 'hidden';
    selectedDishText.style.visibility = 'hidden';
    selectedDishText.textContent = 'Блюдо не выбрано'; 
    selectedDishKeyword.value = '';

    document.getElementById('selected-soup').style.visibility = 'hidden';
    selectedSoupText.style.visibility = 'hidden';
    selectedSoupText.textContent = 'Суп не выбран'; 
    selectedSoupKeyword.value = '';

    document.getElementById('selected-salad-starter').style.visibility = 'hidden';
    selectedSaladStarterText.style.visibility = 'hidden';
    selectedSaladStarterText.textContent = 'Ничего не выбранщ'; 
    selectedSaladStarterKeyword.value = '';

    document.getElementById('selected-dessert').style.visibility = 'hidden';
    selectedDessertText.style.visibility = 'hidden';
    selectedDessertText.textContent = 'Десерт не выбран'; 
    selectedDessertKeyword.value = '';
};

////////////////////////////////////

function createAlert(){
    const alert = document.createElement('div');
    alert.id = 'alert';

    const alertText = document.createElement('p');
    alertText.id = 'alert-p';

    const alertBtn = document.createElement('button');
    alertBtn.id = 'alert-btn';
    alertBtn.textContent = 'Окей👌';

    alert.appendChild(alertText);
    alert.appendChild(alertBtn);
    document.body.appendChild(alert);
}

//////////////////////////////////////////

const form = document.getElementById('food-form');

form.addEventListener('submit', function(event) 
{
  if (selectedItems.soups == null && selectedItems.mainDishes == null && selectedItems.drinks == null && selectedItems.saladsStarters == null && selectedItems.desserts == null) 
    {
        event.preventDefault();
        createAlert();
        document.getElementById('alert-p').textContent = 'Ничего не выбрано! Выберите блюда для заказа!';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('alert-btn').onclick = function() {
            document.getElementById('alert').remove();
            document.getElementById('overlay').style.display = 'none';
        }
    } 

    else if (selectedItems.drinks == null)
    {
        event.preventDefault();
        createAlert();
        document.getElementById('alert-p').textContent = 'Выберите напиток!';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('alert-btn').onclick = function() {
            document.getElementById('alert').remove();
            document.getElementById('overlay').style.display = 'none';
        }
    }

    else if (selectedItems.soups != null && (selectedItems.mainDishes == null && selectedItems.saladsStarters == null))
        {
            event.preventDefault();
            createAlert();
            document.getElementById('alert-p').textContent = 'Выберите главное блюдо/салат/стартер!';
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('alert-btn').onclick = function() {
                document.getElementById('alert').remove();
                document.getElementById('overlay').style.display = 'none';
            }
        }

    else if (selectedItems.saladsStarters != null && (selectedItems.soups == null && selectedItems.mainDishes == null))
        {
            event.preventDefault();
            createAlert();
            document.getElementById('alert-p').textContent = 'Выберите суп или главное блюдо!';
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('alert-btn').onclick = function() {
                document.getElementById('alert').remove();
                document.getElementById('overlay').style.display = 'none';
            }
        }

    else if ((selectedItems.drinks != null || selectedItems.desserts != null) && selectedItems.soups == null && selectedItems.mainDishes == null && selectedItems.saladsStarters == null )
        {
            event.preventDefault();
            createAlert();
            document.getElementById('alert-p').textContent = 'Выберите главное блюдо!';
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('alert-btn').onclick = function() {
                document.getElementById('alert').remove();
                document.getElementById('overlay').style.display = 'none';
            }
        }
  
  else 
    {
        form.submit();
    }
});

////////////////////////////////////

function filters()
{
const filterButtons = document.querySelectorAll('.filter-p');
filterButtons.forEach(button => 
{
    button.addEventListener('click', () => 
    {
        const buttonsContainer = button.parentElement;
        const targetContainer = buttonsContainer.nextElementSibling;
        const children = targetContainer.children;
    
    
        if (button.classList.contains('selected-filter'))
            {
                button.classList.remove('selected-filter');
    
                Array.from(children).forEach(child => 
                    {
                        child.style.display = 'flex';
                    });
            }
    
        else
            {
            const filterButtons = document.querySelectorAll(`[data-filter="${button.dataset.filter}"]`);
            filterButtons.forEach(button => {button.classList.remove('selected-filter')})
    
            Array.from(children).forEach(child => 
                {
                    child.style.display = 'none';
                    if (child.dataset.kind == button.dataset.kind) 
                        {
                            child.style.display = 'flex';
                        }
                });
        
    
            button.classList.add('selected-filter'); 
            };
    });
});
}

filters();
//////////////////////////////



