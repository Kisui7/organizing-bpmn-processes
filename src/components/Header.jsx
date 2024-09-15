import "../static/Header.css";

export default function Header(props) {

  return (
    <>
      <div className="links-nav">
        <button onClick={props.item.handleClick}>{props.item.nome}</button>
      </div>
    </>
  );
}
