import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { setShowFollowings ,setOpenDialog} from '../Slice.js/FollowingSlice';
import { useDispatch } from 'react-redux';

export default function ScrollDialog() {
  const openDialog = useSelector((store) => store.following.openDialog);
  const showFollowings = useSelector((store) => store.following.showFollowings);
  const showFollowers = useSelector((store) => store.following.showFollowers);
  const showFollowingData = useSelector((store) => store.following.showFollowingData);
  const showFollowersData = useSelector((store) => store.following.showFollowersData);
  const dispatch = useDispatch();
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    dispatch(setOpenDialog(true));
    setScroll(scrollType);
  };

  const handleClose = () => {
    dispatch(setOpenDialog(false));
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialog]);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
      <Button onClick={handleClickOpen('body')}>scroll=body</Button>
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
        <input type='text' placeholder='Search name' className='rounded-lg px-6 py-1 bg-black'></input>

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
                    return(
                      <div className='text-black flex items-center justify-between'>
                      <p className='text-white'> {ele.name.charAt(0).toUpperCase()+ "" + ele.name.substring(1).toLowerCase()} </p> <button className='px-4 p-2  bg-gray-800 text-white text-sm font-light  rounded-full'>Unfollow</button>
                      </div>
                    )

              }):<><h1>No Followings</h1></>
            )
            }

            
          {
              showFollowers && (showFollowersData.length > 0 ? showFollowersData.map((ele,i)=>{
                    return(
                      <div className='text-black flex items-center justify-between'>
                      <p className='text-white'> {ele.name.charAt(0).toUpperCase()+ "" + ele.name.substring(1).toLowerCase()} </p> <button className='px-4 p-2  bg-gray-800 text-white text-sm font-light  rounded-full'>Unfollow</button>
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
