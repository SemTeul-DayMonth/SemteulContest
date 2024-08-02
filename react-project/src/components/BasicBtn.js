export default function BasicBtn({ children, onClick }) {
  return (
    <div className="basicBtn" onClick={onClick}>
      {children}
    </div>
  );
}
