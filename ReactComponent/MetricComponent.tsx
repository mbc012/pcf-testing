import * as React from 'react';
import {IInputs} from "./generated/ManifestTypes";


// TODO: Add support for string values, other than numbers.
export interface IMiniMetricProps {
    label: string;
    value: number;
    change: number | null;
}

export const MiniMetric = (props: IMiniMetricProps) => {
    const {
        label,
        value,
        change
    } = props;

    return (
        <React.Fragment>
            <div className="bg-white border border-gray-800 p-3">
                <div className="flex justify-between items-baseline">
                    <span className="text-xs font-mono text-black p-1">{label}</span>
                    {change !== null &&
                        (<span className={`p-1 text-xs font-mono ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                        </span>)
                    }
                </div>
                <div className="text-lg font-mono font-bold text-green-400 p-1">
                    {typeof value === 'number' ? value.toFixed(2) : value}
                </div>
            </div>
        </React.Fragment>
    )
}