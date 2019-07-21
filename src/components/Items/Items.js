import React from 'react';
import Styles from './Items.module.css';
import { connect } from 'react-redux';
import Item from './Item.js'

const items = props => {

    console.log(props.taskLists[props.taskListindex].tasks.length)

    //Only loads TODO for now
    const hasToDoItems = props.taskLists[props.taskListindex].tasks.todo.length > 0
    console.log('count',props.taskLists[props.taskListindex].tasks.todo.length);

    const toDoItems = hasToDoItems ? props.taskLists[props.taskListindex].tasks.todo.map((item) => {
        return (
            < Item
                completed={false}
                key={item.creationDate}
                dateKey={item.creationDate}
                title={item.title} />
        );
    }) : (
    <div>
        <h6 className={Styles.WarningHeader}>Your list doesn't have any tasks :(</h6>
        <p className={Styles.WarningText}>Try adding some above!</p>
    </div>)

    const completedItems = props.taskLists[props.taskListindex].tasks.completed.map((item) => {
        return (
            < Item
                completed={true}
                key={item.creationDate}
                dateKey={item.creationDate}
                title={item.title} />
        );
    });

    return (
        <div className={Styles.Items}>
            <p className={Styles.ListLabel}>TO DO</p>
            {toDoItems}
            <p className={Styles.ListLabel}>COMPLETED</p>
            {completedItems}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        taskLists: state.taskLists,
        taskListindex: state.currentlyShownListIndex
    }
}

export default connect(mapStateToProps)(items);