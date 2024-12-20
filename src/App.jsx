import { Component } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";
import { generateTodos } from "./utils/generate-todos";

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      showIncomplete: false,
      searchTerm: "",
      selectedSeverities: [],
      selectedImportances: [],
    };
  }

  addItem = (name, description, severity) => {
    const newItem = {
      id: String(new Date()),
      name,
      description,
      done: false,
      createdAt: new Date().toLocaleString(),
      severity,
    };
    this.setState((prevState) => ({
      items: [newItem, ...prevState.items],
    }));
  };

  handleDeleteChange = (id) => {
    this.setState((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  };

  handleDoneChange = (id) => {
    this.setState(
      (state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item
        ),
      }),
      this.sortItem
    );
  };

  sortItem = () => {
    const sortedItems = [...this.state.items].sort((a, b) => a.done - b.done);
    this.setState({ items: sortedItems });
  };

  toggleShowIncomplete = () => {
    this.setState((prevState) => ({
      showIncomplete: !prevState.showIncomplete,
    }));
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSeverityChange = (severity) => {
    this.setState((prevState) => {
      const selectedSeverities = prevState.selectedSeverities.includes(severity)
        ? prevState.selectedSeverities.filter((s) => s !== severity)
        : [...prevState.selectedSeverities, severity];

      return { selectedSeverities };
    });
  };

  handleImportanceChange = (importance) => {
    this.setState((prevState) => {
      const selectedImportances = prevState.selectedImportances.includes(
        importance
      )
        ? prevState.selectedImportances.filter((i) => i !== importance)
        : [...prevState.selectedImportances, importance];

      return { selectedImportances };
    });
  };

  generateTasks = () => {
    const newItems = generateTodos(1000);
    this.setState({ items: newItems });
  };

  render() {
    const {
      items,
      showIncomplete,
      searchTerm,
      selectedSeverities,
      selectedImportances,
    } = this.state;

    const filteredItems = items
      .filter((item) => (showIncomplete ? !item.done : true))
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (item) =>
          selectedSeverities.length === 0 ||
          selectedSeverities.includes(item.severity)
      )
      .filter(
        (item) =>
          selectedImportances.length === 0 ||
          selectedImportances.includes(item.severity)
      );

    return (
      <main className="main__container">
        <div className="main__search">
          <input
            type="text"
            placeholder="Search..."
            onChange={this.handleSearchChange}
          />
        </div>
        <h1>To do list</h1>
        <TodoForm
          onAddItem={this.addItem}
          toggleShowIncomplete={this.toggleShowIncomplete}
          showIncomplete={this.state.showIncomplete}
          selectedSeverities={this.state.selectedSeverities}
          onSeverityChange={this.handleSeverityChange}
          onImportanceChange={this.handleImportanceChange}
        />
        <button className="generate-tasks-button" onClick={this.generateTasks}>
          Generate 1000 tasks
        </button>
        <TodoList
          items={filteredItems}
          onDoneItem={this.handleDoneChange}
          onDeleteItem={this.handleDeleteChange}
        />
        {filteredItems.length === 0 && (
          <p className="text">Nothing found matching your request</p>
        )}
      </main>
    );
  }
}

export default App;
