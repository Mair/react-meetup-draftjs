# blockfn
The block function allows you to render a block with a custom react component

In this example, an image is inserted directly into the editor.
To do this we need the following steps

1. create an atomic block with an entity

``` typescript
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
``` 

the key here is this line
``` typescript
    const newEditorStateWithBlock = Draft.AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
```

2. tell the Edit control to render blocks in a custom manner 

``` jsx
  <Draft.Editor ...   blockRendererFn={this.imageBlockFn} />
```

3. create the method called by `blockRendererFn`

``` typescript
    imageBlockFn = (contentBlock: Draft.ContentBlock) => {
        if (contentBlock.getType() === 'atomic') {
            return {
                component: renderimg,
                editable: false,
            };
        }
        return null;
    }
```
the component is a method that will return our custom react component.

``` typescript
    const renderimg = (props) => {
        // get the entity
        const entity = props.contentState.getEntity(props.block.getEntityAt(0));

        // get the entity data
        const {src} = entity.getData();
        const backgroundImageUrl = `url(${src})`;
        
        // return our custom react component
        return <div style={{ backgroundImage: backgroundImageUrl }} className="draftImg" />;
    };
```

[source](https://github.com/Mair/react-meetup-draftjs/blob/master/src/draftjs/blockfn.tsx)