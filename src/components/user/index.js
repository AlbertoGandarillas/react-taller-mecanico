import React, {Fragment} from 'react';
import { Tooltip } from 'antd';
import './user.scss';
export function DisplayUser (props) {
    const {userName} = props;
    return(
        <Fragment>
            <span className="displayUser">
            Bienvenido, 
            <Tooltip title="Admin">
                <span> {userName}</span>
            </Tooltip>
            </span>
        </Fragment>
    );
} 

export default DisplayUser;