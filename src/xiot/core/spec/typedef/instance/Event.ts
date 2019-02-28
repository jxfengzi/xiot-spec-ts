import {EventType} from '../definition/urn/EventType';
import {Argument} from './Argument';

export class Event {

  iid: number = 0;
  type: EventType;
  arguments: Map<Number, Argument> = new Map<Number, Argument>();

  constructor(iid: number,
              type: EventType,
              description: Map<String, String>,
              list: Argument[]) {
    this.iid = iid;
    this.type = type;
    this.type.description = description;
    list.forEach(x => this.arguments.set(x.piid, x));
  }

  getArguments(): Argument[] {
    return Array.from(this.arguments.values());
  }
}