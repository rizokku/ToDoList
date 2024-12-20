import { Component } from "react";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      descriptionText: "",
      severity: "low",
      error: false,
    };
  }

  handleChangeInput = (e) => {
    this.setState({ inputText: e.target.value });
  };

  handleChangeDescription = (e) => {
    this.setState({ descriptionText: e.target.value });
  };

  handleChangeSeverity = (e) => {
    this.setState({ severity: e.target.value });
  };

  addItem = () => {
    const { inputText, descriptionText, severity } = this.state;
    const trimmedInputText = inputText.trim();

    if (!trimmedInputText) {
      this.setState({ error: "Title cannot be empty!" });
      return;
    }

    this.props.onAddItem(trimmedInputText, descriptionText, severity);
    this.setState({
      inputText: "",
      descriptionText: "",
      severity: "low",
      error: false,
    });
  };

  render() {
    const severities = ["low", "middle", "high"];
    const importances = ["low", "middle", "high"];

    return (
      <section className="main__section-inputs">
        <input
          placeholder="Add task"
          type="text"
          value={this.state.inputText}
          onChange={this.handleChangeInput}
        />
        <textarea
          value={this.state.descriptionText}
          onChange={this.handleChangeDescription}
          placeholder="Add a description"
        />
        <div className="severities">
          {severities?.length > 0 &&
            severities.map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  value={level}
                  checked={this.state.severity === level}
                  onChange={this.handleChangeSeverity}
                />
                {level}
              </label>
            ))}
        </div>
        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}
        <button onClick={this.addItem}>Add</button>
        <button onClick={this.props.toggleShowIncomplete}>
          {this.props.showIncomplete ? "Show all" : "Show uncomplete"}
        </button>

        <div className="importance-filter">
          <div className="importance-header">
            <h3 style={{ color: "whitesmoke" }}>Importance:</h3>
          </div>
          <div className="importance-checkboxes">
            {importances?.length > 0 &&
              importances.map((importance) => (
                <div key={importance} className="importance-item">
                  <input
                    type="checkbox"
                    id={`importance-${importance}`}
                    value={importance}
                    className="importance-checkbox"
                    onChange={() => this.props.onImportanceChange(importance)}
                  />
                  <label
                    htmlFor={`importance-${importance}`}
                    className="importance-label"
                  >
                    {importance}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  }
}

export default TodoForm;
