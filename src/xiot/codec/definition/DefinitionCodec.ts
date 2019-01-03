import {DataFormat} from '../../spec/definitions/property/data/DataFormat';
import {ValueList} from '../../spec/definitions/property/ValueList';
import {ValueRange} from '../../spec/definitions/property/ValueRange';
import {PropertyType} from '../../spec/definitions/urn/PropertyType';
import {ServiceType} from '../../spec/definitions/urn/ServiceType';
import {ActionType} from '../../spec/definitions/urn/ActionType';
import {EventType} from '../../spec/definitions/urn/EventType';
import {ValueDefinition} from '../../spec/definitions/property/ValueDefinition';
import {Spec} from '../../spec/constant/Spec';

export class DefinitionCodec {

  static decodeValueList(format: DataFormat, array: any[]): ValueList {
    const list = new ValueList();

      if (array != null) {
          for (const v of array) {
              if (v.hasOwnProperty('value') && v.hasOwnProperty('description')) {
                  list.values.push(new ValueDefinition(format, v[Spec.VALUE], v[Spec.DESCRIPTION]));
              }
          }
      }

    return list;
  }

  static decodeValueRange(format: DataFormat, range: any[]): ValueRange {
    return new ValueRange(format, range);
  }

  static decodeProperties(array: string[]): PropertyType[] {
    const list: PropertyType[] = [];

    if (array != null) {
        for (const v of array) {
            const t = PropertyType.valueOf(v);
            if (t != null) {
                list.push();
            }
        }
    }

    return list;
  }

  static decodeServices(array: string[]): ServiceType[] {
    const list: ServiceType[] = [];

    if (array != null) {
        for (const v of array) {
            const t = ServiceType.valueOf(v);
            if (t != null) {
                list.push(t);
            }
        }
    }

    return list;
  }

  static decodeActions(array: string[]): ActionType[] {
    const list: ActionType[] = [];

      if (array != null) {
          for (const v of array) {
            const t = ActionType.valueOf(v);
            if (t != null) {
                list.push();
            }
          }
      }

    return list;
  }

  static decodeEvents(array: string[]): EventType[] {
    const list: EventType[] = [];

      if (array != null) {
          for (const v of array) {
              const t = EventType.valueOf(v);
              if (t != null) {
                list.push();
              }
          }
      }

    return list;
  }

  static encodeProperties(array: PropertyType[]): string[] {
      const list = [];

      if (array != null) {
          for (const v of array) {
              list.push(v.toString());
          }
      }

      return list;
  }
}
