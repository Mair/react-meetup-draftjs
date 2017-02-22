import * as React from 'react';
import * as Draft from 'draft-js';

interface SelectionStateViewState {
    editorState: Draft.EditorState;
    offset: number;
    endOffset: number;
}

export class SelectionStateView extends React.Component<null, Partial<SelectionStateViewState>> {
    state = {
        editorState: Draft.EditorState.createEmpty(),
        offset: 0,
        endOffset: 0
    };

    editorStateChanged = (newEditorState: Draft.EditorState) => {
        this.setState({ editorState: newEditorState });
    }

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

    render() {
        return <div>
            <div className="editor">
                <Draft.Editor
                    editorState={this.state.editorState}
                    onChange={this.editorStateChanged}
                />
            </div>

            <div className="form-horizontal col-sm-12">
                <div className="form-group">
                    <label htmlFor="data" className="control-label col-sm-6">offset</label>
                    <label htmlFor="data" className="control-label col-sm-6">{this.selectionState.offset}</label>
                </div>

                <div className="form-group">
                    <label htmlFor="data" className="control-label col-sm-6">Focus Offset</label>
                    <label htmlFor="data" className="control-label col-sm-6">{this.selectionState.focusOffset}</label>
                </div>

                <div className="form-group">
                    <label htmlFor="data" className="control-label col-sm-6">is backwards</label>
                    <label htmlFor="data" className="control-label col-sm-6">
                        {this.selectionState.isBackwards ? 'true' : 'false'}
                    </label>
                </div>
                <SetSelectionForm callback={this.setSelection} />
            </div>

        </div >;
    }
}

interface SetSelectionprops {
    callback: (offset: number, focusOffset: number) => void;
}
interface SetSelectionState {
    offset: number;
    focusOffset: number;
}

class SetSelectionForm extends React.Component<SetSelectionprops, SetSelectionState> {
    state = {
        offset: 0,
        focusOffset: 0
    };
    render() {
        return <div className="selection-form">
            <div className="form-group">
                <label htmlFor="data" className="control-label col-sm-6">offset</label>
                <div className="col-sm-6">
                    <input
                        type="number"
                        className="form-control"
                        id="data"
                        placeholder="data to save"
                        value={this.state.offset}
                        onChange={e => this.setState({ offset: Number.parseInt(e.target.value) })}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="data" className="control-label col-sm-6">end offset</label>
                <div className="col-sm-6">
                    <input
                        type="number"
                        className="form-control"
                        id="data"
                        placeholder="data to save"
                        value={this.state.focusOffset}
                        onChange={e => this.setState({ focusOffset: Number.parseInt(e.target.value) })}
                    />
                </div>
            </div>
            <button
                className="button col-sm-3 col-sm-offset-8"
                onClick={() => this.props.callback(this.state.offset, this.state.focusOffset)}
            >
                set selection state
            </button>
        </div>;
    }
}
