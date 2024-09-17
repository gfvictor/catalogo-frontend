import { boot } from 'quasar/wrappers';
import { setupPinia } from 'src/stores';
import { setupRouter } from 'src/router';
import { AxiosInstance } from 'axios';
import api from 'src/boot/axios';

export default boot(({ app }) => {
  setupPinia(app);
  setupRouter(app);
  app.config.globalProperties.$api = api as AxiosInstance;
  })