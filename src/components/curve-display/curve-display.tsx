import { Component, onMount, createSignal } from 'solid-js';
import styles from './curve-display.module.scss';

import Simulation from '../../display/simulation';

const CurveSelector: Component = () => {
    let simulation: Simulation | null = null;
    const [canvasID, _setCanvasID] = createSignal<string>('simulation-canvas');

    onMount(() => {
        simulation = new Simulation(canvasID());
    })

    return (
        <div class={styles.container}>
            <canvas id={canvasID()} class={styles.canvas} />
        </div>
    );
};

export default CurveSelector;