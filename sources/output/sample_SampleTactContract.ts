import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Add = {
    $$type: 'Add';
    amount: bigint;
}

export function storeAdd(src: Add) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2278832834, 32);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadAdd(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2278832834) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Add' as const, amount: _amount };
}

function loadTupleAdd(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Add' as const, amount: _amount };
}

function storeTupleAdd(source: Add) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserAdd(): DictionaryValue<Add> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAdd(src)).endCell());
        },
        parse: (src) => {
            return loadAdd(src.loadRef().beginParse());
        }
    }
}

export type Minus = {
    $$type: 'Minus';
    amount: bigint;
}

export function storeMinus(src: Minus) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2759561417, 32);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadMinus(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2759561417) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Minus' as const, amount: _amount };
}

function loadTupleMinus(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Minus' as const, amount: _amount };
}

function storeTupleMinus(source: Minus) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserMinus(): DictionaryValue<Minus> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMinus(src)).endCell());
        },
        parse: (src) => {
            return loadMinus(src.loadRef().beginParse());
        }
    }
}

export type Multiply = {
    $$type: 'Multiply';
    amount: bigint;
}

export function storeMultiply(src: Multiply) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2185829316, 32);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadMultiply(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2185829316) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Multiply' as const, amount: _amount };
}

function loadTupleMultiply(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Multiply' as const, amount: _amount };
}

function storeTupleMultiply(source: Multiply) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserMultiply(): DictionaryValue<Multiply> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMultiply(src)).endCell());
        },
        parse: (src) => {
            return loadMultiply(src.loadRef().beginParse());
        }
    }
}

export type Divide = {
    $$type: 'Divide';
    amount: bigint;
}

export function storeDivide(src: Divide) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2091152479, 32);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadDivide(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2091152479) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Divide' as const, amount: _amount };
}

function loadTupleDivide(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Divide' as const, amount: _amount };
}

function storeTupleDivide(source: Divide) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserDivide(): DictionaryValue<Divide> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDivide(src)).endCell());
        },
        parse: (src) => {
            return loadDivide(src.loadRef().beginParse());
        }
    }
}

 type SampleTactContract_init_args = {
    $$type: 'SampleTactContract_init_args';
    owner: Address;
}

function initSampleTactContract_init_args(src: SampleTactContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function SampleTactContract_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECJAEABLEAART/APSkE/S88sgLAQIBYgIDAtTQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssfye1UHwQCASAYGQSM7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEIfUOsK6j50w0x8BghCH1DrCuvLggdMfATHbPIj4QgF/bds8f+AgghCke5DJuhAFFQYADgAAAABBZGQEUI+dMNMfAYIQpHuQybry4IHTHwEx2zyI+EIBf23bPH/gIIIQgkkbxLoTBxUIABIAAAAATWludXMEUI+dMNMfAYIQgkkbxLry4IHTHwEx2zyI+EIBf23bPH/gIIIQfKR0X7oJChULACT4QW8kECNfAyOBEU0CxwXy9KgAGAAAAABNdWx0aXBseQRQj50w0x8BghB8pHRfuvLggdMfATHbPIj4QgF/bds8f+AgghCUapi2ugwNFQ4ANvhBbyQQI18DI4ERTQLHBfL0gR3GIcMA8vSpBAAUAAAAAERpdmlkZQJkjqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4MAAkTDjDXAVDwS2+QEggvDE+NcjEu3971t77HgzvbsWLRURvXipEq7Q8mN69lVyrrqPjzBx2zyI+EIBf23bPH/bMeCC8IWRWxv1lD/ShTu2YDOKys+uOdH3NVSc75IiVamUWsw+uhARFRIAJPhBbyQQI18DI4ERTQLHBfL0oAAeAAAAAGluY3JlbWVudGVkAyKPjnHbPIj4QgF/bds8f9sx4BMUFQAk+EFvJBAjXwMjgRFNAscF8vShAB4AAAAAZGVjcmVtZW50ZWQBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8FgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAXAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAhG+KO7Z5tnjYQwfGgIBIBscAAIhAgEgHR4CAUgiIwIRt0MbZ5tnjYQwHyAAlbd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkAHA7UTQ1AH4Y9IAAY4l+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH1lsEuD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0ds8IQACIAACcAARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1hOGZpOWpONXdROURUOHRtY3B1eFFqR0s2UGRpUURxQlJFMmVlQ3F6R2NWToIA==');
    const __system = Cell.fromBase64('te6cckECJgEABLsAAQHAAQEFoebTAgEU/wD0pBP0vPLICwMCAWIPBAIBIA0FAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtYThmaTlqTjV3UTlEVDh0bWNwdXhRakdLNlBkaVFEcUJSRTJlZUNxekdjVk6CAAEbCvu1E0NIAAYAIBIAsKAJW3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJACEbdDG2ebZ42EMCQMAAIgAhG+KO7Z5tnjYQwkDgACIQLU0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wts88uCCyPhDAcx/AcoAWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLH8ntVCQQBIztou37AZIwf+BwIddJwh+VMCDXCx/eIIIQh9Q6wrqPnTDTHwGCEIfUOsK68uCB0x8BMds8iPhCAX9t2zx/4CCCEKR7kMm6IyIfEQRQj50w0x8BghCke5DJuvLggdMfATHbPIj4QgF/bds8f+AgghCCSRvEuh4dHxIEUI+dMNMfAYIQgkkbxLry4IHTHwEx2zyI+EIBf23bPH/gIIIQfKR0X7ocGx8TBFCPnTDTHwGCEHykdF+68uCB0x8BMds8iPhCAX9t2zx/4CCCEJRqmLa6GhkfFAJkjqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4MAAkTDjDXAfFQS2+QEggvDE+NcjEu3971t77HgzvbsWLRURvXipEq7Q8mN69lVyrrqPjzBx2zyI+EIBf23bPH/bMeCC8IWRWxv1lD/ShTu2YDOKys+uOdH3NVSc75IiVamUWsw+uiMYHxYDIo+Ocds8iPhCAX9t2zx/2zHgHhcfAB4AAAAAZGVjcmVtZW50ZWQAHgAAAABpbmNyZW1lbnRlZAAUAAAAAERpdmlkZQA2+EFvJBAjXwMjgRFNAscF8vSBHcYhwwDy9KkEABgAAAAATXVsdGlwbHkAJPhBbyQQI18DI4ERTQLHBfL0qAASAAAAAE1pbnVzACT4QW8kECNfAyOBEU0CxwXy9KEBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8IAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAhAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAA4AAAAAQWRkACT4QW8kECNfAyOBEU0CxwXy9KABwO1E0NQB+GPSAAGOJfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0x9ZbBLg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdHbPCUAAnDMF2+W');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSampleTactContract_init_args({ $$type: 'SampleTactContract_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SampleTactContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    7622: { message: `The divisor cannot be 0` },
}

const SampleTactContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Add","header":2278832834,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Minus","header":2759561417,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Multiply","header":2185829316,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Divide","header":2091152479,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const SampleTactContract_getters: ABIGetter[] = [
    {"name":"counter","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const SampleTactContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Add"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Minus"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Multiply"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Divide"}},
    {"receiver":"internal","message":{"kind":"text","text":"increment"}},
    {"receiver":"internal","message":{"kind":"text","text":"decrement"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class SampleTactContract implements Contract {
    
    static async init(owner: Address) {
        return await SampleTactContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await SampleTactContract_init(owner);
        const address = contractAddress(0, init);
        return new SampleTactContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SampleTactContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SampleTactContract_types,
        getters: SampleTactContract_getters,
        receivers: SampleTactContract_receivers,
        errors: SampleTactContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Add | Minus | Multiply | Divide | 'increment' | 'decrement' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Add') {
            body = beginCell().store(storeAdd(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Minus') {
            body = beginCell().store(storeMinus(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Multiply') {
            body = beginCell().store(storeMultiply(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Divide') {
            body = beginCell().store(storeDivide(message)).endCell();
        }
        if (message === 'increment') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'decrement') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getCounter(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('counter', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}