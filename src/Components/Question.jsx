import { Link } from 'react-router-dom';

function Question(props) {
    return (
        <div>
        <Link to={`/question?id=${props.id}`}> Question - {props.qname}-- {props.id}</Link>
        </div>
    )
}

export default Question;