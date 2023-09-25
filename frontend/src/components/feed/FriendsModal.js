import './FriendsModal.css';
import 'font-awesome/css/font-awesome.min.css';
import FriendProfile from '../FriendsCard/FriendProfile'

const FriendsModal = () => {

return (
  <div id="find-friends">
<h1>Find Friends</h1>
<p>This is where you can find friends!</p>
<div class="form">
  <i class="fa fa-search"></i>
  <input type="text" class="form-control form-input" placeholder="Search friends..."/>
  </div>
  <FriendProfile></FriendProfile>
</div>        
)
}
export default FriendsModal;

