import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: false,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  joi: {
    enable: true,
    package: 'egg-joi',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};

export default plugin;
