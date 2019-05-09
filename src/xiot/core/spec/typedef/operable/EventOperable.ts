import {Event} from '../instance/Event';
import {Property} from '../instance/Property';
import {ActionOperation} from '../operation/ActionOperation';
import {OperationStatus} from '../status/OperationStatus';
import {EventType} from '../definition/urn/EventType';
import {Argument} from '../instance/Argument';

export class EventOperable extends Event {

    constructor(iid: number,
                type: EventType,
                description: Map<string, string>,
                list: Argument[]) {
        super(iid, type, description, list);
    }

    tryInvoke(o: ActionOperation, properties: Map<number, Property>) {
        o.status = (<number>OperationStatus.COMPLETED);

        for (const spec of this.getArguments()) {
            const v = o.in.get(spec.piid);
            if (v == null) {
                o.status = (<number>OperationStatus.EVENT_ARGUMENTS_ERROR);
                o.description = 'event argument error';
                break;
            }

            if (spec.minRepeat > 0) {
                o.status = (<number>OperationStatus.EVENT_ARGUMENTS_ERROR);
                o.description = 'event argument error, min repeat > 0';
                break;
            }

            const property = properties.get(spec.piid);
            if (property == null) {
                o.status = (<number>OperationStatus.EVENT_ARGUMENTS_ERROR);
                o.description = 'event argument error, value invalid';
                break;
            }

            if (!property.trySetValues(v.values)) {
                o.status = (<number>OperationStatus.EVENT_ARGUMENTS_ERROR);
                o.description = 'event argument error, set value failed';
                break;
            }
        }
    }
}
