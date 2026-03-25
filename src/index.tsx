import { appendFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    Application,
    DefaultTheme,
    DefaultThemeRenderContext,
    JSX,
    PageEvent,
    Reflection,
    Renderer,
    RendererEvent
} from 'typedoc';
import { MyThemeContext } from './context.js';
import { getThemeIcons } from './icons.js';

class MyTheme extends DefaultTheme {
    constructor(renderer: Renderer) {
        super(renderer);

        Object.assign(this.icons, getThemeIcons());
        renderer.hooks.on('head.end', () => <link rel="stylesheet" href="./style.css"></link>);
    }

    render(page: PageEvent): string {
        this.application.logger.info(`Rendering ${page.url}`);
        return super.render(page);
    }

    async postRender(_event: RendererEvent): Promise<void> {
        return super.postRender(_event);
    }

    getRenderContext(pageEvent: PageEvent<Reflection>): DefaultThemeRenderContext {
        return new MyThemeContext(this.router, this, pageEvent, this.application.options);
    }
}

export function load(app: Application) {
    app.renderer.defineTheme('typedoc-neat-theme', MyTheme);

    app.renderer.on(Renderer.EVENT_END, (event) => {
        if (app.options.getValue('theme') === 'typedoc-neat-theme') {
            const dir = dirname(dirname(fileURLToPath(import.meta.url)));
            const style = readFileSync(join(dir, 'dist/style.css'), 'utf-8');
            appendFileSync(join(event.outputDirectory, 'assets/style.css'), style);
        }
    });
}
