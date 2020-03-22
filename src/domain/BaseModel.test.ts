import { BaseModel, BaseModelData } from './BaseModel';
import { mmDelay } from '../misc/mm-delay';

class Data implements BaseModelData {
    id: string;
    name: string;
}

class Foo extends BaseModel<Data> {
    readonly entityType = 'foo';

    get name() {
        return this._get('name');
    }
    set name(v) {
        this._set('name', v);
    }
    get _defaults() {
        return Foo.defaults();
    }
    static defaults() {
        return Object.assign({}, BaseModel.defaults(), {
            name: null,
        });
    }
    _toJSONApiRelationships(options: any = null) {
        return {
            baz: { type: 'baz', id: 123 },
        };
    }
}

class BarData implements BaseModelData {
    id: string;
    created: Date;
}

class Bar extends BaseModel<BarData> {
    readonly entityType = 'bar';

    get created() {
        return this._get('created');
    }

    set created(v) {
        this._set('created', v ? new Date(v) : null);
    }

    get _defaults() {
        return Bar.defaults();
    }
    
    static defaults() {
        return Object.assign({}, BaseModel.defaults(), {
            created: new Date(),
        });
    }
}

test('constructor sanity check', async () => {
    const now = new Date();
    const b = new Bar();
    await mmDelay(10);
    expect(now).toEqual(b.created);
    await mmDelay(10);
    expect(now).toEqual(b.created);
});

test('is dirty sanity check', () => {
    let m = new Foo({ name: 'bar' });
    expect(m.isDirty()).toBeFalsy();
    m.name = 'baz';
    expect(m.isDirty()).toBeTruthy();
    expect(m.resetDirty().isDirty()).toBeFalsy();
});

it('`toJSONApi` works', () => {
    let m = new Foo({ name: 'bar' });
    expect(m.toJSON().name).toEqual('bar');
    expect(m.toJSONApi().type).toEqual('foo');
    expect(m.toJSONApi().attributes.name).toEqual('bar');
    expect(m.toJSONApi().relationships.baz.id).toEqual(123);
});
