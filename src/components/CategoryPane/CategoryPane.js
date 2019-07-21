import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as actionStyles from '../../store/actions';
import Styles from './CategoryPane.module.css';

const CategoryPane = props => {

    const [paneState, updatePaneState] = useState({folderNameValue: ''});
    const newFolderInputRef = useRef(null);

    const categoryLabels = props.taskLists.map((item, index) => {
        console.log('[index]',index)
        console.log(props.taskListIndex)
        return (
            <p 
            key={item.taskListName}
            className={index === props.taskListIndex ? Styles.CategoryLabelSelected : Styles.CategoryLabel}
            onClick={() => props.changeList(index)}>{item.taskListName}</p>
        );
    });

    const folderNameValueChangeHandler = (event) => {
        updatePaneState({folderNameValue: event.target.value})
    }

    const loseFocusHandler = () => {
        updatePaneState({folderNameValue: ''})
    }

    const keyPressedHandler = (e) => {
        if (e.key === 'Enter') {
            props.addNewList(paneState.folderNameValue)
            updatePaneState({folderNameValue: ''})
            newFolderInputRef.current.blur();
        }
    }

    return (
        <div className={Styles.CategoryPane}>
            <h1 className={Styles.CategoryTitle}>Kevin's Tasks</h1>
            <p className={Styles.CategoriesLabel}>CATEGORIES</p>
            {categoryLabels}
            <input 
            onBlur={loseFocusHandler}
            ref={newFolderInputRef}
            className={Styles.AddNewCategory} 
            onChange={folderNameValueChangeHandler}
            value={paneState.folderNameValue}
            onKeyDown={keyPressedHandler}
            placeholder="+ New Folder"></input>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        taskLists: state.taskLists,
        taskListIndex : state.currentlyShownListIndex
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        changeList: (listIndex) => dispatch({ type: actionStyles.CHANGELIST, listIndex: listIndex }),
        addNewList: (listName) => dispatch({ type: actionStyles.NEWLIST, listName: listName})

    }
}

export default connect(mapStateToProps, mapStateToDispatch)(CategoryPane);