import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ async: true })
export class OneOfConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    return Array.isArray(args.constraints[0]) && args.constraints[0].includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `Field value is not in the [${args.constraints[0]}]`;
  }
}

export function OneOf(items: any[], validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [ items ],
      validator: OneOfConstraint,
    });
  };
}