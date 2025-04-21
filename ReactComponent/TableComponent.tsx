import * as React from 'react';

export const AGGREGATORS = {
    count:    (vals: any[]) => vals.length,
    distinct: (vals: any[]) => new Set(vals).size,
    sum:      (vals: any[]) => vals.reduce((a, x) => a + toNumber(x), 0),
    avg:      (vals: any[]) => vals.length > 0 ? vals.reduce((a, x) => a + toNumber(x), 0) / vals.length : 0,
    min:      (vals: any[]) => vals.length > 0 ? Math.min(...vals.map(toNumber)) : 0,
    max:      (vals: any[]) => vals.length > 0 ? Math.max(...vals.map(toNumber)) : 0,
};
type AggregatorName = keyof typeof AGGREGATORS;

const toNumber = (v: any) => (typeof v === 'number' ? v : parseFloat(v) || 0);


export interface ITableProps {
    columns: {
        order?: number; // optional - set order of table elements
        key: string; // dataset key for each column
        label: string; // display name for each column
    }[],
    data: any[]
    colors?: {
        backgroundColor?: string;
        headerColor?: string;
        pivotTotalColor?: string;
    },
    pivot?: boolean
}

export const Table = (props: ITableProps) => {
    const {
        columns,
        data
    } = props;

    const {
        backgroundColor = "bg-white",
        headerColor = "bg-black",
        pivotTotalColor = "last:bg-gray-500"
    } = props.colors || {};

    let isPivot = props.pivot || false;

    // Sort columns by order property if it exists
    const sortedColumns = [...columns].sort((a, b) => {
        // If both columns have order property, sort by order
        if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
        }

        // If only one column has order, prioritize the one with order
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;

        // If neither has order, maintain original array order
        return 0;
    });

    const formatNumber = (value: number) => {
        return Intl.NumberFormat('en-AU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    return (
        <React.Fragment>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className={headerColor}>
                    <tr>
                        {sortedColumns.map((column) => (
                            <th
                                key={column.key}
                                className="px-2 py-1 text-left text-xs font-mono text-white uppercase"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                    {data.map((row, i) => ( //                                        EACH ROW
                        <tr key={i} className={(isPivot ? `${pivotTotalColor} last:font-bold ` : "") + "text-black"}>
                            {sortedColumns.map((column) => ( //             EACH COLUMN
                                <td key={column.key} className={(isPivot ? `${pivotTotalColor} last:font-bold ` : "") + "px-2 py-1 whitespace-nowrap text-xs font-mono"}>
                                    <span className="">
                                        {typeof row[column.key] === 'number' ? formatNumber(row[column.key]) : row[column.key]}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
};

export interface PivotTableProps<T> {
    data: T[];
    /** one or more fields to group into rows */
    rowKeys: (keyof T)[];
    /** one or more fields to group into columns */
    colKeys: (keyof T)[];
    /** field whose value gets aggregated */
    valueKey: keyof T;
    /** which aggregator to use */
    aggregator: AggregatorName;
}


export function createPivotTable<T>(
    opts: PivotTableProps<T>
): ITableProps {
    const { data, rowKeys, colKeys, valueKey, aggregator } = opts;
    const aggFn = AGGREGATORS[aggregator];

    // helper to serialize a tuple of keys into a string
    const mkKey = (arr: any[]) => JSON.stringify(arr);

    // collect unique row‑tuples in insertion order
    const rowOrder: string[] = [];
    const rowsMap = new Map<string, T[]>();
    data.forEach(item => {
        const rk = rowKeys.map(k => item[k]);
        const rkKey = mkKey(rk);
        if (!rowsMap.has(rkKey)) {
            rowsMap.set(rkKey, []);
            rowOrder.push(rkKey);
        }
        rowsMap.get(rkKey)!.push(item);
    });

    // collect unique column‑tuples
    const colOrder: string[] = [];
    const colsSet = new Set<string>();
    data.forEach(item => {
        const ck = colKeys.map(k => item[k]);
        const ckKey = mkKey(ck);
        if (!colsSet.has(ckKey)) {
            colsSet.add(ckKey);
            colOrder.push(ckKey);
        }
    });

    // build the Table columns: row fields, each pivot column, then Total
    const tableColumns = [
        ...rowKeys.map((rk, i) => ({
            key: rk as string,
            label: rk as string,
            order: i
        })),
        ...colOrder.map((colKey, i) => ({
            key: colKey,
            label: JSON.parse(colKey).join(' – '),
            order: rowKeys.length + i
        })),
        {
            key: 'Total',
            label: 'Total',
            order: rowKeys.length + colOrder.length
        }
    ];

    // build each data‑row
    const tableData = rowOrder.map(rkKey => {
        const group = rowsMap.get(rkKey)!;
        const rowTuple = JSON.parse(rkKey) as any[];

        const rowObj: Record<string, any> = {};
        rowKeys.forEach((rk, i) => {
            rowObj[rk as string] = rowTuple[i];
        });

        // for each pivot column, aggregate
        let rowAllValues: any[] = [];
        colOrder.forEach(colKey => {
            const colTuple = JSON.parse(colKey) as any[];
            const cellItems = group.filter(item =>
                colKeys.every((ck, j) => item[ck] === colTuple[j])
            );
            const vals = cellItems.map(i => i[valueKey]);
            rowAllValues.push(...vals);
            rowObj[colKey] = aggFn(vals);
        });

        // row total
        rowObj['Total'] = aggFn(rowAllValues);
        return rowObj;
    });

    // add the Totals row
    const totalRow: Record<string, any> = {};
    rowKeys.forEach(rk => {
        totalRow[rk as string] = 'Total';
    });

    // compute each column total across all rows
    let grandValues: any[] = [];
    colOrder.forEach(colKey => {
        // gather all values for this column
        const vals = data
            .filter(item => {
                const colTuple = JSON.parse(colKey) as any[];
                return colKeys.every((ck, j) => item[ck] === colTuple[j]);
            })
            .map(i => i[valueKey]);
        totalRow[colKey] = aggFn(vals);
        grandValues.push(...vals);
    });

    // grand total
    totalRow['Total'] = aggFn(grandValues);
    tableData.push(totalRow);

    return {
        columns: tableColumns,
        data: tableData
    };
}



const exampleData = [
    { ticker: 'MSFT', contribution: 0.82, weight: 41211.54, benchmark: 3.2, sector: "TECH" },
    { ticker: 'AAPL', contribution: 0.65, weight: 30034.83, benchmark: 3.1, sector: "STORE" },
    { ticker: 'AMZN', contribution: 0.53, weight: 20590.91, benchmark: 2.2, sector: "STORE" },
    { ticker: 'GOOGL', contribution: 0.48, weight: 21324.76, benchmark: 2.1, sector: "TECH" },
    { ticker: 'META', contribution: 0.41, weight: 98542.92, benchmark: 1.7, sector: "TECH" },
];


export const testData = [
    { region: 'North',  product: 'Widget',    channel: 'Online', year: 2023, sales: 3557.71, units:  16, discount: 0.15 },
    { region: 'North',  product: 'Widget',    channel: 'Online', year: 2024, sales: 1979.57, units:  45, discount: 0.15 },
    { region: 'North',  product: 'Widget',    channel: 'Retail', year: 2023, sales: 3706.80, units: 149, discount: 0.02 },
    { region: 'North',  product: 'Widget',    channel: 'Retail', year: 2024, sales: 2687.69, units:  17, discount: 0.02 },
    { region: 'North',  product: 'Gadget',    channel: 'Online', year: 2023, sales: 1930.64, units: 164, discount: 0.01 },
    { region: 'North',  product: 'Gadget',    channel: 'Online', year: 2024, sales: 1795.35, units: 176, discount: 0.14 },
    { region: 'North',  product: 'Gadget',    channel: 'Retail', year: 2023, sales: 2678.08, units: 124, discount: 0.12 },
    { region: 'North',  product: 'Gadget',    channel: 'Retail', year: 2024, sales: 4237.72, units:  11, discount: 0.15 },
    { region: 'North',  product: 'Doohickey', channel: 'Online', year: 2023, sales: 1638.64, units: 118, discount: 0.07 },
    { region: 'North',  product: 'Doohickey', channel: 'Online', year: 2024, sales: 1621.92, units:  96, discount: 0.02 },
    { region: 'North',  product: 'Doohickey', channel: 'Retail', year: 2023, sales: 2519.71, units: 101, discount: 0.17 },
    { region: 'North',  product: 'Doohickey', channel: 'Retail', year: 2024, sales: 3414.90, units:  21, discount: 0.15 },
    { region: 'South',  product: 'Widget',    channel: 'Online', year: 2023, sales: 3144.91, units: 106, discount: 0.02 },
    { region: 'South',  product: 'Widget',    channel: 'Online', year: 2024, sales: 2172.71, units: 170, discount: 0.12 },
    { region: 'South',  product: 'Widget',    channel: 'Retail', year: 2023, sales: 4446.83, units: 157, discount: 0.04 },
    { region: 'South',  product: 'Widget',    channel: 'Retail', year: 2024, sales: 1278.22, units: 179, discount: 0.05 },
    { region: 'South',  product: 'Gadget',    channel: 'Online', year: 2023, sales: 2157.55, units:  30, discount: 0.17 },
    { region: 'South',  product: 'Gadget',    channel: 'Online', year: 2024, sales: 4465.93, units: 107, discount: 0.06 },
    { region: 'South',  product: 'Gadget',    channel: 'Retail', year: 2023, sales: 3542.74, units: 103, discount: 0.03 },
    { region: 'South',  product: 'Gadget',    channel: 'Retail', year: 2024, sales: 2421.08, units: 181, discount: 0.05 },
    { region: 'South',  product: 'Doohickey', channel: 'Online', year: 2023, sales: 4746.62, units: 175, discount: 0.01 },
    { region: 'South',  product: 'Doohickey', channel: 'Online', year: 2024, sales: 3539.91, units: 146, discount: 0.15 },
    { region: 'South',  product: 'Doohickey', channel: 'Retail', year: 2023, sales: 1653.61, units: 107, discount: 0.05 },
    { region: 'South',  product: 'Doohickey', channel: 'Retail', year: 2024, sales: 4701.56, units: 186, discount: 0.11 },
];


export const TestTable = (context: any) => {
    const tableProps: ITableProps = {
        columns: [
            { order: 1, key: 'ticker', label: 'TICKER' },
            { order: 2, key: 'contribution', label: 'CONTRIB' },
            { order: 3, key: 'weight', label: 'WEIGHT' }
        ],
        data: exampleData,
    };

    return (
        <React.Fragment>
            <Table {...tableProps} />
        </React.Fragment>
    );
}


export const TestPivotTable = () => {
    const pivot = createPivotTable({
        data: testData,
        rowKeys: ['region'],
        colKeys: ['product'],
        valueKey: 'units',
        aggregator: 'sum'
    });

    const props: ITableProps = {
        columns: pivot.columns,
        data: pivot.data,
        pivot: true,
    }

    return (
        <React.Fragment>
            <Table columns={props.columns} data={props.data} pivot={props.pivot} />
        </React.Fragment>
    )
}


export const TestView = () => {
    return (
        <React.Fragment>
            <TestTable />
            <div>----------------------</div>
            <TestPivotTable />
        </React.Fragment>
    );
}
