//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false
        }
    }

    render() { return (
        <div>
        	<li>
        		<i className = "check glyphicon glyphicon-check" onClick = {(e) => toggleDone(e)}></i>
        		<span contentEditable = "true" done = "false"> {this.props.text} </span> 
        		<i className = "destroy glyphicon glyphicon-remove"  onClick = {() => this.props.remove()}></i>
        	</li>
        </div>
    )}
}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
    }

    addTodo() {
        // IMPLEMENT ME!
        const text = document.getElementById("newTODO").value
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text}
            ]
        })
    }

    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }

    render() { return (
        <div>
        	<input id = "newTODO" type = "text" placeholder = "To do"></input>
            <button onClick = {() => this.addTodo()}>Add Item</button>
            <span className="submit">
                <a href="https://webdev-rice.herokuapp.com" target="_blank">Submit your exercise</a>
            </span>
            <ul className="todo">
                {this.state.todoItems.map((x) => <ToDoItem text={x.text} remove={() => this.removeTodo(x.id)}/>)}
            </ul>
        </div>
        
        // Hint: <input ... ref={ (node) => this.... = node } />
        /*
        h("div", { },
            h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
            h("button", { onClick: addItem }, "Add Item"),
            h("span", { className: "submit" }, [
                h("a", { href: "https://webdev-rice.herokuapp.com",
                     target: "_blank" }, "Submit your exercise"),
            ]),
            h("ul", { className: "todo" }, listItems)
        )
        */
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()

function getSpanSibling(e) {
    const children = e.target.parentElement.children
    for (let c in children) {
        if (children[c].tagName == "SPAN") {
            return children[c]
        }
    }
    return undefined
}

function toggleDone(e) {
    const el = getSpanSibling(e)
    const done = el.getAttribute('done') == 'false'
    el.setAttribute('done', done)
    el.className = done ? "completed" : ""
}

