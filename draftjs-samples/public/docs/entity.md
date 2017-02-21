## Entities

Entities allow you to store metadata along with a section of text. The range of text is determined by a [selection state](/SelectionState)

In the sample you can create an Entity by selecting a range of text and clicking the create entity button.

**Selection ranges must span a single bloc**

## create an entity
The code to create an Entity is as follows:

``` typescript
 setEntity(data: string, mutabilaty: string = 'IMMUTABLE') {
        const editorState = this.state.editorState;
        const contentstate = editorState.getCurrentContent();

        // the entity is created from the content state and returns the actual entety
        // we don't need the actual entety but we do need a key
        contentstate.createEntity('myEntityIdentifier', mutabilaty, { storedText: data });

        // This is how we get the key
        const entityKey = contentstate.getLastCreatedEntityKey();

        // get the current selection
        const selectionState = this.state.editorState.getSelection();
       
        // associate the text in the selection (from - to) to the entety and get a new content state
        const newContentState = Draft.Modifier.applyEntity(contentstate, selectionState, entityKey);

        // add the new content state to the existing editor state and return a new editorstate
        const newEditorState = Draft.EditorState.push(this.state.editorState, newContentState, 'apply-entity');

        // update the Edit controll
        this.editorStateChanged(newEditorState);
    }
```

## read an entity
There are several ways to retrieve an Entity. The code below gets it by the letter index:
```typescript
  getEntityAtCursor(editorState: Draft.EditorState) {
        const selectionState = editorState.getSelection();
        const selectionKey = selectionState.getStartKey();
        const contentstate = editorState.getCurrentContent();

        // get the block where the cursor is
        const block = contentstate.getBlockForKey(selectionKey);

        // get the Entity key at the where the cursor is
        const entityKey = block.getEntityAt(selectionState.getStartOffset());
        if (entityKey) {

            // use the following method to get the entity instance
            const entityInstance = contentstate.getEntity(entityKey);
            const data = entityInstance.getData();
            this.setState({ retrievedData: data.storedText });
        } else {
            this.setState({ retrievedData: '' });
        }
    }
```
If you try to create an entity over a range where one already exist, the entity will simply encompass the new range.


## Mutability

Please see [Draft-js documentation](https://facebook.github.io/draft-js/docs/advanced-topics-entities.html)
under the Mutability section.




   