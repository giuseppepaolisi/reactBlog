import { ReactComponent as TrashIcon } from "bootstrap-icons/icons/trash.svg";

export default function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-outline-danger mx-1 py-0 border-0"
    >
      <TrashIcon />
    </button>
  );
}