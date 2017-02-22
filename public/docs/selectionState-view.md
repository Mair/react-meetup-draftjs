# Selection editorState

## getting selection
SelectionState represents the cursor, its position and what it is selecting. You can use selection to manipulate text such as inserting or deleting.

``` typescript
  get selectionState() {
        // the editorState ahs a setSelection() method to get the selection
        const selectionState = this.state.editorState.getSelection();

        // sample of some data we can get from the selection state
        const offset = selectionState.getAnchorOffset();
        const focusOffset = selectionState.getFocusOffset(); 
        const isBackwards = selectionState.getIsBackward();
        return {
            offset,
            focusOffset,
            isBackwards
        };
    }
```
## Setting a selection
``` typescript

    setSelection = (offset: number, focusOffset: number) => {
        const {editorState} = this.state;
        const selectionState = editorState.getSelection();

        // we cant set the selection state directly because its immutable.
        // so make a copy  
        const newSelection = selectionState.merge({
            anchorOffset: offset,
            focusOffset: focusOffset,
        }) as Draft.SelectionState;

        // Draft API helper set the selection into a new editorState
        const newEditorState = Draft.EditorState.forceSelection(editorState, newSelection);

        // update the editorState 
        this.editorStateChanged(newEditorState);
    }
```

[source](https://github.com/Mair/react-meetup-draftjs/blob/master/src/draftjs/selectionstate.tsx)