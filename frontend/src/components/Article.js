
const Article = ({ article }) => {


    return (
        <div className="card" style={{marginTop: "20px"}}>
            <div className="card-header">
                {article.title}
            </div>
            <div className="card-body">
                <p className="card-text">{article.body}</p>
                <button className="btn btn-danger">Elimina</button>
                <button onClick = "" className="btn btn-primary">Approva</button>
            </div>
        </div>
    )
}

export default Article