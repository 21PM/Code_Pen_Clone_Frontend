// import { useDispatch } from "react-redux";
// import { setUser } from "../Slice.js/userSlice";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// // const dispatch = useDispatch()
// // const navigate = useNavigate()

// function getToken(name) {
//     const token =  localStorage.getItem(name)
//     if(!token){
//         navigate("/trending")
//         return false
//       }

//       console.log("AAAAA");
      

//        // checking whether the token is expired or not

//    const decoded = jwtDecode(token);
//    console.log("BBBBBBB");

//    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
//    const currentTime = Date.now()  

//    if (expiryTime < currentTime) {
//     // Token is expired
//     localStorage.removeItem('CPToken');
//     localStorage.removeItem('user');
//     dispatch(setUser(null))
 
//     return false; 
//   }else{
//     getWorkApi(token)
//     const user = localStorage.getItem("user")
//     const jsonUSer = JSON.parse(user)
//     dispatch(setUser(jsonUSer))
//   }
//     return token
//  }


//  export default getToken;

