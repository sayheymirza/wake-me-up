import React, { useState } from 'react';
import { Action, generate, Question } from '../core/question';
import './App.scss';
import { Item } from './Item';

function App() {
  const [count, setCount] = useState<number>(10);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10);
  const [actions, setActions] = useState<Action[]>(['+', '-']);
  const [items, setItems] = useState<Question[]>(generate(actions, min, max, count));

  const toggleActions = (value: Action) => {
    let index = actions.indexOf(value);
    let copy = [...actions];
    if (index === -1) {
      copy.push(value);
      setActions(copy);
    } else {
      copy.splice(index, 1);
      setActions(copy);
    }
    setItems(generate(copy, min, max, count));
  }

  const hasAction = (value: Action): boolean => {
    return actions.includes(value);
  }

  return (
    <main>
      <header>
        <h3>Wake me up</h3>
      </header>
      <section className="settings">
        <label htmlFor="count">Count </label>
        <input id="count" type="number" value={count} min="0" placeholder="Count" onChange={(input) => { setCount(parseInt(input.target.value)); setItems(generate(actions, min, max, parseInt(input.target.value))); }} />
        &nbsp;&nbsp;
        <label htmlFor="min">Min number </label>
        <input id="min" type="number" value={min} max={max} placeholder="Min number" onChange={(input) => { setMin(parseInt(input.target.value)); setItems(generate(actions, parseInt(input.target.value), max, count)); }} />
        &nbsp;&nbsp;
        <label htmlFor="max">Max number </label>
        <input id="max" type="number" value={max} min={min} placeholder="Max number" onChange={(input) => { setMax(parseInt(input.target.value)); setItems(generate(actions, min, parseInt(input.target.value), count)); }} />
        &nbsp;&nbsp;
        <label htmlFor="actions">Actions</label>
        {
          (['+', '-', '*', '/'] as Action[]).map((action: Action, index) => {
            return (
              <span key={index}>
                <input type="checkbox" name="action" checked={hasAction(action)} onChange={() => toggleActions(action)} />
                {action}
              </span>
            )
          })
        }
      </section>
      <br />
      <div className="items">
        {
          items.map((item, index) => <Item key={index} question={item.question} answer={item.answer} />)
        }
      </div>
    </main>
  );
}

export default App;
