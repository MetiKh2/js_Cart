const products = [
  {
    id: 1,
    name: "iPhone 12",
    price: 99,
    image: "./images/iphone-12.jpg",
  },
  {
    id: 2,
    name: "Air Pods",
    price: 55,
    image: "./images/airpods.jpg",
  },
  {
    id: 3,
    name: "Air Pods 3",
    price: 66,
    image: "./images/airpods.jpg",
  },
];
const renderProducts = () => {
  const productDiv = document.querySelector(".products");
  productDiv.innerHTML = "";

  products.forEach((item, index) => {
    productDiv.innerHTML += ` <div class="card my-2 p-3 col-md-4">
        <div class="product__image">
            <img src="${item.image}" alt="">
        </div>
        <h2 class="product__title">${item.name}</h2>
        <h3 class="product__price">$${item.price}</h3>
        <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to cart</button>
    </div>`;
  });
};

let cart = {
  items: [],
  total: 0,
};

const renderCartItems = () => {
  const cartDiv = document.querySelector(".cart__items");
  cartDiv.innerHTML = "";

  const totalPriceElement = document.querySelector(".total__price");
  let totalPrice = 0;
  if (cart.items.length === 0) {
    totalPriceElement.innerHTML = "There is no item in cart";
  } else {
    cart.items.forEach((item) => {
      totalPrice += item.total;
      cartDiv.innerHTML += `
            <div class="col-md-4 mb-4">
            <h3 class="">${item.name}</button>
        </div>
        
        <div class="col-md-4 mb-4">
            <div class="qty">${item.qty}</div>
        </div>
        <div class="col-md-4 mb-4">
            <button class="btn btn-danger" onclick='removeFromCart(${item.id})'>Delete</button>
        </div>
            `;
    });
    totalPriceElement.innerHTML = `Total : $${totalPrice}`;
  }
};

const addToCart = (id) => {
  const product = products.find((product) => product.id == id);
  let existingProduct = false;
  let newCartItems = cart.items.reduce((state, item) => {
    if (item.name == product.name) {
      existingProduct = true;
      const newItem = {
        ...item,
        qty: item.qty + 1,
        total: (item.qty + 1) * item.price,
      };
      return [...state, newItem];
    }
    return [...state, item];
  }, []);
  if (!existingProduct) {
    newCartItems.push({
      ...product,
      qty: 1,
      total: product.price,
    });
  }
  cart={
    ...cart,
    items:newCartItems
  }
  renderCartItems();
};

const removeFromCart=(id)=>{
let newCartItems=cart.items.reduce((state,item)=>{
    if(item.id==id){
        const newItem={
            ...item,
            qty:item.qty-1,
            total:(item.qty-1)*item.price
        }
        if (newItem.qty>0) {
            return [...state,newItem]
        }
        else{
            return state
        }
    }
    return [...state,item]
},[])
cart={
    ...cart,
    items:newCartItems
}
renderCartItems();
}

renderCartItems();
renderProducts();
