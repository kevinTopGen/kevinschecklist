import React from 'react';
import Styles from './Item.module.css'
import complete from '../../assets/complete.png';
import { connect } from 'react-redux';
import * as actionStyles from '../../store/actions';



const item = props => {
    return (
        <div className={props.completed ? Styles.ItemCompleted : Styles.Item}>
            <p className={Styles.ItemText}>{props.title}</p>
            {props.completed ? null :
                <button className={Styles.Button}
                    onClick={() => props.deleteItem(props.dateKey)}>
                    <img
                        className={Styles.Image}
                        src={complete}
                        alt='Completed' />
                </button>
            }
        </div>
    );
};

const mapStateToDispatch = (dispatch) => {
    return {
        deleteItem: (dateKey) => dispatch({ type: actionStyles.COMPLETEITEM, dateKey: dateKey })
    }
}

export default connect(null, mapStateToDispatch)(item);