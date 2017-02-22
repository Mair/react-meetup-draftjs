import * as React from 'react';
import * as Draft from 'draft-js';

interface ContentStateViewState {
    editorState: Draft.EditorState;
    data: string;
    retrievedData: string;
    mutabilaty: string;

}
export class Entity extends React.Component<null, ContentStateViewState> {
    state = {
        editorState: Draft.EditorState.createEmpty(),
        data: '',
        mutabilaty: 'IMMUTABLE',
        retrievedData: ''
    };

    editorStateChanged = (newEditorState: Draft.EditorState) => {
        this.setState({ editorState: newEditorState });
        this.getEntityAtCursor(newEditorState);
    }

    get contentStateData() {
        const contentState = this.state.editorState.getCurrentContent();
        const rawJson = Draft.convertToRaw(contentState);
        const jsonStr = JSON.stringify(rawJson, null, 1);
        const plainText = contentState.getPlainText();
        return {
            jsonStr,
            plainText
        };
    }

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

    render() {
        return <div>
            <div className="editor">
                <Draft.Editor
                    editorState={this.state.editorState}
                    onChange={this.editorStateChanged}
                />
            </div>
            <div className="form-horizontal col-sm-6">

                <div className="form-group">
                    <label htmlFor="data" className="control-label col-sm-6">data</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            id="data"
                            placeholder="data to save"
                            value={this.state.data}
                            onChange={e => this.setState({ data: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-group  ">
                    <label htmlFor="data" className="control-label col-sm-6">mutabilaty</label>
                    <div className="col-sm-6">
                        <select
                            className="form-control"
                            value={this.state.mutabilaty}
                            onChange={e => this.setState({ mutabilaty: e.target.value })} 
                        >
                            <option value="IMMUTABLE">IMMUTABLE</option>
                            <option value="MUTABLE">MUTABLE</option>
                            <option value="SEGMENTED">SEGMENTED</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-6 col-sm-2">
                        <button
                            className="btn btn-default"
                            onClick={() => this.setEntity(this.state.data, this.state.mutabilaty)}
                        >
                            create Entity
                        </button>
                    </div>
                </div>
                <span>retrieved Data:</span>
                <span>{this.state.retrievedData ? this.state.retrievedData : '<no data>'}</span>
            </div>
            <pre className="col-sm-6">{this.contentStateData.jsonStr}</pre>
        </div>;
    }
}  