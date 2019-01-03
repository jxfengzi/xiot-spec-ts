import {ConstraintValue} from './ConstraintValue';
import {DataFormat} from './data/DataFormat';
import {DataValue} from './data/DataValue';
import {DataValueFactory} from './data/DataValueFactory';

export class ValueRange implements ConstraintValue {
    public format: DataFormat | null = null;
    public minValue: DataValue | null = null;
    public maxValue: DataValue | null = null;
    public stepValue: DataValue | null = null;
    public hasStep: boolean = false;

    constructor(format: DataFormat, list: any[]) {
        if (list.length === 2) {
            this.init(format, list[0], list[1], null);
        } else if (list.length === 3) {
            this.init(format, list[0], list[1], list[2]);
        } else {
            throw new Error('invalid range');
        }
    }

    private init(format: DataFormat, min: any, max: any, step: any | null) {
        this.minValue = DataValueFactory.create(format, min);
        this.maxValue = DataValueFactory.create(format, max);

        if (step != null) {
            this.stepValue = DataValueFactory.create(format, step);
            this.hasStep = true;
        } else {
            this.stepValue = null;
        }

        if (!this.minValue.lessEquals(this.maxValue)) {
            throw new Error('invalid value range: ' + min + ' <= ' + max);
        }
    }

    validate(value: DataValue): boolean {
        if (this.minValue == null || this.maxValue == null) {
            return false;
        }

        if (this.stepValue != null) {
            return value.validateStep(this.minValue, this.maxValue, this.stepValue);
        }

        return value.validate(this.minValue, this.maxValue);
    }

    toJsonArray(): any[] {
        if (this.minValue == null || this.maxValue == null) {
            return [];
        }

        if (this.stepValue != null) {
            return [this.minValue.getObjectValue(), this.maxValue.getObjectValue(), this.stepValue.getObjectValue()];
        } else {
            return [this.minValue.getObjectValue(), this.maxValue.getObjectValue()];
        }
    }
}
