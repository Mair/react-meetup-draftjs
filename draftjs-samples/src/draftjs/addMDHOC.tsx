import * as React from 'react';
import * as MarkDown from 'react-remarkable';
import * as hljs from 'highlight.js';

var mdOptions = {
    // tslint:disable-next-line:typedef
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
                // tslint:disable-next-line:no-empty
            } catch (err) { }
        }

        try {
            return hljs.highlightAuto(str).value;
            // tslint:disable-next-line:no-empty
        } catch (err) { }

        return ''; // use external default escaping
    }
};

// tslint:disable-next-line:no-any
const addMDHOC = (WrappedComponent: React.ComponentClass<any>, documentUrl: string) => {
    // tslint:disable-next-line:no-any
    return class addMDHOCComponent extends React.Component<any, { doctxt: string }> {
        state = { doctxt: '' };

        componentDidMount() {
            this.getDoc();
        }

        async getDoc() {
            let responce = await fetch(documentUrl);
            let doctxtresponce = await responce.text();
            this.setState({ doctxt: doctxtresponce });
        }

        render() {
            return <div>
                <WrappedComponent {...this.props} />
                <hr />
                <MarkDown source={this.state.doctxt} options={mdOptions} />
            </div>;
        }
    };
};

export { addMDHOC }