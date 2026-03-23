import { Application, DefaultTheme, DefaultThemeRenderContext, JSX, PageEvent, Reflection, Renderer } from 'typedoc';
import { MyThemeContext } from './context.js';
import { icons } from './icons.js';

class MyTheme extends DefaultTheme {
    constructor(renderer: Renderer) {
        super(renderer);

        renderer.hooks.on('head.end', () => (
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
        ));

        renderer.hooks.on('head.end', () => <link rel="stylesheet" href="./style.css"></link>);
    }

    render(page: PageEvent): string {
        this.application.logger.info(`Rendering ${page.url}`);

        // icons
        this.icons.search = () => icons.search;
        this.icons[64] = () => icons.function;

        return super.render(page);
    }

    getRenderContext(pageEvent: PageEvent<Reflection>): DefaultThemeRenderContext {
        return new MyThemeContext(this.router, this, pageEvent, this.application.options);
    }
}

export function load(app: Application) {
    app.renderer.defineTheme('typedoc-neat-theme', MyTheme);
}
