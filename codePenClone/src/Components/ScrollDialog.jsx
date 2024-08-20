import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { setShowFollowings ,setOpenDialog,setShowFollowingsData,setShowFollowersData} from '../Slice.js/FollowingSlice';
import { useDispatch } from 'react-redux';
import axios from "axios"
import { setUser } from '../Slice.js/userSlice';
import { toast } from 'react-toastify';
import { LOCAL_END_POINT } from '../utils/API';




export default function ScrollDialog() {
  const openDialog = useSelector((store) => store.following.openDialog);
  const user = useSelector((store) => store.user.user);
  const showFollowings = useSelector((store) => store.following.showFollowings);
  const showFollowers = useSelector((store) => store.following.showFollowers);
  const showFollowingData = useSelector((store) => store.following.showFollowingData);
  const showFollowersData = useSelector((store) => store.following.showFollowersData);
  const [backupData,setBackUpData] = React.useState([])
  const [accountIds,setAccountIds] = React.useState([])
  const [searchValue,setSearchValue] = React.useState("")
  const Token = useSelector((store) => store.following.Token);
  const dispatch = useDispatch();
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    dispatch(setOpenDialog(true));
    setScroll(scrollType);
  };

  const handleClose = () => {
    dispatch(setOpenDialog(false));
  };

  const handleUnfollow = async (ele)=>{

    const Obj = {
      postedById:ele._id
    }

    console.log(ele._id);
    

    try{
      const response = await axios.post(`${LOCAL_END_POINT}/remove-following`,Obj,{
        withCredentials:true,
        headers:{
          'Authorization':`Bearer ${Token}`
        }
      })

      if(response.data.status){
        dispatch(setUser(response.data.user))   
        localStorage.setItem("user",JSON.stringify(response.data.user))
        setAccountIds([...accountIds,ele._id])
        toast.success(`You had unfollowed ${ele.name}`)  
        }      
        

    }catch(e){
      console.log(e);
      toast.error(`${e}`)

    }
  }

  const handleFollow = async (ele)=>{

      const followId ={
        userId:ele._id
      }
      
      try{  

        const response = await axios.post(`${LOCAL_END_POINT}/add-follower`,followId,{
          withCredentials:true,
          headers:{
            'Authorization':`Bearer ${Token}`
          }
        })

        if(response.data.status){
          const ans  = accountIds?.filter((element,i)=>{
            return element !== ele._id
            
          })
          setAccountIds(ans)
          toast.success(`You are following ${ele.name}`)             

          dispatch(setUser(response.data.user))   
          localStorage.setItem("user",JSON.stringify(response.data.user))
    }                    

      }catch(e){
        console.log(response);

      }
  }

   

  const descriptionElementRef = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }

    
    if(showFollowers){    
      console.log("floow");
        
      setBackUpData(showFollowersData)
    }
    
    if(showFollowings){
      console.log("floowing ");

      setBackUpData(showFollowingData)

    }

    return () => setAccountIds([])
  }, [openDialog]);

  React.useEffect(() => {

    console.log(backupData);
    

    // Logic related to Following searchValue changes 
    if(showFollowings){
      if (searchValue !== "") {
        const ans  = backupData?.filter((ele,i)=>{
            return ele.name.toLowerCase().includes(searchValue.toLowerCase())
        })          
        dispatch(setShowFollowingsData(ans))  
      } 
      if(searchValue === ""){
       dispatch(setShowFollowingsData(backupData))  
       }
    }

    
    
    // Logic related to Followers searchValue changes 

    if(showFollowers){
          if(searchValue !== ""){
            const ans = backupData?.filter((ele,i)=>{
              return ele.name.toLowerCase().includes(searchValue.toLowerCase())

            })
            dispatch(setShowFollowersData(ans))  
          }
          if(searchValue === ""){
            dispatch(setShowFollowersData(backupData))  
          }
      }

   

  }, [searchValue]);

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0, 0, 0, 0.3)', // Set background color using sx prop
            color: 'white', // Set text color
            backdropFilter: 'blur(5px)',
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">  
        <div>
        <input type='text' placeholder='Search name'   ref={inputRef}
 value={searchValue} className='rounded-lg px-6 py-1 bg-black' onChange={(e)=>setSearchValue(e.target.value)}></input>

        </div>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ color: 'white' }} // Set text color for DialogContentText
          >
            <div className='min-w-full flex flex-col gap-4'>
            {
              showFollowings && (showFollowingData.length > 0 ? showFollowingData.map((ele,i)=>{

                let showFollowBtn = false
                if (accountIds.includes(ele._id)){
                  showFollowBtn = true
                }
        
                    return(
                      <div className='text-black flex items-center justify-between'>
                      <p className='text-white'> {ele.name.charAt(0).toUpperCase()+ "" + ele.name.substring(1).toLowerCase()} </p> 
                      
                       {
                        !showFollowBtn ? <button onClick={()=>handleUnfollow(ele)} className='px-4 p-2  bg-gray-800 text-white text-sm font-light  rounded-full'>Unfollow</button> :

                      <button onClick={()=>handleFollow(ele)} className='px-4 p-2  bg-gray-800 text-white text-sm font-light  rounded-full'>follow</button>
                      } 
                      </div>
                    )

              }):<><h1>No Followings</h1></>
            )
            }

          {
              showFollowers && (showFollowersData.length > 0 ? showFollowersData.map((ele,i)=>{

                  console.log(ele._id);
                  console.log(user.following);
                  let showFollowBtn = false

                  if(user.following.includes(ele._id)){
                    showFollowBtn = true
                  }

                    return(
                      <div className='text-black flex items-center justify-between'>
                      <p className='text-white'> {ele.name.charAt(0).toUpperCase()+ "" + ele.name.substring(1).toLowerCase()} </p>
                      {
                        showFollowBtn ? <button className='px-4 p-2  bg-gray-800 text-white text-sm font-light  rounded-full'onClick={()=>handleUnfollow(ele)} >Unfollow</button>:
                        <button className='px-4 p-2  bg-gray-800 text-white text-sm font-light  rounded-full' onClick={()=>handleFollow(ele)}>Follow</button>
                      } 
                      </div>        
                      )

              }):<><h1>No Followers</h1></>
            )
          }


             
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
