import "./styles.css";

import {useState} from 'react';
import { AnimatePresence } from "framer-motion";

import background from "./images/amazon1.jpeg";
import ReactiveButton from 'reactive-button';
import Legal from './Legal';
import Modal from './Modal'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData} from 'react-firebase-hooks/firestore';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ArcGlobe from "./ArcGlobe";


var firebaseConfig = {
  apiKey: "AIzaSyDJtn7YR8Y2bttb50CZ72K3Rw5aF-hW4sg",
  authDomain: "pricefollow-cc0f3.firebaseapp.com",
  projectId: "pricefollow-cc0f3",
  storageBucket: "pricefollow-cc0f3.appspot.com",
  messagingSenderId: "650447652443",
  appId: "1:650447652443:web:5d2706685bb1c99d6be17e"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div id="App">       
       <section>
        {user ? <ProductDisplay /> : <Home />}
      </section>
    </div>
  );
}

function Home() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
  <div id="homebg">
    <div id="globe1">
      <div id="globe">
        <ArcGlobe/>
      </div>
    </div>
      <div id="box">
          <div id="bgimg" style={{ backgroundImage: `url(${background})` }}>
              <div id="page-wrap">
              <h1>Price Follow</h1>
              <ReactiveButton
                  onClick={signInWithGoogle}
                  color={'yellow'}
                  idleText={'Sign In'}
                  loadingText={'Loading'}
                  successText={'Success'}
                  errorText={'Error'}
                  type={'button'}
                  className={'class1 class2'}
                  style={{ borderRadius: '5px' }}
                  outline={false}
                  shadow={false}
                  rounded={true}
                  size={'normal'}
                  block={false}
                  messageDuration={2000}
                  disabled={false}
                  buttonRef={null}
                  width={null}
                  height={null}
                  animation={true}
              />
              </div>
          </div>
      </div>
      <Legal />
  </div>
  );
}

function ProductDisplay() {

  const itemsRef = firestore.collection('items');
  const query = itemsRef.orderBy('name').limit(25);

  const [items] = useCollectionData(query, { idField: 'id' });

  const[modalOpen, setModalOpen] = useState(false);
  const[clickedItem, setClickedItem] = useState(0);
  
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
//   return (
//   <>
//     <main>
//       {items && items.map(itm => {
//         return(
//           <Grid
//             container
//             justifyContent="center"
//             style={{ padding: '1%' }}
//           >
//           <div className="item-container">
//             <Card sx={{ maxWidth: 345 }}>
//            <CardActionArea  onClick={() => (modalOpen ? close() : open())} >
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image= {itm.imagelink}
//                 alt={background}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {itm.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {itm.description}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//             <CardActions>
//               <Button href={itm.amazonlink} size="small" color="success">
//                 Buy
//               </Button>
//               <Button size="small" color="primary">
//                 Follow
//               </Button>
//             </CardActions>
//           </Card>
//         </div>
//         <AnimatePresence
//         initial={false}
//         exitBeforeEnter={true}
//         onExitComplete={() => null}
//         >
//           {modalOpen && <Modal item={itm} modalOpen={modalOpen} handleClose={close} />}
//         </AnimatePresence>
//         </Grid>
//         )
//       })
//     } 
//     </main>
//   </>
//   )

// }

return(
  <>
  <div className="container">
  {items && items.map((itm, index) => {
    return (
        <div className="item-container">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => (modalOpen ? close() : open(), setClickedItem(itm))}>
              <CardMedia
                component="img"
                height="140"
                image= {itm.imagelink}
                alt={background}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {itm.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {itm.description}
                </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
              <Button href={itm.amazonlink} size="small" color="success">
                Buy
              </Button>
              <Button size="small" color="primary">
                Follow
              </Button>
            </CardActions>
          </Card>
          
        
        <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
        >
          {modalOpen && clickedItem && <Modal item={clickedItem} modalOpen={modalOpen} handleClose={close} />}
        </AnimatePresence>
        
        </div>
    );
  })
  }
  </div>
  </>
  );
}

export default App;
