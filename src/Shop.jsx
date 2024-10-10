import "./Shop.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Item(props) {
    return(<div key= {props.id} onClick={()=>props.callback(props)}>
        <img src={props.img} width={200} height={200}/><br/>
        ID: {props.id}<br/>
        Name: {props.name}<br/>
        Price: {props.price}<br/>
    </div>);
}

export default function Shop(){
    const [products,setProducts] = useState([]);
    const URL="https://scaling-lamp-x5x9gw4wgqrfgp9-5000.app.github.dev";
    useEffect(()=>{
        axios.get(URL+'/api/products')
        .then(response=>{
            setProducts(response.data);
        })
        .catch(error=>{
            console.log("error");
        })
    }
    ,[]);
    // const products=[
    //     {id:0,name:"Notebook Acer Swift",price:45900,img:"https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg"},
    //     {id:1,name:"Notebook Asus Vivo",price:19900,img:"https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg"},
    //     {id:2,name:"Notebook Lenovo Ideapad",price:32900,img:"https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg"},
    //     {id:3,name:"Notebook MSI Prestige",price:54900,img:"https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg"},
    //     {id:4,name:"Notebook DELL XPS",price:99900,img:"https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg"},
    //     {id:5,name:"Notebook HP Envy",price:46900,img:"https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg"}]
    
    const [cart, setCart] = useState([]);

    function addCart(item) {
        setCart([...cart,{id:item.id, name:item.name, price:item.price, img:item.img}])
    }

    function removeSingle(index) {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    }

    const clearCart=()=>{
        setCart([]);
    }
    let total = 0;
    const productsList=products.map(item=><Item {...item} callback={addCart}/>)
    const cartList =cart.map((item, index)=><li key={index}>{item.id} {item.name} {item.price}  <button onClick={() => removeSingle(index)} style={{marginLeft: "10px"}}>X</button></li>)
    for(let i=0; i<cart.length; i++) total+=cart[i].price;
    
    return(<>
    <div className="grid-container">{productsList}</div>
    <h1>Cart</h1>
    <ol>{cartList}</ol>
    <h2>Total: {total} Baht</h2>
    <button onClick={()=>clearCart()}>Clear All</button>
    </>);  
}