
const Article = ({ article, onDelete }) => {


    return (
        <div className="card" style={{marginTop: "20px"}}>
            <div className="card-header">
                {article.title}
            </div>
            <div className="card-body">
                <p className="card-text">{article.body}</p>
                <button className="btn btn-danger" onClick={() => onDelete(article._id)} >Elimina</button>
                <button className="btn btn-primary">Approva</button>
            </div>
        </div>
    )
}

export default Article