const Modal = ({ text, open, setOpen }) => {
  console.log("modal", text);
  return (
    <div className="modal">
      <div className="modalSection">
        <img
          src="/img/delete.png"
          alt=""
          className="modalImg"
          onClick={() => setOpen(false)}
        />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Modal;
