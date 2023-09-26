import React from "react";


const Avatar = ({size=200, user}) => {
    const style = {
        width: size + "px",
        height: size + "px",
        objectFit: "cover",
        objectPosition: "center",
        borderRadius: "50%",
}

    return <img className="avatar" style={style} src={user.photo}/>


}

export default Avatar