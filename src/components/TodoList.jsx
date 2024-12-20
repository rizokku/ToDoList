import { Component } from "react";
import Todo from "./Todo";

class TodoList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.items.length !== nextProps.items.length ||
      this.props.items.some(
        (item, index) =>
          item.done !== nextProps.items[index].done ||
          item.name !== nextProps.items[index].name ||
          item.description !== nextProps.items[index].description
      )
    );
  }

  render() {
    const { items, onDoneItem, onDeleteItem } = this.props;

    return (
      <ul className="main__container-items">
        {items.length > 0 ? (
          items.map((item) => (
            <Todo
              key={item.id}
              item={item}
              onDoneItem={onDoneItem}
              onDeleteItem={onDeleteItem}
            />
          ))
        ) : (
          <div>No tasks</div>
        )}
      </ul>
    );
  }
}

export default TodoList;
