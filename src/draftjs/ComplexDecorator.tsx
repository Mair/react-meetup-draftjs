import * as React from 'react';
import * as Draft from 'draft-js';

interface ComplexDecoratorState {
    editorState: Draft.EditorState;
}

export class ComplexDecorator extends React.Component<null, ComplexDecoratorState> {

    constructor(props: any) {
        super(props);

        const stockItemStratergy = (block: Draft.ContentBlock, callback: (start: number, end: number) => void) => {
            block
                .findEntityRanges(
                val => {
                    const entityKey = val.getEntity();
                    if (!entityKey) { return false; }
                    const contentState = this.state.editorState.getCurrentContent();
                    return contentState.getEntity(entityKey).getType() === 'stockItem';
                },
                (start, end) => callback(start, end));

            const text = block.getText();
            let result: RegExpExecArray;
            let regex = /(^|\s)stock:\w+/g;
            while ((result = regex.exec(text) as RegExpExecArray) != null) {
                let start = result.index;
                let end = start + result[0].length;
                callback(start, end);
            }
        };

        // tslint:disable-next-line:no-shadowed-variable
        const stockItemComponent = (props: { decoratedText: string, entityKey: string, children: any }) => {
            if (props.entityKey) {
                var currentContent = this.state.editorState.getCurrentContent();
                const instance = currentContent.getEntity(props.entityKey);
                const data = instance.getData() as StockItemDef;
                return <EntityStock stockItem={data}>
                    {props.children}
                </EntityStock>;
            }
            const stockName = props.decoratedText.replace(' stock:', '');
            return <StockSuggestion stockSuggestion={stockName} stockClicked={this.stockItemClicked}>
                {props.children}
            </StockSuggestion>;
        };

        const compositeDecorator = new Draft.CompositeDecorator([
            {
                strategy: stockItemStratergy,
                component: stockItemComponent
            }
        ]);

        this.state = { editorState: Draft.EditorState.createEmpty(compositeDecorator) };

    }

    stockItemClicked = (stockItem: StockItemDef) => {
        const selectionState = this.state.editorState.getSelection();
        var anchorKey = selectionState.getAnchorKey();
        var currentContent = this.state.editorState.getCurrentContent();
        var currentContentBlock = currentContent.getBlockForKey(anchorKey);
        const text = currentContentBlock.getText();
        const start = text.search('(^| )stock:') + 1;
        const tmpStr = text.substring(start, text.length);
        let end = tmpStr.search('($| )');
        end = end + start;

        const partialSelection = selectionState.merge({
            anchorOffset: start,
            focusOffset: end,
        }) as Draft.SelectionState;

        const contentStateWithEntity = currentContent.createEntity('stockItem', 'IMMUTABLE', stockItem);
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        const newContnentState = Draft.Modifier.replaceText(
            contentStateWithEntity, partialSelection, stockItem.name, undefined, entityKey);
        const newEditorState = Draft.EditorState.push(
            this.state.editorState,
            newContnentState, 'insert-characters'
        );
        const editorStateToUpdate = Draft.EditorState.forceSelection(
            newEditorState, newContnentState.getSelectionAfter());

        this.setState({ editorState: editorStateToUpdate });
    }

    editorStateChanged = newEditorState => this.setState({ editorState: newEditorState });

    render() {
        return <div className="editor">
            <Draft.Editor
                editorState={this.state.editorState}
                onChange={this.editorStateChanged}
            />
        </div>;
    }
}

interface StockSuggestionProps {
    stockSuggestion: string;
    stockClicked: (stock: StockItemDef) => void;
}

interface StockSuggestionState {
    stockItems: StockItemDef[];
    isOpened: boolean;
}

export class StockSuggestion extends React.Component<StockSuggestionProps, StockSuggestionState> {
    state = { stockItems: Array<StockItemDef>(), isOpened: false };

    componentDidMount = () => {
        this.GetStockSugestions(this.props.stockSuggestion);
    }

    componentWillReceiveProps = (nextProp: StockSuggestionProps) => {
        if (nextProp.stockSuggestion !== this.props.stockSuggestion) {
            this.GetStockSugestions(nextProp.stockSuggestion);
        }
    }

    async GetStockSugestions(sugestion: string) {
        const items = await getStocksItemByName(sugestion);
        if (items.length > 0) { this.state.isOpened = true; }
        this.setState({ stockItems: items });
    }

    stockClicked = (stock: StockItemDef) => {
        this.setState({ isOpened: false });
        this.props.stockClicked(stock);
    }

    render() {
        let {stockItems} = this.state;
        return <span>
            <span>{this.props.children}</span>
            {stockItems.length > 0 && this.state.isOpened && <div className="stockItems">
                <ul contentEditable={false}>
                    {stockItems.map(s => <li onClick={() => this.stockClicked(s)} key={s.id}><StockItem {...s} /></li>)}
                </ul>
            </div>}
        </span>;
    }
}

const StockItem = (props: StockItemDef) => <div className="stockDetail">
    <div><strong>{props.name}</strong></div>
    <div>Category: {props.description}</div>
    <div>Quantity: {props.stockQuantaty}</div>
    <div>Contact: {props.SupplierContact}</div>
</div>;


class EntityStock extends React.Component<{ stockItem: StockItemDef }, { hovering: boolean }> {

    state = { hovering: false }
    render() {
        return <span>
            <span
                className="stockItem"
                onMouseEnter={() => this.setState({ hovering: true })}
                onMouseLeave={() => this.setState({ hovering: false })}
            >{this.props.children}
            </span>
            {
                this.state.hovering && <div className="stockItemHover">
                    <StockItem {...this.props.stockItem} />
                </div>
            }
        </span>;
    }
}

const getStocksItemByName = (name: string) => {
    return new Promise<StockItemDef[]>(resolve => {
        setTimeout(
            () => {
                const items = stockItems.filter(s => s.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
                resolve(items);
            },
            200);
    });
};

interface StockItemDef {
    name: string;
    description: string;
    id: number;
    stockQuantaty: number;
    company: string;
    SupplierContact: string;
}
const stockItems = [
    {
        name: 'salt',
        description: 'condiment',
        id: 1234,
        stockQuantaty: 10,
        company: 'Swan',
        SupplierContact: '040424553'
    },
    {
        name: 'bread',
        description: 'general',
        id: 1238,
        stockQuantaty: 9,
        company: 'Lila',
        SupplierContact: '040424553'
    },
    {
        name: 'Weet-Bix',
        description: 'breakfast cereal',
        id: 1237,
        stockQuantaty: 8,
        company: 'Sanitarium',
        SupplierContact: '040424553'
    },
    {
        name: 'eggs',
        description: 'breakfast',
        id: 1236,
        stockQuantaty: 7,
        company: 'Ms Chicken',
        SupplierContact: '040424553'
    },
    {
        name: 'Pie',
        description: 'pastry',
        id: 1235,
        stockQuantaty: 6,
        company: 'Get Phat',
        SupplierContact: '040424553'
    },

];