import ReactDOM from "react-dom";

interface CreateImageModalProps {
    show: boolean;
    onClose: () => void;
}

export const CreateImageModal = ({ onClose, show }: CreateImageModalProps) => {
    if(!show) return null;

    return ReactDOM.createPortal(
    <div className="absolute inset-0">
        <h4>EITA</h4>
        <button onClick={onClose}></button>
    </div>, document.body as HTMLElement);
};
