import { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.item.done !== nextProps.item.done ||
      this.props.item.name !== nextProps.item.name ||
      this.props.item.description !== nextProps.item.description
    );
  }

  render() {
    const { item, onDoneItem, onDeleteItem } = this.props;

    return (
      <li>
        <input
          type="checkbox"
          id={`completeTask-${item.id}`}
          checked={item.done}
          onChange={() => onDoneItem(item.id)}
        />
        <label htmlFor={`completeTask-${item.id}`}>
          <span className="checkbox"></span>
        </label>
        <div>
          <p
            className="title"
            style={{ textDecoration: item.done ? "line-through" : "none" }}
          >
            {item.name}
          </p>
          <p
            className="description"
            style={{ textDecoration: item.done ? "line-through" : "none" }}
          >
            {item.description}
          </p>
          <p className="severity">Severity: {item.severity}</p>
        </div>
        <p className="time">
          {item.createdAt ? ` ${item.createdAt}` : "No time specified"}
        </p>
        <button
          className="button__delete"
          onClick={() => onDeleteItem(item.id)}
        >
          Delete
        </button>
      </li>
    );
  }
}

export default Todo;
