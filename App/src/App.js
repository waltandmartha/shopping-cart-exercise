import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      cart: []
      
    }
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

  // calculateTotal = () => {
  //   product.price * product.qty 
  // }

             
  render(){ 
            
    if(this.state.products) {
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
                {this.state.cart.map(product =>
                  <ul key={product.uuid}>
                    <p>{product.name}</p>
                    <p>${product.price}</p>
                    <p>Quantity: {product.qty}</p>
                    <button >Add one more</button> <button>Remove one</button>
                  </ul>
                )}
                <p><strong>
                      Total amount owing: // calculateTotal
                </strong></p>
            </div>                   
          </span>
        </div> 
      );
    
    // const totalBeforeDiscount = 0
    // for(let i = 0; i < this.props.cart.length; i++)
    //   totalBeforeDiscount += (this.props.product[i].price * this.props.product[i].qty)
    }

    {
      return <div>Loading items</div>
    }
  }
}

          
            
export default App;