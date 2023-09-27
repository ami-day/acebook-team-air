import React from "react";

const Avatar = ({ size = 200, user }) => {
  const colors = [
    "rgb(165, 197, 220)",
    "#F0F7D4",
    "#B2D732",
    "#347B98",
    "#e6db74",
    "#f7cac9",
    "#955251",
    "#B565A7",
    "#009B77",
    "#D65076",
  ];
  const random_color = colors[Math.floor(Math.random() * colors.length)];

  const imgStyle = {
    width: size + "px",
    height: size + "px",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "50%",
    transition: "all 300ms ease-in-out",
  };

  const fallbackStyle = {
    width: size + "px",
    height: size + "px",
    borderRadius: "50%",
    backgroundColor: random_color,
    fontSize: `${size * 0.7}px`,
    display: "grid",
    placeItems: "center",
    lineHeight: 1,
    transition: "all 200ms ease-in-out",
  };

  if (user) {
    return user.photo ? (
      <img className="avatar" style={imgStyle} src={`/avatars/${user.photo}`} />
    ) : (
      <div className="fallback" style={fallbackStyle}>
        <p style={{ margin: 0 }}>{user && user.username[0].toUpperCase()}</p>
      </div>
    );
  }
};

export default Avatar;
