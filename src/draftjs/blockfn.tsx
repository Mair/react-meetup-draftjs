import * as React from 'react';
import * as Draft from 'draft-js';

const renderimg = (props) => {
    // get the entity
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    // get the entity data
    const {src} = entity.getData();
    const backgroundImageUrl = `url(${src})`;
    // return our custom react component
    return <div style={{ backgroundImage: backgroundImageUrl }} className="draftImg" />;
};

export class Blockfn extends React.Component<null, { editorState: Draft.EditorState, imgUrl: string }> {
    state = {
        editorState: Draft.EditorState.createEmpty(),
        imgUrl: '/docs/EditorState_2.png'
    };

    editorStateChanged = (newEditorState: Draft.EditorState) => this.setState({ editorState: newEditorState });

    insertImage = () => {
        // create an entity
        let {editorState} = this.state;
        const contentState = editorState.getCurrentContent();
        
        // set the url of the entity to the usrl chosen for the image
        const contentStateWithEntity = contentState.createEntity(
            'img',
            'IMMUTABLE',
            { src: this.state.imgUrl }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = Draft.EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        );

        // insert a new atomic block with the entity and a whit space as the text
        const newEditorStateWithBlock = Draft.AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
        this.setState({ imgUrl: '', editorState: newEditorStateWithBlock });
    }

    imageBlockFn = (contentBlock: Draft.ContentBlock) => {
        if (contentBlock.getType() === 'atomic') {
            return {
                component: renderimg,
                editable: false,
            };
        }
        return null;
    }

    render() {
        return <div>
            <div className="editor">
                <Draft.Editor
                    editorState={this.state.editorState}
                    onChange={this.editorStateChanged}
                    blockRendererFn={this.imageBlockFn}
                />
            </div>
            <input value={this.state.imgUrl} onChange={e => this.setState({ imgUrl: e.target.value })} />
            <img src={this.state.imgUrl} style={{maxWidth: 200, maxHeight: 200}} />
            <button onClick={this.insertImage} >insert image</button>
          
        </div>;
    }
}
