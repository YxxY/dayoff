import { Application } from 'egg';

export default (app: Application) => {
  const Joi = app.Joi;
  return {
    dateFormat: Joi.object().keys({
      date: Joi.alternatives().try(
        Joi.string().regex(/^today$/i),
        Joi.string().regex(/^yesterday$/i),
        Joi.string().regex(/^tomorrow$/i),
        Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        Joi.string().regex(/^\d{4}\d{2}\d{2}$/),
      ).match('one'),
    }),
  };
};
