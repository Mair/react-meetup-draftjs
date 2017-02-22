import * as Draft from 'draft-js';

const getTextBetweenTriggerAndCurser = (trigger: string, editorState: Draft.EditorState) => {
    var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const text = currentContentBlock.getText();
    const end = selectionState.getAnchorOffset();
    const textCutOffAfterCursor = text.slice(0, end);
    const start = textCutOffAfterCursor.lastIndexOf(trigger);
    if (start === -1) { textCutOffAfterCursor.lastIndexOf(` ${trigger}`); }
    if (start === -1) { return null; }
    const suggestionText = textCutOffAfterCursor.slice(start);
    return {
        suggestionText,
        start,
        end
    };
};

const ReplaceCurrentWithEntity = (
    data: any, stringToReplace: string, triggerChar: string, entityType: string, editorState: Draft.EditorState) => {
    const currentatWord = getTextBetweenTriggerAndCurser(triggerChar, editorState);
    const selection = editorState.getSelection();
    if (!currentatWord) { return; }
    const partialSelection = selection.merge({
        anchorOffset: currentatWord.start,
        focusOffset: currentatWord.end,
    }) as Draft.SelectionState;

    const currentBlock = editorState.getCurrentContent();
    const currentBlockany = currentBlock as any;
    const contentStateWithEntity = currentBlockany.createEntity(entityType, 'IMMUTABLE', data);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const newContnentState = Draft.Modifier.replaceText(
        currentBlock, partialSelection, stringToReplace, undefined, entityKey);
    const newEditorState = Draft.EditorState.push(
        editorState,
        newContnentState, 'insert-characters'
    );
    const editorStateToUpdate = Draft.EditorState.forceSelection(newEditorState, newContnentState.getSelectionAfter());
    if (!isCursorAtEndOFBlock(editorState, triggerChar)) { return editorStateToUpdate; }

    const contentStateWithSpace = Draft.Modifier.insertText(editorStateToUpdate.getCurrentContent(),
                                                            newContnentState.getSelectionAfter(), ' ');
    const newEditorStateWithSpace = Draft.EditorState.push(editorStateToUpdate, 
                                                           contentStateWithSpace, 'insert-characters');
    const editorStateToUpdateWithSpace = Draft.EditorState.forceSelection(newEditorStateWithSpace, 
                                                                          contentStateWithSpace.getSelectionAfter());
    return editorStateToUpdateWithSpace;
};

const isCursorAtEndOFBlock = (editorState: Draft.EditorState, triggerChar: string) => {
    const selection = editorState.getSelection();
    const blockKey = selection.getAnchorKey();
    const blockSize = editorState.getCurrentContent().getBlockForKey(blockKey).getLength();
    const currentatWord = getTextBetweenTriggerAndCurser(triggerChar, editorState);
    if (!currentatWord) { return false; }
    if (blockSize === currentatWord.end) {return true; }
    return false;
};

function getEntityData<T>(entityKey: string, editorState: Draft.EditorState) {
    var currentContent = editorState.getCurrentContent() as any;
    const instance = currentContent.getEntity(entityKey);
    const data = instance.getData() as T;
    return data;
}

export { getTextBetweenTriggerAndCurser, ReplaceCurrentWithEntity, isCursorAtEndOFBlock, getEntityData }