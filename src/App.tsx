import type { Component } from 'solid-js';

import CurveSelector from './components/curve-selector/curve-selector';
import CurveDisplay from './components/curve-display/curve-display';

import styles from './App.module.scss';

const App: Component = () => {
    return (
        <div class={styles.App}>
            <div class={styles.sidebar}><CurveSelector></CurveSelector></div>
            <div class={styles.main}><CurveDisplay></CurveDisplay></div>
        </div>
    );
};

export default App;
