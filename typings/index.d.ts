import 'egg';
import * as Joi from 'joi';

declare module 'egg' {
    interface Application {
        message: any,
        validator: any,
        joi: Joi
    }
}