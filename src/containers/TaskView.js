import React from 'react';
import InfoView from '../components/InfoView/InfoView'
import Items from '../components/Items/Items';
import Styles from './TaskView.module.css';

const taskView = (props) => {
    return (
        <div className={Styles.TaskView}>
            < InfoView />
            < Items />
        </div>
    )
}

export default taskView;