import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      cart: [],
    };
    // this.handleRemove = this.handleRemove.bind(this);
  }

  
  // state = {
    //   products: [],
    //   cart: []
    // }

  componentDidMount(){
    axios.get("http://localhost:3000/products")
    .then(res => {
      const products = res.data
        this.setState({
          products
        });      
    })         
    .catch((error)=>{
      alert("There is an error in API call.");
      console.log(error)
    });
  }

  


  addToCart = (product) => {
    const item = this.state.cart.find((item) =>  {
      return product.uuid === item.uuid
    } )

    if (item) {
      const index = this.state.cart.findIndex((item) =>  {
        return product.uuid === item.uuid
      } )
      const cartItem = { uuid: item.uuid, name: item.name, price: item.price, qty: item.qty + 1 }
      const updatedCart = this.state.cart.slice(0, index).concat(cartItem).concat(this.state.cart.slice(index + 1))
      this.setState({cart: updatedCart})
      } else {
      const qty = 1
      const cartItem = { uuid: product.uuid, name: product.name, price: product.price, qty: qty }
      const cart = this.state.cart.concat(cartItem)
      this.setState({cart})
      }
  }

 

  decreaseQty = (item) => {

  }

  // calculateTotal = () => {
  //   product.price * product.qty 
  // }
  
  render(){ 
    
    if(this.state.products) {
      // const removeButton = { 
      //       if (qty > 1) {
      //        removeButton = <button onClick={this.decreaseQty.bind(this, item)}>Remove one</button>
      //       } else {
      //        removeButton = <button onClick={this.removeItem.bind(this, item)}>Remove from cart</button>
      //       }  }
                      // const loadData = () => JSON.parse(JSON.stringify(this.state.products));
        
      // console.log(this.state.products)
      return (
        <div>
          <header>
            <p> Items Available Now! </p>
            <h1 className="App-title">Welcome to the Hacky Mess shop that only has 4 items! </h1>
          </header>
          <span>
            { this.state.products.map(product => 
              <ul key={product.uuid}>
                <div >
                  <div >
                    <h3 className="name" >{product.name}</h3>
                    <p className="uuid">{product.uuid}</p>
                    <button className="price" onClick={this.addToCart.bind(this, product)} >Price: ${product.price}</button>
                  </div>
                </div>
              </ul>
            )}
            <div>
              <h1>Your Cart</h1>
                {this.state.cart.map(item =>
                  <ul key={item.uuid}>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>Quantity: {item.qty}</p>
                    <button onClick={this.addToCart.bind(this, item)}>Add one more</button> 
                    {
                      (() => {
                        // const handler = this.state.cart.item.qty >= 2
                        //     ? this.handleRemoveOne 
                        //     : this.handleRemove;
                        const label = item.qty > 1 ? 'Remove one item' : 'Remove from cart';
                      
                        return (
                          <button>
                            {label}
                          </button>
                        );
                      })()
                    }
                  </ul>
                )}
                <p><strong>
                      Total amount owing: // calculateTotal
                </strong></p>
            </div>                   
          </span>
        </div> 
      );
    } else {
      return <div>Loading items</div>
    }
  }
}
  
export default App;