import {ServiceType} from './urn/ServiceType';
import {DataFormat, DataFormatToString} from './property/data/DataFormat';
import {Access} from './property/Access';
import {Unit} from './property/Unit';
import {ConstraintValue} from './property/ConstraintValue';
import {DataValue} from './property/data/DataValue';
import {ValueList} from './property/ValueList';

export class PropertyDefinition {
  public type: ServiceType | null = null;
  public description: string = '';
  public format: DataFormat = DataFormat.BOOL;
  public access: Access = new Access();
  public constraintValue: ConstraintValue | null = null;
  public unit: Unit = Unit.NONE;

  validate(value: DataValue): boolean {
    if (value == null) {
      return false;
    }

    if (this.format === value.getFormat()) {
      return false;
    }

    if (this.constraintValue != null) {
      return this.constraintValue.validate(value);
    }

    return true;
  }

  getFormatString(): string {
    return DataFormatToString(this.format);
  }

  isEditableTextValue(): boolean {
    if (this.valueList() != null) {
      return false;
    }

    if (this.format === DataFormat.BOOL) {
      return false;
    }

    if (! this.access.isWritable) {
      return false;
    }

    return true;
  }

  isReadOnlyTextValue(): boolean {
    if (this.valueList() != null) {
      return false;
    }

    if (this.format === DataFormat.BOOL) {
      return false;
    }

    if (this.access.isWritable) {
      return false;
    }

    if (! this.access.isReadable) {
      return false;
    }

    return true;
  }

  valueList(): ValueList | null {
    if (this.constraintValue !== null) {
      if (this.constraintValue instanceof ValueList) {
        return this.constraintValue;
      }
    }

    return null;
  }
}
