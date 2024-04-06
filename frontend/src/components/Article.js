import DeleteModal from '../components/DeleteModal';
import { useState } from "react";
import DeleteButton from './DeleteButton';

const Article = ({ article, onDelete }) => {

    const [delModal, setDelModal] = useState(false);

    return (
        <div className="card" style={{marginTop: "20px"}}>
            <div className="card-header">
                {article.title}
            </div>
            <div className="card-body">
                <p className="card-text">{article.body}</p>
                <DeleteButton 
                    onClick={() => setDelModal(true)}
                />

                {delModal && (
                    <DeleteModal 
                        message={"Vuoi eliminare l'articolo?"}
                        onDelete={() => onDelete(article._id)}
                        onCancel={() => setDelModal(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default Article