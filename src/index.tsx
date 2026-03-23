import {
    Application,
    DefaultTheme,
    DefaultThemeRenderContext,
    JSX,
    Options,
    PageEvent,
    Reflection,
    Renderer,
    Router
} from 'typedoc';

class MyThemeContext extends DefaultThemeRenderContext {
    constructor(router: Router, theme: DefaultTheme, page: PageEvent<Reflection>, options: Options) {
        super(router, theme, page, options);

        this.footer = () => (
            <footer>
                <p class="tsd-generator">
                    Generated using{' '}
                    <a href="https://typedoc.org/" target="_blank">
                        TypeDoc
                    </a>{' '}
                    with{' '}
                    <a href="https://github.com/jacobhumston/typedoc-neat-theme" target="_blank">
                        typedoc-neat-theme
                    </a>
                    .
                </p>
            </footer>
        );
    }
}

class MyTheme extends DefaultTheme {
    constructor(renderer: Renderer) {
        super(renderer);
    }

    render(page: PageEvent): string {
        this.application.logger.info(`Rendering ${page.url}`);
        return super.render(page);
    }

    getRenderContext(pageEvent: PageEvent<Reflection>): DefaultThemeRenderContext {
        return new MyThemeContext(this.router, this, pageEvent, this.application.options);
    }
}

export function load(app: Application) {
    app.renderer.defineTheme('typedoc-neat-theme', MyTheme);
}
