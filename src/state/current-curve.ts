import { createSignal} from 'solid-js';
import { CurveType } from '../types/curve-type';

export const [selectedCurve, setSelectedCurve] = createSignal<CurveType>(CurveType.LINEAR);