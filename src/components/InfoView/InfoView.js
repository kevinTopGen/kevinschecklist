import React, { useState, useRef, useEffect } from 'react';
import Styles from './InfoView.module.css';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

const InfoView = (props) => {
    const [inputState, setInputState] = useState({inputValue : '', displayWarning : false});
    const inputElementRef = useRef(null);

    const inputChangeHandler = event => {
        setInputState({inputValue: event.target.value, displayWarning: false});
    }

    const keyPressedHandler = (e) => {
        if (e.key === 'Enter') {
            addClickHandler();
        }
    }

    const addClickHandler = () => {
        if (inputState.inputValue === '') {
            setInputState({inputValue: '', displayWarning: true});
            return;
        }
        props.addItem(inputState.inputValue)
        setInputState({inputValue: '', displayWarning: false});
    }

    useEffect (() => {
        inputElementRef.current.focus()
    })

    return (
        <div className={Styles.InfoView}>
            <div className={Styles.FormView}>
                <input
                    className={Styles.InputField}
                    value={inputState.inputValue}
                    onChange={inputChangeHandler}
                    onKeyDown={keyPressedHandler}
                    ref={inputElementRef}
                    type='text'
                    placeholder='Ex. Take out the trash'></input>
                <button
                    type='submit'
                    className={Styles.AddButton}
                    onClick={addClickHandler}>
                    Add</button>
            </div>
            {inputState.displayWarning ? <p className ={Styles.WarningText}>Please Enter a To-Do</p>: null }
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        addItem: (itemTitle) => dispatch({ type: actionTypes.ADDITEM, title: itemTitle })
    }
}

export default connect(null, mapDispatchToProps)(InfoView);