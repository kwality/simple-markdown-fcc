import React, {Component} from 'react';
import './app.css';
const renderer = new marked.Renderer();

const createMarkdown = (value) =>{
  //This makes links open into a new tab
  renderer.link = (href, title, text) => {
    return '<a target="_blank" href="'+ href + '" title="' + title +'"">' + text +'</a>'
  }
  return {__html: marked(value, {renderer: renderer,breaks: true})}
}

const TextField = ({value}) => {
  return (
      <div>
        <div className="well" id="preview" dangerouslySetInnerHTML={createMarkdown(value)}></div>
      </div>
    )
}

const TextEditor = ({value, onChange}) =>{
  return (
        <div>
            <textarea rows="25"className="form-control" id="editor" placeholder="Enter your Markdown" value={value} onChange={onChange}></textarea>
        </div>
    )
}


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: testerText
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);

  }
  handleChange(event){
    this.setState({
      value: event.target.value
    });
  }

  handleClear(event){
    this.setState({
      value: ''
    });
  }

  render() {
    const {value} = this.state
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Markdown Previewer</a>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
              <button type="button" className="btn btn-danger pull-right clearBtn" onClick={this.handleClear}>Clear</button>
              <TextEditor value={this.state.value} onChange={this.handleChange}/>
            </div>
            <div className="col-xs-6">
              <TextField value={this.state.value} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const testerText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.
<h1>Hello World</h1>
There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

