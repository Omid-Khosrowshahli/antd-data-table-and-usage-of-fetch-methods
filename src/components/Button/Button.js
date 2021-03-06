import './Button.css'

const Button = ({children, handleClick}) => {
  return (
    <button onClick={handleClick}>{children}</button>
  );
}

export default Button;