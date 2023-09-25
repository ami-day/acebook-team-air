import './FriendsModal.css';
import 'font-awesome/css/font-awesome.min.css';
import FriendProfile from '../FriendsCard/FriendProfile'

const FriendsModal = ({setModal}) => {

const closeButton = () => {
  setModal(false);
}

return (
  <div id="find-friends">
<button id="closebtn" type="button" className="btn-close" onClick={closeButton}></button>
<h1>Find Friends</h1>
<p>This is where you can find friends!</p>
<div className="form">
  <i className="fa fa-search"></i>
  <input type="text" className="form-control form-input" placeholder="Search friends..."/>
  </div>
  <div id="friendProfile">
  <FriendProfile></FriendProfile>
  <FriendProfile></FriendProfile>
  <FriendProfile></FriendProfile>
  <FriendProfile></FriendProfile>
  <FriendProfile></FriendProfile>
  </div>
</div>        
)
}
export default FriendsModal;

