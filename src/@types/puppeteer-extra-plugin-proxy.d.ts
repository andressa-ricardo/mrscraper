declare module "puppeteer-extra-plugin-proxy" {
  interface ProxyPluginOptions {
    proxyUrl: string;
  }

  function ProxyPlugin(options: ProxyPluginOptions): any;

  export = ProxyPlugin;
}
