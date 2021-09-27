class CartItem {
  constructor(quantity, productPrice, productImageUrl, productTitle, sum) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.productImageUrl = productImageUrl;
    this.sum = sum;
  }
}

export default CartItem;
