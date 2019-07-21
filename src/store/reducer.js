import * as actionStyles from './actions';

const initialState = {
    taskLists: [
        {
            taskListName: 'General',
            tasks: {
                todo: [{ creationDate: new Date().getTime(), title: "This is an example Task" }],
                completed: [{ creationDate: new Date().getTime() + 1, title: "I've done this" }]
            }
        }
        ,
        { taskListName: 'School', tasks: { todo: [], completed: [] } },
        { taskListName: 'Running', tasks: { todo: [], completed: [] } }
    ],
    currentlyShownListIndex: 0
}

const reducer = (state = initialState, action) => {
    const index = state.currentlyShownListIndex
    const updatedTaskLists = [...state.taskLists]

    switch (action.type) {
        case actionStyles.ADDITEM:
            updatedTaskLists[index].tasks.todo.unshift({ creationDate: new Date().getTime(), title: action.title })
            return {
                ...state,
                taskLists: updatedTaskLists
            }
        case actionStyles.COMPLETEITEM:
            const itemIndex = updatedTaskLists[index].tasks.todo.findIndex((result) => result.creationDate === action.dateKey)
            const item = updatedTaskLists[index].tasks.todo[itemIndex];
            updatedTaskLists[index].tasks.todo.splice(itemIndex, 1);
            updatedTaskLists[index].tasks.completed.unshift(item);
            return {
                ...state,
                taskLists: updatedTaskLists
            }
        case actionStyles.CHANGELIST:
            return {
                ...state,
                currentlyShownListIndex: action.listIndex
            }
        case actionStyles.NEWLIST:
            return {
                ...state, 
                taskLists: [...state.taskLists, { taskListName: action.listName, tasks: { todo: [], completed: [] } }],
                currentlyShownListIndex: state.taskLists.length 
            }
        default:
            break;
    }

    return state;
}

export default reducer;
