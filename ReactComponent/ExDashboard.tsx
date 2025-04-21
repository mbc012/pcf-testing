import * as React from 'react';
import {createPivotTable, ITableProps, Table} from './TableComponent'

export const SummaryData = () => {
    const summaryData: any[] = [
        { action: "buy",  metric: "No. lines", value:  8 },
        { action: "buy",  metric: "No. lines", value:  2 },
        { action: "sell", metric: "No. lines", value:  3 },

        { action: "buy",  metric: "shares",     value: 120 },
        { action: "sell", metric: "shares",     value:  80 },
        { action: "sell", metric: "shares",     value:  20 },

        { action: "buy",  metric: "value",      value: 2400 },
        { action: "buy",  metric: "value",      value: 1000 },
        { action: "sell", metric: "value",      value: 1800 },
        { action: "sell", metric: "value",      value:  750 },
    ];

    const summaryTableProps = createPivotTable({
        data: summaryData,
        rowKeys:   ["metric"],
        colKeys:   ["action"],
        valueKey:  "value",
        aggregator:"sum",
    });

    return (
        <>
            <Table
                {...summaryTableProps}
                pivot
                colors={{ pivotTotalColor: "last:bg-gray-500" }}
            />
        </>
    )
}


export const SectorSkews = () => {
    const sectorSkewsData = [
        { Sector: 'Comm Services',       SkewType: 'Buy Values',  Value: 12500 },
        { Sector: 'Comm Services',       SkewType: 'Sell values', Value:  8000 },
        { Sector: 'Comm Services',       SkewType: 'NET',         Value:  4500 },

        { Sector: 'Consumer Discrention',SkewType: 'Buy Values',  Value: 17500 },
        { Sector: 'Consumer Discrention',SkewType: 'Sell values', Value: 13000 },
        { Sector: 'Consumer Discrention',SkewType: 'NET',         Value:  4500 },

        { Sector: 'Consumer Staples',    SkewType: 'Buy Values',  Value: 11000 },
        { Sector: 'Consumer Staples',    SkewType: 'Sell values', Value:  9000 },
        { Sector: 'Consumer Staples',    SkewType: 'NET',         Value:  2000 },

        { Sector: 'Energy',              SkewType: 'Buy Values',  Value: 14500 },
        { Sector: 'Energy',              SkewType: 'Sell values', Value: 12000 },
        { Sector: 'Energy',              SkewType: 'NET',         Value:  2500 },

        { Sector: 'Financials',          SkewType: 'Buy Values',  Value: 15500 },
        { Sector: 'Financials',          SkewType: 'Sell values', Value: 10000 },
        { Sector: 'Financials',          SkewType: 'NET',         Value:  5500 },

        { Sector: 'Health Care',         SkewType: 'Buy Values',  Value: 16000 },
        { Sector: 'Health Care',         SkewType: 'Sell values', Value: 14000 },
        { Sector: 'Health Care',         SkewType: 'NET',         Value:  2000 },

        { Sector: 'Industry',            SkewType: 'Buy Values',  Value: 13000 },
        { Sector: 'Industry',            SkewType: 'Sell values', Value:  7000 },
        { Sector: 'Industry',            SkewType: 'NET',         Value:  6000 },

        { Sector: 'Materials',           SkewType: 'Buy Values',  Value: 14000 },
        { Sector: 'Materials',           SkewType: 'Sell values', Value: 11000 },
        { Sector: 'Materials',           SkewType: 'NET',         Value:  3000 },

        { Sector: 'Real Estate',         SkewType: 'Buy Values',  Value: 12000 },
        { Sector: 'Real Estate',         SkewType: 'Sell values', Value:  9500 },
        { Sector: 'Real Estate',         SkewType: 'NET',         Value:  2500 },

        { Sector: 'Utilities',           SkewType: 'Buy Values',  Value: 10000 },
        { Sector: 'Utilities',           SkewType: 'Sell values', Value:  8000 },
        { Sector: 'Utilities',           SkewType: 'NET',         Value:  2000 },
    ];

    const sectorSkewProps = createPivotTable({
        data:       sectorSkewsData,
        rowKeys:    ['Sector'],
        colKeys:    ['SkewType'],
        valueKey:   'Value',
        aggregator: 'sum'
    });

    return (
        <>
            <Table {...sectorSkewProps} pivot />
        </>
    )
}


export const CompletionProfile = () => {
    const completionProfileData: any[] = [
        // D1
        { stage: 'D1',  metric: 'Buys Done Val',  value: 100 },
        { stage: 'D1',  metric: 'Sells Done Val', value: 80  },
        { stage: 'D1',  metric: 'Buys Resid Val',  value: 20  },
        { stage: 'D1',  metric: 'Sells Resid Val',value: 15  },
        { stage: 'D1',  metric: 'Total Buys',      value: 120 },
        { stage: 'D1',  metric: 'Total Sells',     value: 95  },
        { stage: 'D1',  metric: 'Grand Total',     value: 215 },
        // D2
        { stage: 'D2',  metric: 'Buys Done Val',  value: 90  },
        { stage: 'D2',  metric: 'Sells Done Val', value: 75  },
        { stage: 'D2',  metric: 'Buys Resid Val',  value: 15  },
        { stage: 'D2',  metric: 'Sells Resid Val',value: 10  },
        { stage: 'D2',  metric: 'Total Buys',      value: 105 },
        { stage: 'D2',  metric: 'Total Sells',     value: 85  },
        { stage: 'D2',  metric: 'Grand Total',     value: 190 },
        // D3
        { stage: 'D3',  metric: 'Buys Done Val',  value: 120 },
        { stage: 'D3',  metric: 'Sells Done Val', value: 95  },
        { stage: 'D3',  metric: 'Buys Resid Val',  value: 30  },
        { stage: 'D3',  metric: 'Sells Resid Val',value: 25  },
        { stage: 'D3',  metric: 'Total Buys',      value: 150 },
        { stage: 'D3',  metric: 'Total Sells',     value: 120 },
        { stage: 'D3',  metric: 'Grand Total',     value: 270 },
        // D4
        { stage: 'D4',  metric: 'Buys Done Val',  value: 110 },
        { stage: 'D4',  metric: 'Sells Done Val', value: 85  },
        { stage: 'D4',  metric: 'Buys Resid Val',  value: 22  },
        { stage: 'D4',  metric: 'Sells Resid Val',value: 18  },
        { stage: 'D4',  metric: 'Total Buys',      value: 132 },
        { stage: 'D4',  metric: 'Total Sells',     value: 103 },
        { stage: 'D4',  metric: 'Grand Total',     value: 235 },
        // D5
        { stage: 'D5',  metric: 'Buys Done Val',  value: 130 },
        { stage: 'D5',  metric: 'Sells Done Val', value: 100 },
        { stage: 'D5',  metric: 'Buys Resid Val',  value: 35  },
        { stage: 'D5',  metric: 'Sells Resid Val',value: 28  },
        { stage: 'D5',  metric: 'Total Buys',      value: 165 },
        { stage: 'D5',  metric: 'Total Sells',     value: 128 },
        { stage: 'D5',  metric: 'Grand Total',     value: 293 },
        // D6
        { stage: 'D6',  metric: 'Buys Done Val',  value: 115 },
        { stage: 'D6',  metric: 'Sells Done Val', value: 90  },
        { stage: 'D6',  metric: 'Buys Resid Val',  value: 27  },
        { stage: 'D6',  metric: 'Sells Resid Val',value: 20  },
        { stage: 'D6',  metric: 'Total Buys',      value: 142 },
        { stage: 'D6',  metric: 'Total Sells',     value: 110 },
        { stage: 'D6',  metric: 'Grand Total',     value: 252 },
        // D7
        { stage: 'D7',  metric: 'Buys Done Val',  value: 125 },
        { stage: 'D7',  metric: 'Sells Done Val', value: 98  },
        { stage: 'D7',  metric: 'Buys Resid Val',  value: 33  },
        { stage: 'D7',  metric: 'Sells Resid Val',value: 23  },
        { stage: 'D7',  metric: 'Total Buys',      value: 158 },
        { stage: 'D7',  metric: 'Total Sells',     value: 121 },
        { stage: 'D7',  metric: 'Grand Total',     value: 279 },
        // D8
        { stage: 'D8',  metric: 'Buys Done Val',  value: 105 },
        { stage: 'D8',  metric: 'Sells Done Val', value: 88  },
        { stage: 'D8',  metric: 'Buys Resid Val',  value: 18  },
        { stage: 'D8',  metric: 'Sells Resid Val',value: 16  },
        { stage: 'D8',  metric: 'Total Buys',      value: 123 },
        { stage: 'D8',  metric: 'Total Sells',     value: 104 },
        { stage: 'D8',  metric: 'Grand Total',     value: 227 },
        // D9
        { stage: 'D9',  metric: 'Buys Done Val',  value: 95  },
        { stage: 'D9',  metric: 'Sells Done Val', value: 80  },
        { stage: 'D9',  metric: 'Buys Resid Val',  value: 17  },
        { stage: 'D9',  metric: 'Sells Resid Val',value: 14  },
        { stage: 'D9',  metric: 'Total Buys',      value: 112 },
        { stage: 'D9',  metric: 'Total Sells',     value: 94  },
        { stage: 'D9',  metric: 'Grand Total',     value: 206 },
        // D10
        { stage: 'D10', metric: 'Buys Done Val',  value: 135 },
        { stage: 'D10', metric: 'Sells Done Val', value: 105 },
        { stage: 'D10', metric: 'Buys Resid Val',  value: 40  },
        { stage: 'D10', metric: 'Sells Resid Val',value: 30  },
        { stage: 'D10', metric: 'Total Buys',      value: 175 },
        { stage: 'D10', metric: 'Total Sells',     value: 135 },
        { stage: 'D10', metric: 'Grand Total',     value: 310 },
    ];

    const completionProfilePivot = createPivotTable({
        data:       completionProfileData,
        rowKeys:    ['stage'],
        colKeys:    ['metric'],
        valueKey:   'value',
        aggregator: 'sum'
    });

    return (
        <>
            <Table {...completionProfilePivot} pivot ></Table>
        </>
    )
}


export const TopIlliquids = () => {
    const topIlliquidsColumns = [
        { key: 'Ticker',      label: 'Ticker',      order: 0 },
        { key: 'Name',        label: 'Name',        order: 1 },
        { key: 'Side',        label: 'Side',        order: 2 },
        { key: 'Qty',         label: 'Qty',         order: 3 },
        { key: 'Notional',    label: 'Notional',    order: 4 },
        { key: 'ADVPercent',  label: 'ADV%',        order: 5 },
        { key: 'TEDecomp',    label: 'TE Decomp',   order: 6 },
    ];

    const topIlliquidsData = [
        {
            Ticker:     'AAA',
            Name:       'Alpha Asset Ltd',
            Side:       'Buy',
            Qty:        1_200,
            Notional:   180_000,
            ADVPercent: 0.05,
            TEDecomp:   0.12,
        },
        {
            Ticker:     'BBB',
            Name:       'Beta Bonds Inc.',
            Side:       'Sell',
            Qty:        800,
            Notional:   96_000,
            ADVPercent: 0.03,
            TEDecomp:   0.08,
        },
        {
            Ticker:     'CCC',
            Name:       'Capital Credit',
            Side:       'Buy',
            Qty:        1_500,
            Notional:   225_000,
            ADVPercent: 0.07,
            TEDecomp:   0.15,
        },
        {
            Ticker:     'DDD',
            Name:       'Delta Debt',
            Side:       'Sell',
            Qty:        600,
            Notional:   78_000,
            ADVPercent: 0.02,
            TEDecomp:   0.05,
        },
        {
            Ticker:     'EEE',
            Name:       'Epsilon Equity',
            Side:       'Buy',
            Qty:        900,
            Notional:   135_000,
            ADVPercent: 0.04,
            TEDecomp:   0.10,
        },
        {
            Ticker:     'FFF',
            Name:       'Foxtrot Finance',
            Side:       'Sell',
            Qty:        1_100,
            Notional:   165_000,
            ADVPercent: 0.06,
            TEDecomp:   0.14,
        },
        {
            Ticker:     'GGG',
            Name:       'Gamma Growth',
            Side:       'Buy',
            Qty:        700,
            Notional:   98_000,
            ADVPercent: 0.025,
            TEDecomp:   0.06,
        },
        {
            Ticker:     'HHH',
            Name:       'Helix Hedge',
            Side:       'Sell',
            Qty:        500,
            Notional:   65_000,
            ADVPercent: 0.015,
            TEDecomp:   0.04,
        },
        {
            Ticker:     'III',
            Name:       'Iota Investments',
            Side:       'Buy',
            Qty:        1_300,
            Notional:   195_000,
            ADVPercent: 0.055,
            TEDecomp:   0.13,
        },
        {
            Ticker:     'JJJ',
            Name:       'Juliet Joint-Venture',
            Side:       'Sell',
            Qty:        400,
            Notional:   52_000,
            ADVPercent: 0.01,
            TEDecomp:   0.03,
        },
    ];

    return (
        <>
            <Table columns={topIlliquidsColumns} data={topIlliquidsData}></Table>
        </>
    )
}


export const TopTEDrivers = () => {
    const topTEDriversColumns: ITableProps['columns'] = [
        { key: 'ticker',     label: 'Ticker',     order: 0 },
        { key: 'name',       label: 'Name',       order: 1 },
        { key: 'side',       label: 'Side',       order: 2 },
        { key: 'qty',        label: 'Qty',        order: 3 },
        { key: 'notional',   label: 'Notional',   order: 4 },
        { key: 'teDecomp',   label: 'TE Decomp',  order: 5 },
        { key: 'percentAdv', label: '%ADV',       order: 6 },
    ];

    const topTEDriversData = [
        { ticker: 'AAA',   name: 'Alpha Corp',     side: 'Buy',  qty: 1_200, notional:  180_000, teDecomp: 0.12, percentAdv: 0.05 },
        { ticker: 'BBB',   name: 'Beta Ltd',       side: 'Sell', qty:   850, notional:  127_500, teDecomp: 0.10, percentAdv: 0.04 },
        { ticker: 'CCC',   name: 'Gamma Inc.',     side: 'Buy',  qty: 2_300, notional:  345_000, teDecomp: 0.15, percentAdv: 0.06 },
        { ticker: 'DDD',   name: 'Delta PLC',      side: 'Sell', qty: 1_100, notional:  165_000, teDecomp: 0.08, percentAdv: 0.03 },
        { ticker: 'EEE',   name: 'Epsilon Co.',    side: 'Buy',  qty:   950, notional:  142_500, teDecomp: 0.11, percentAdv: 0.05 },
        { ticker: 'FFF',   name: 'Zeta Holdings',  side: 'Sell', qty: 1_750, notional:  262_500, teDecomp: 0.13, percentAdv: 0.05 },
        { ticker: 'GGG',   name: 'Eta Group',      side: 'Buy',  qty: 1_300, notional:  195_000, teDecomp: 0.09, percentAdv: 0.04 },
        { ticker: 'HHH',   name: 'Theta Partners', side: 'Sell', qty:   720, notional:  108_000, teDecomp: 0.07, percentAdv: 0.03 },
        { ticker: 'III',   name: 'Iota Enterprises', side: 'Buy',qty: 2_000, notional:  300_000, teDecomp: 0.14, percentAdv: 0.06 },
        { ticker: 'JJJ',   name: 'Kappa Ventures', side: 'Sell', qty: 1_500, notional:  225_000, teDecomp: 0.10, percentAdv: 0.04 },
    ];

    return (
        <>
            <Table columns={topTEDriversColumns} data={topTEDriversData} />
        </>
    )
}


export const SpreadData = () => {
    const spreadDataColumns = [
        { key: 'Ticker',   label: 'Ticker'   },
        { key: 'Name',     label: 'Name'     },
        { key: 'Side',     label: 'Side'     },
        { key: 'Qty',      label: 'Qty'      },
        { key: 'Notional', label: 'Notional' },
        { key: 'Spread%',  label: 'Spread%'  },
    ];

    const highestSpreadData: any[] = [
        { Ticker: 'AAPL', Name: 'Apple Inc.',            Side: 'Buy',  Qty: 1200, Notional: 1200 * 174.55, 'Spread%': 0.25 },
        { Ticker: 'MSFT', Name: 'Microsoft Corp.',       Side: 'Sell', Qty:  800, Notional:  800 * 310.12, 'Spread%': 0.18 },
        { Ticker: 'GOOGL',Name: 'Alphabet Inc.',         Side: 'Buy',  Qty:  450, Notional:  450 * 136.42, 'Spread%': 0.32 },
        { Ticker: 'AMZN', Name: 'Amazon.com, Inc.',      Side: 'Buy',  Qty:  600, Notional:  600 * 189.33, 'Spread%': 0.15 },
        { Ticker: 'TSLA', Name: 'Tesla, Inc.',           Side: 'Sell', Qty:  300, Notional:  300 *  92.17, 'Spread%': 0.22 },
        { Ticker: 'NFLX', Name: 'Netflix, Inc.',         Side: 'Buy',  Qty:  500, Notional:  500 *  44.21, 'Spread%': 0.28 },
        { Ticker: 'META', Name: 'Meta Platforms, Inc.',  Side: 'Sell', Qty:  700, Notional:  700 * 256.34, 'Spread%': 0.19 },
        { Ticker: 'JPM',  Name: 'JPMorgan Chase & Co.',  Side: 'Buy',  Qty: 1000, Notional: 1000 * 130.50, 'Spread%': 0.12 },
        { Ticker: 'BAC',  Name: 'Bank of America Corp.', Side: 'Sell', Qty:  950, Notional:  950 *  28.75, 'Spread%': 0.21 },
        { Ticker: 'C',    Name: 'Citigroup Inc.',        Side: 'Buy',  Qty:  400, Notional:  400 *  46.89, 'Spread%': 0.30 },
    ];

    return (
        <>
            <Table columns={spreadDataColumns} data={highestSpreadData} />
        </>
    )

}


export const LargestOrders = () => {
    const largestOrdersData: any[] = [
        { ticker: 'AAPL',  name: 'Apple Inc.',           side: 'Buy',  qty: 1500, notionalPercentADV: 0.75 },
        { ticker: 'MSFT',  name: 'Microsoft Corp.',      side: 'Sell', qty: 1200, notionalPercentADV: 0.65 },
        { ticker: 'GOOGL', name: 'Alphabet Inc.',        side: 'Buy',  qty:  900, notionalPercentADV: 0.40 },
        { ticker: 'AMZN',  name: 'Amazon.com Inc.',      side: 'Sell', qty: 1100, notionalPercentADV: 0.55 },
        { ticker: 'TSLA',  name: 'Tesla Inc.',           side: 'Buy',  qty:  800, notionalPercentADV: 0.30 },
        { ticker: 'JPM',   name: 'JPMorgan Chase',       side: 'Sell', qty: 1000, notionalPercentADV: 0.50 },
        { ticker: 'BAC',   name: 'Bank of America',      side: 'Buy',  qty:  700, notionalPercentADV: 0.25 },
        { ticker: 'WMT',   name: 'Walmart Inc.',         side: 'Sell', qty:  950, notionalPercentADV: 0.45 },
        { ticker: 'NVDA',  name: 'NVIDIA Corp.',         side: 'Buy',  qty: 1300, notionalPercentADV: 0.60 },
        { ticker: 'META',  name: 'Meta Platforms Inc.',  side: 'Sell', qty:  850, notionalPercentADV: 0.35 },
    ];

    const largestOrdersColumns = [
        { key: 'ticker',             label: 'Ticker',        order: 0 },
        { key: 'name',               label: 'Name',          order: 1 },
        { key: 'side',               label: 'Side',          order: 2 },
        { key: 'qty',                label: 'Qty',           order: 3 },
        { key: 'notionalPercentADV', label: 'Notional %ADV', order: 4 },
    ];

    return (
        <>
            <Table columns={largestOrdersColumns} data={largestOrdersData} />
        </>
    )
}

export const CountryBreakdown = () => {
     const countryBreakdownData: any[] = [
        { Country: 'Afghanistan',               Names:  1, Shares:   100, Values:   1000, NET:   10 },
        { Country: 'Albania',                   Names:  2, Shares:   200, Values:   2000, NET:   20 },
        { Country: 'Algeria',                   Names:  3, Shares:   300, Values:   3000, NET:   30 },
        { Country: 'Andorra',                   Names:  4, Shares:   400, Values:   4000, NET:   40 },
        { Country: 'Angola',                    Names:  5, Shares:   500, Values:   5000, NET:   50 },
        { Country: 'Antigua and Barbuda',       Names:  6, Shares:   600, Values:   6000, NET:   60 },
        { Country: 'Argentina',                 Names:  7, Shares:   700, Values:   7000, NET:   70 },
        { Country: 'Armenia',                   Names:  8, Shares:   800, Values:   8000, NET:   80 },
        { Country: 'Australia',                 Names:  9, Shares:   900, Values:   9000, NET:   90 },
        { Country: 'Austria',                   Names: 10, Shares:  1000, Values:  10000, NET:  100 },
        { Country: 'Azerbaijan',                Names: 11, Shares:  1100, Values:  11000, NET:  110 },
        { Country: 'Bahamas',                   Names: 12, Shares:  1200, Values:  12000, NET:  120 },
        { Country: 'Bahrain',                   Names: 13, Shares:  1300, Values:  13000, NET:  130 },
        { Country: 'Bangladesh',                Names: 14, Shares:  1400, Values:  14000, NET:  140 },
        { Country: 'Barbados',                  Names: 15, Shares:  1500, Values:  15000, NET:  150 },
        { Country: 'Belarus',                   Names: 16, Shares:  1600, Values:  16000, NET:  160 },
        { Country: 'Belgium',                   Names: 17, Shares:  1700, Values:  17000, NET:  170 },
        { Country: 'Belize',                    Names: 18, Shares:  1800, Values:  18000, NET:  180 },
        { Country: 'Benin',                     Names: 19, Shares:  1900, Values:  19000, NET:  190 },
        { Country: 'Bhutan',                    Names: 20, Shares:  2000, Values:  20000, NET:  200 },
        { Country: 'Bolivia',                   Names: 21, Shares:  2100, Values:  21000, NET:  210 },
        { Country: 'Bosnia and Herzegovina',    Names: 22, Shares:  2200, Values:  22000, NET:  220 },
        { Country: 'Botswana',                  Names: 23, Shares:  2300, Values:  23000, NET:  230 },
        { Country: 'Brazil',                    Names: 24, Shares:  2400, Values:  24000, NET:  240 },
        { Country: 'Brunei',                    Names: 25, Shares:  2500, Values:  25000, NET:  250 },
        { Country: 'Bulgaria',                  Names: 26, Shares:  2600, Values:  26000, NET:  260 },
        { Country: 'Burkina Faso',              Names: 27, Shares:  2700, Values:  27000, NET:  270 },
        { Country: 'Burundi',                   Names: 28, Shares:  2800, Values:  28000, NET:  280 },
        { Country: 'Cabo Verde',                Names: 29, Shares:  2900, Values:  29000, NET:  290 },
        { Country: 'Cambodia',                  Names: 30, Shares:  3000, Values:  30000, NET:  300 },
        { Country: 'Cameroon',                  Names: 31, Shares:  3100, Values:  31000, NET:  310 },
        { Country: 'Canada',                    Names: 32, Shares:  3200, Values:  32000, NET:  320 },
        { Country: 'Central African Republic',  Names: 33, Shares:  3300, Values:  33000, NET:  330 },
        { Country: 'Chad',                      Names: 34, Shares:  3400, Values:  34000, NET:  340 },
        { Country: 'Chile',                     Names: 35, Shares:  3500, Values:  35000, NET:  350 },
        { Country: 'China',                     Names: 36, Shares:  3600, Values:  36000, NET:  360 },
        { Country: 'Colombia',                  Names: 37, Shares:  3700, Values:  37000, NET:  370 },
        { Country: 'Comoros',                   Names: 38, Shares:  3800, Values:  38000, NET:  380 },
        { Country: 'Congo (Republic of)',       Names: 39, Shares:  3900, Values:  39000, NET:  390 },
        { Country: 'Congo (DRC)',               Names: 40, Shares:  4000, Values:  40000, NET:  400 },
        { Country: 'Costa Rica',                Names: 41, Shares:  4100, Values:  41000, NET:  410 },
        { Country: "Côte d'Ivoire",             Names: 42, Shares:  4200, Values:  42000, NET:  420 },
        { Country: 'Croatia',                   Names: 43, Shares:  4300, Values:  43000, NET:  430 },
        { Country: 'Cuba',                      Names: 44, Shares:  4400, Values:  44000, NET:  440 },
        { Country: 'Cyprus',                    Names: 45, Shares:  4500, Values:  45000, NET:  450 },
        { Country: 'Czech Republic',            Names: 46, Shares:  4600, Values:  46000, NET:  460 },
        { Country: 'Denmark',                   Names: 47, Shares:  4700, Values:  47000, NET:  470 },
        { Country: 'Djibouti',                  Names: 48, Shares:  4800, Values:  48000, NET:  480 },
    ];

     const countryColumns = [
        { key: 'Country', label: 'Country', order: 0 },
        { key: 'Names',   label: 'Names',   order: 1 },
        { key: 'Shares',  label: 'Shares',  order: 2 },
        { key: 'Values',  label: 'Values',  order: 3 },
        { key: 'NET',     label: 'NET',     order: 4 },
     ];

    return (
        <>
            <Table columns={countryColumns} data={countryBreakdownData} pivot={true} />
        </>
    )

}


export const DashboardComps = () => {
    return (
        <>
            <SummaryData />
            ------------
            <SectorSkews />
            ------------
            <CompletionProfile />
            ------------
            <TopIlliquids />
            ------------
            <TopTEDrivers />
            ------------
            <SpreadData />
            ------------
            <LargestOrders />
            ------------
            <CountryBreakdown />
            -----
        </>
    )
}