import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../../images/PageNotFound.png';
class NotFoundPage extends React.Component {
    render() {
        return <div>
            <img style={{ objectFit: 'cover', width: '100%', height:'100vh' }} src={PageNotFound} />
            <p >
                <Link to="/">Go to Home </Link>
            </p>
        </div>;
    }
}
export default NotFoundPage;