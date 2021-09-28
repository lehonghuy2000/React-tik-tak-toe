function Square(props) {
    let classes = "square";
    if(props.winner)
    {
      classes = "square" + " win-item";
    }
    return (
      <button className={classes} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

export default Square;