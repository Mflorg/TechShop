import axios from 'axios';


export const ADD_USER='ADD_USER';
export const LIST_USERS='LIST_USERS';
export const LOGIN_USER='LOGIN_USER';
export const DELETE_USER='DELETE_USER';
export const EDIT_USER= 'EDIT_USER';
export const ENVIAR_EMAIL = 'ENVIAR_EMAIL';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const LOGOUT_USER='LOGOUT_USER';
export const USER_PROFILE='USER_PROFILE';

export function isLogged(){
    return function(dispatch){
        return axios.get('http://localhost:3000/auth/me',
        { withCredentials: true})
        .then((resp)=>{
            if(resp.data.loggedin){
                dispatch({
                    type: USER_PROFILE,
                    user:resp.data.user
                })
            }
           
            // console.log(resp.data.user)
        })
    }
}


export function addUser(user){
   
    return function(dispatch){
        console.log(user)
        const newUser={
            name:user.name,
            lastname:user.lastname,
            dni:user.dni,
            email:user.email,
            username:user.username,
            password:user.password,
            image:user.image,
            typeUser:user.typeUser==='' ?  user.typeUser='cliente' : user.typeUser
        };
        return axios.post('http://localhost:3000/user', newUser)
        .then(us=>{
            dispatch({
                type: ADD_USER,
                user:us
            })
           
        })
       
    }
}
export function listUser(){
    return function(dispatch){
        return axios.get('http://localhost:3000/user')
        .then(user=>{
            dispatch({
                type: LIST_USERS,
                user:user
            })
        })
    }
}
export function loginUser(username, password){
    var cart=localStorage.getItem('carritoLocal')

    return function(dispatch){
        if(!cart){
          return  axios({
                method: "POST",
                data: {
                    username,
                    password
                },
                withCredentials: true,
                url: "http://localhost:3000/auth/login",
            })
        .then(res=>{
            return res.data})
        .then(response=>{
            if(response.success){
                dispatch({
                    type: LOGIN_USER,
                    user:response.user
                })
               
            //  window.location.href='./me'
            }
     
        })
       
        }
        else{
            return  axios({
                method: "POST",
                data: {
                    username,
                    password
                },
                withCredentials: true,
                url: "http://localhost:3000/auth/login",
            })
            .then((res)=>{
                return res.data
            })
            .then(response=>{
                if(response.success){
                    dispatch({
                        type: LOGIN_USER,
                        user:response.user
                    })
                    console.log(response.success)
                agregarProdUsuario(response.user.id)
                localStorage.clear();
                window.location.href='./me'
               
                }
            })
        }
 }
}
export function editUser(user){
    // console.log(user)
    return function(dispatch){
        return axios.put(`http://localhost:3000/user/${user.id}`, user)
        .then(us=>{
            console.log(us)
            dispatch({
    
                type: EDIT_USER,
                user:us
            })
        })
       
    }
}
export function deleteUser(id){
    return function(dispatch){
        return axios.delete(`http://localhost:3000/user/${id}`)
        .then((user)=>{
            dispatch({
                type: DELETE_USER,
                user:user
            })
        })
    }
}

export function enviarEmail(email){
    return function(dispatch){
        return axios.post(`http://localhost:3000/user/0/passwordReset`,email)
        .then((user)=>{
            dispatch({
                type: ENVIAR_EMAIL,
                user:user
            })
        })
    }
}

export function resetPassword(password){
    return function(dispatch){
        return axios.post(`http://localhost:3000/user/${password.id}/passwordReset`,password)
        .then((user)=>{
            dispatch({
                type: RESET_PASSWORD,
                user:user
            })
        })
    }
}

export function logoutUser(){
    return function(dispatch){
        return axios.get('http://localhost:3000/auth/logout', {
            withCredentials:true
        })
        .then((resp)=>{
            dispatch({
                type: LOGOUT_USER
            })
            console.log(resp)
            window.location.href='./products'


        })
    }
}

const agregarProdUsuario = (idUser) => {
    let prodStock = JSON.parse(localStorage.stock)
    var productos_line = []

    for (var prod in prodStock) {
        var { cantidad, precio } = prodStock[prod]
        productos_line.push({
            productId: parseInt(prod),
            cantidad: cantidad,
            price: precio
        })
    }

    var agregaProducto = []
    agregaProducto.push("carrito")
    agregaProducto.push(productos_line)
    console.log(agregaProducto)
    // agregarProductoCarritoUser(idUser,agregaProducto)
    axios.post(`http://localhost:3000/user/${idUser}/cart`, agregaProducto, {
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })

        .catch(err => { console.log(err) })


}