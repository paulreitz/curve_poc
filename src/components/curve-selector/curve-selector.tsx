import { Component, For } from 'solid-js';
import { CurveType } from '../../types/curve-type';
import { selectedCurve, setSelectedCurve } from '../../state/current-curve';
import styles from './curve-selector.module.scss';

const CurveSelector: Component = () => {
  const curveOptions = [
    { type: CurveType.LINEAR, label: 'Linear' },
    { type: CurveType.EASE_OUT, label: 'Ease Out' },
    { type: CurveType.EASE_IN, label: 'Ease In' },
    { type: CurveType.EASE_IN_OUT, label: 'Ease In-Out' }
  ];

  const handleCurveChange = (curve: CurveType) => {
    setSelectedCurve(curve);
  };

  return (
    <div class={styles.container}>
      <h2>Select Animation Curve</h2>
      
      <div class={styles.radioGroup}>
        <For each={curveOptions}>
          {(option) => (
            <div class={styles.radioItem}>
              <input 
                type="radio" 
                id={`curve-${option.type}`} 
                name="curve" 
                value={option.type}
                checked={selectedCurve() === option.type}
                onChange={() => handleCurveChange(option.type)}
              />
              <label for={`curve-${option.type}`}>{option.label}</label>
            </div>
          )}
        </For>
      </div>
      
      <div class={styles.currentSelection}>
        Current: <span>{selectedCurve()}</span>
      </div>
    </div>
  );
};

export default CurveSelector;